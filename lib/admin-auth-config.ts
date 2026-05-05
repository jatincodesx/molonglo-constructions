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
  passwordHash: string | null;
  devPlainPassword: string | null;
  sessionSecret: string;
};

function readEnvValue(key: string) {
  return process.env[key]?.trim() || "";
}

function isLikelyBcryptHash(hash: string) {
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash);
}

export function validateAdminAuthConfig(): AdminAuthConfig {
  const isProduction = process.env.NODE_ENV === "production";
  const adminEmail = readEnvValue("ADMIN_EMAIL").toLowerCase();
  const passwordHash = readEnvValue("ADMIN_PASSWORD_HASH");
  const devPlainPassword = isProduction ? "" : readEnvValue("ADMIN_PASSWORD");
  const sessionSecret = readEnvValue("SESSION_SECRET") || (!isProduction ? readEnvValue("ADMIN_JWT_SECRET") : "");
  const missing = [
    ["ADMIN_EMAIL", adminEmail],
    ["ADMIN_PASSWORD_HASH", passwordHash || devPlainPassword],
    ["SESSION_SECRET", sessionSecret]
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new AdminAuthConfigError("Admin authentication is not configured.", missing);
  }

  if (isProduction && readEnvValue("ADMIN_PASSWORD")) {
    throw new AdminAuthConfigError("Plain ADMIN_PASSWORD is not allowed in production.");
  }

  if (passwordHash.length > 0 && passwordHash.length !== 60 && !isProduction) {
    console.warn("[admin-login] ADMIN_PASSWORD_HASH should be a 60-character bcrypt hash.");
  }

  if (passwordHash && !isLikelyBcryptHash(passwordHash)) {
    throw new AdminAuthConfigError("Admin authentication password hash is not a valid bcrypt hash.");
  }

  return {
    adminEmail,
    passwordHash: passwordHash || null,
    devPlainPassword: devPlainPassword || null,
    sessionSecret
  };
}

export function getAdminAuthConfig() {
  return validateAdminAuthConfig();
}

export function getAdminAuthDiagnostics() {
  const passwordHash = readEnvValue("ADMIN_PASSWORD_HASH");

  return {
    hasAdminEmail: Boolean(readEnvValue("ADMIN_EMAIL")),
    hasPasswordHash: Boolean(passwordHash),
    hasValidPasswordHash: Boolean(passwordHash && isLikelyBcryptHash(passwordHash)),
    hasPlainDevPassword: Boolean(readEnvValue("ADMIN_PASSWORD")),
    hasSessionSecret: Boolean(readEnvValue("SESSION_SECRET")),
    hasLegacyJwtSecret: Boolean(readEnvValue("ADMIN_JWT_SECRET"))
  };
}

export function getAdminSessionSecret() {
  return validateAdminAuthConfig().sessionSecret;
}
