import { getPublicSeoOverride } from "@/lib/admin-db";
import { normalizeStructuredDataPayload } from "@/lib/structured-data";

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
    return normalizeStructuredDataPayload(parsed);
  } catch {
    return null;
  }
}
