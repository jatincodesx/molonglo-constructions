type SchemaObject = Record<string, unknown>;

type JsonLdProps = {
  data?: SchemaObject | SchemaObject[] | null;
  json?: SchemaObject | SchemaObject[] | null;
  schema?: SchemaObject | SchemaObject[] | null;
};

function hasSchemaType(value: unknown) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return Array.isArray(value) && value.some((item) => typeof item === "string" && item.trim().length > 0);
}

function isValidSchemaObject(value: unknown): value is SchemaObject {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value as SchemaObject).length > 0 &&
    hasSchemaType((value as SchemaObject)["@type"])
  );
}

function normaliseSchema(input: unknown): SchemaObject[] {
  const items = Array.isArray(input) ? input : [input];

  return items
    .filter(isValidSchemaObject)
    .map((item) => ({
      ...item,
      "@context":
        typeof item["@context"] === "string" &&
        item["@context"].trim().length > 0
          ? item["@context"]
          : "https://schema.org"
    }));
}

export function JsonLd({ data, json, schema }: JsonLdProps) {
  const source = data ?? json ?? schema;
  const schemas = normaliseSchema(source);

  if (schemas.length === 0) return null;

  const payload = schemas.length === 1 ? schemas[0] : schemas;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c")
      }}
    />
  );
}

export default JsonLd;
