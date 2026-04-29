import { webcrypto } from "node:crypto";

const password = process.argv[2];
const iterations = Number(process.argv[3] || "210000");

if (!password) {
  console.error("Usage: node scripts/generate-admin-password-hash.mjs <password> [iterations]");
  process.exit(1);
}

function base64UrlEncode(bytes) {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

const salt = webcrypto.getRandomValues(new Uint8Array(16));
const key = await webcrypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,
  ["deriveBits"]
);
const derivedBits = await webcrypto.subtle.deriveBits(
  {
    name: "PBKDF2",
    hash: "SHA-256",
    salt,
    iterations
  },
  key,
  32 * 8
);

console.log(`pbkdf2_sha256:${iterations}:${base64UrlEncode(salt)}:${base64UrlEncode(new Uint8Array(derivedBits))}`);
