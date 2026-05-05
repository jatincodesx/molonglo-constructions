export type SchemaObject = Record<string, unknown>;

function hasSchemaType(value: unknown) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return Array.isArray(value) && value.some((item) => typeof item === "string" && item.trim().length > 0);
}

function isSchemaObject(value: unknown): value is SchemaObject {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value as SchemaObject).length > 0 &&
    hasSchemaType((value as SchemaObject)["@type"])
  );
}

function sanitizeSchemaObject(value: unknown): SchemaObject | null {
  if (!isSchemaObject(value)) {
    return null;
  }

  return {
    ...value,
    "@context": "https://schema.org"
  };
}

export function normalizeStructuredData(input: unknown): SchemaObject[] {
  const items = Array.isArray(input) ? input : [input];

  return items
    .map((item) => sanitizeSchemaObject(item))
    .filter((item): item is SchemaObject => item !== null);
}

export function normalizeStructuredDataPayload(input: unknown): SchemaObject | SchemaObject[] | null {
  const schemas = normalizeStructuredData(input);

  if (schemas.length === 0) {
    return null;
  }

  return schemas.length === 1 ? schemas[0] : schemas;
}
