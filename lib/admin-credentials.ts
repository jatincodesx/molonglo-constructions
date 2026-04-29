import bcrypt from "bcryptjs";
import { getAdminAuthConfig } from "@/lib/admin-auth-config";

export async function validAdminCredentials(email: string, password: string) {
  const { adminEmail, passwordHash } = getAdminAuthConfig();
  const normalizedEmail = email.trim().toLowerCase();

  if (!password || normalizedEmail !== adminEmail) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
}
