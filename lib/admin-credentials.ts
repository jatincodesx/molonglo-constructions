import bcrypt from "bcryptjs";
import { getAdminAuthConfig } from "@/lib/admin-auth-config";

export async function validAdminCredentials(email: string, password: string) {
  const { adminEmail, devPlainPassword, passwordHash } = getAdminAuthConfig();
  const normalizedEmail = email.trim().toLowerCase();

  if (!password || normalizedEmail !== adminEmail) {
    return false;
  }

  if (passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  return process.env.NODE_ENV !== "production" && password === devPlainPassword;
}
