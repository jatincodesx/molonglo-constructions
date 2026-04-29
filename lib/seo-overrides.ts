import { getPublicSeoOverride } from "@/lib/admin-db";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function getSeoOverride(pagePath: string) {
  return getPublicSeoOverride(pagePath);
}

export async function getSeoSchema(pagePath: string) {
  const schema = (await getSeoOverride(pagePath))?.schema;
  if (!schema) {
    return null;
  }

  try {
    const parsed = JSON.parse(schema) as unknown;

    if (Array.isArray(parsed)) {
      return parsed.every((item) => isPlainObject(item)) ? parsed : null;
    }

    if (isPlainObject(parsed)) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}
