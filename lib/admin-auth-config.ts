export class AdminAuthConfigError extends Error {
  missing: string[];

  constructor(message: string, missing: string[] = []) {
    super(message);
    this.name = "AdminAuthConfigError";
    this.missing = missing;
  }
}

export type AdminAuthConfig = {
  adminEmail: string;
  passwordHash: string;
  devPlainPassword: string;
  sessionSecret: string;
  isProduction: boolean;
};

function readEnvValue(key: string) {
  return process.env[key]?.trim() ?? "";
}

function isLikelyBcryptHash(value: string) {
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(value);
}

export function validateAdminAuthConfig(): AdminAuthConfig {
  const isProduction = process.env.NODE_ENV === "production";

  const adminEmail = readEnvValue("ADMIN_EMAIL").toLowerCase();
  const passwordHash = readEnvValue("ADMIN_PASSWORD_HASH");
  const devPlainPassword = isProduction ? "" : readEnvValue("ADMIN_PASSWORD");

  const sessionSecret =
    readEnvValue("SESSION_SECRET") ||
    (!isProduction ? readEnvValue("ADMIN_JWT_SECRET") : "");

  const missing: string[] = [];

  if (!adminEmail) {
    missing.push("ADMIN_EMAIL");
  }

  if (isProduction) {
    if (!passwordHash) {
      missing.push("ADMIN_PASSWORD_HASH");
    }

    if (!readEnvValue("SESSION_SECRET")) {
      missing.push("SESSION_SECRET");
    }

    if (readEnvValue("ADMIN_PASSWORD")) {
      throw new AdminAuthConfigError(
        "Plain ADMIN_PASSWORD is not allowed in production. Remove it and use ADMIN_PASSWORD_HASH.",
        ["ADMIN_PASSWORD"]
      );
    }
  } else {
    if (!passwordHash && !devPlainPassword) {
      missing.push("ADMIN_PASSWORD_HASH or ADMIN_PASSWORD");
    }

    if (!sessionSecret) {
      missing.push("SESSION_SECRET or ADMIN_JWT_SECRET");
    }
  }

  if (missing.length > 0) {
    throw new AdminAuthConfigError("Admin authentication is not configured.", missing);
  }

  if (passwordHash && !isLikelyBcryptHash(passwordHash)) {
    if (!isProduction && devPlainPassword) {
      console.warn(
        "[admin-login] ADMIN_PASSWORD_HASH is not a valid bcrypt hash. Using development ADMIN_PASSWORD fallback."
      );

      return {
        adminEmail,
        passwordHash: "",
        devPlainPassword,
        sessionSecret,
        isProduction,
      };
    }

    throw new AdminAuthConfigError(
      "Admin authentication password hash is not a valid bcrypt hash.",
      ["ADMIN_PASSWORD_HASH"]
    );
  }

  return {
    adminEmail,
    passwordHash,
    devPlainPassword,
    sessionSecret,
    isProduction,
  };
}

export function getAdminAuthConfig() {
  return validateAdminAuthConfig();
}

export function getAdminSessionSecret() {
  return validateAdminAuthConfig().sessionSecret;
}

export function getAdminAuthDiagnostics() {
  let adminConfigOk = false;
  let adminConfigError = "";
  let adminConfigMissing: string[] = [];

  try {
    validateAdminAuthConfig();
    adminConfigOk = true;
  } catch (error) {
    if (error instanceof AdminAuthConfigError) {
      adminConfigError = error.message;
      adminConfigMissing = error.missing;
    } else {
      adminConfigError = error instanceof Error ? error.message : "Unknown error";
    }
  }

  return {
    nodeEnv: process.env.NODE_ENV,
    adminConfigOk,
    adminConfigError,
    adminConfigMissing,
    hasAdminEmail: Boolean(readEnvValue("ADMIN_EMAIL")),
    hasPasswordHash: Boolean(readEnvValue("ADMIN_PASSWORD_HASH")),
    passwordHashLength: readEnvValue("ADMIN_PASSWORD_HASH").length,
    hasPlainDevPassword: Boolean(readEnvValue("ADMIN_PASSWORD")),
    hasSessionSecret: Boolean(readEnvValue("SESSION_SECRET")),
    hasLegacyJwtSecret: Boolean(readEnvValue("ADMIN_JWT_SECRET")),
  };
}
