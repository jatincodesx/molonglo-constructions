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
  sessionSecret: string;
};

function readEnvValue(key: string) {
  return process.env[key]?.trim() || "";
}

function isLikelyBcryptHash(hash: string) {
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash);
}

export function validateAdminAuthConfig(): AdminAuthConfig {
  const adminEmail = readEnvValue("ADMIN_EMAIL").toLowerCase();
  const passwordHash = readEnvValue("ADMIN_PASSWORD_HASH");
  const sessionSecret = readEnvValue("SESSION_SECRET");
  const missing = [
    ["ADMIN_EMAIL", adminEmail],
    ["ADMIN_PASSWORD_HASH", passwordHash],
    ["SESSION_SECRET", sessionSecret]
  ]
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new AdminAuthConfigError("Admin authentication is not configured.", missing);
  }

  if (passwordHash.length !== 60 && process.env.NODE_ENV !== "production") {
    console.warn("[admin-login] ADMIN_PASSWORD_HASH should be a 60-character bcrypt hash.");
  }

  if (!isLikelyBcryptHash(passwordHash)) {
    throw new AdminAuthConfigError("Admin authentication password hash is not a valid bcrypt hash.");
  }

  return {
    adminEmail,
    passwordHash,
    sessionSecret
  };
}

export function getAdminAuthConfig() {
  return validateAdminAuthConfig();
}
