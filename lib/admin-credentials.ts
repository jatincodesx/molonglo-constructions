function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a[index] ^ b[index];
  }

  return mismatch === 0;
}

function stringToBytes(value: string) {
  return new TextEncoder().encode(value);
}

function base64UrlDecodeToBytes(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", stringToBytes(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyPbkdf2Hash(password: string, configuredHash: string) {
  const [, iterationsString, saltString, expectedString] = configuredHash.split(":");
  const iterations = Number(iterationsString);
  const salt = base64UrlDecodeToBytes(saltString || "");
  const expected = base64UrlDecodeToBytes(expectedString || "");

  if (!Number.isInteger(iterations) || iterations <= 0 || !salt.length || !expected.length) {
    return false;
  }

  const key = await crypto.subtle.importKey("raw", stringToBytes(password), "PBKDF2", false, ["deriveBits"]);
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations
    },
    key,
    expected.length * 8
  );

  return timingSafeEqual(new Uint8Array(derivedBits), expected);
}

export function getAdminEmail() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!email) {
    throw new Error("Missing ADMIN_EMAIL.");
  }

  return email;
}

function getAdminPasswordHash() {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!hash) {
    throw new Error("Missing ADMIN_PASSWORD_HASH.");
  }

  return hash;
}

export async function validAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const configuredEmail = getAdminEmail();
  if (normalizedEmail !== configuredEmail) {
    return false;
  }

  const configuredHash = getAdminPasswordHash();

  if (configuredHash.startsWith("sha256:")) {
    const digest = await sha256Hex(password);
    return timingSafeEqual(stringToBytes(digest), stringToBytes(configuredHash.slice("sha256:".length)));
  }

  if (configuredHash.startsWith("pbkdf2_sha256:")) {
    return verifyPbkdf2Hash(password, configuredHash);
  }

  throw new Error("Unsupported ADMIN_PASSWORD_HASH format. Use pbkdf2_sha256:<iterations>:<salt>:<hash>.");
}
