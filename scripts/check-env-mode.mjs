#!/usr/bin/env node

import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

const mode = process.argv[2];

if (!["dev", "deploy"].includes(mode)) {
  console.error("Usage: node scripts/check-env-mode.mjs <dev|deploy>");
  process.exit(1);
}

if (mode === "deploy") {
  process.env.NODE_ENV = "production";
}

loadEnvConfig(process.cwd(), mode === "dev");

const BCRYPT_RE = /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/;

function readEnvValue(key) {
  return process.env[key]?.trim() ?? "";
}

function statusLine(key) {
  const value = readEnvValue(key);
  return `${key}: ${value ? `set length ${value.length}` : "missing"}`;
}

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

const adminEmail = readEnvValue("ADMIN_EMAIL");
const adminPassword = readEnvValue("ADMIN_PASSWORD");
const adminPasswordHash = readEnvValue("ADMIN_PASSWORD_HASH");
const sessionSecret = readEnvValue("SESSION_SECRET");
const legacyJwtSecret = readEnvValue("ADMIN_JWT_SECRET");

console.log(`Environment mode: ${mode}`);
console.log(statusLine("ADMIN_EMAIL"));
console.log(`ADMIN_PASSWORD: ${adminPassword ? `present length ${adminPassword.length}` : "absent"}`);
console.log(statusLine("ADMIN_PASSWORD_HASH"));
console.log(statusLine("SESSION_SECRET"));
console.log(`ADMIN_JWT_SECRET: ${legacyJwtSecret ? `set length ${legacyJwtSecret.length}` : "missing"}`);

if (!adminEmail) {
  fail("ADMIN_EMAIL is required.");
}

if (mode === "dev") {
  if (!sessionSecret && !legacyJwtSecret) {
    fail("SESSION_SECRET or ADMIN_JWT_SECRET is required for development.");
  }

  if (!adminPasswordHash && !adminPassword) {
    fail("ADMIN_PASSWORD_HASH or ADMIN_PASSWORD is required for development.");
  }

  if (adminPasswordHash && !BCRYPT_RE.test(adminPasswordHash)) {
    if (adminPassword) {
      console.log("ADMIN_PASSWORD_HASH: invalid bcrypt, development ADMIN_PASSWORD fallback is allowed.");
    } else {
      fail("ADMIN_PASSWORD_HASH is invalid and ADMIN_PASSWORD is not set for development fallback.");
    }
  } else if (adminPasswordHash) {
    console.log("ADMIN_PASSWORD_HASH: valid bcrypt format");
  } else {
    console.log("ADMIN_PASSWORD_HASH: blank or missing, development ADMIN_PASSWORD fallback is allowed.");
  }
} else {
  if (adminPassword) {
    fail("ADMIN_PASSWORD must not be present during production deploy. Use ADMIN_PASSWORD_HASH instead.");
  }

  if (!adminPasswordHash) {
    fail("ADMIN_PASSWORD_HASH is required for production deploy.");
  } else {
    if (adminPasswordHash.length !== 60) {
      fail("ADMIN_PASSWORD_HASH must be 60 characters for production deploy.");
    }

    if (!adminPasswordHash.startsWith("$2a$") && !adminPasswordHash.startsWith("$2b$") && !adminPasswordHash.startsWith("$2y$")) {
      fail("ADMIN_PASSWORD_HASH must start with $2a$, $2b$, or $2y$ for production deploy.");
    }

    if (!BCRYPT_RE.test(adminPasswordHash)) {
      fail("ADMIN_PASSWORD_HASH must be a valid bcrypt hash for production deploy.");
    } else {
      console.log("ADMIN_PASSWORD_HASH: valid bcrypt format");
    }
  }

  if (!sessionSecret) {
    fail("SESSION_SECRET is required for production deploy.");
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Environment check passed.");
