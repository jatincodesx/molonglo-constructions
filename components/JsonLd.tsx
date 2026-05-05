import { normalizeStructuredDataPayload, type SchemaObject } from "@/lib/structured-data";

type JsonLdProps = {
  data?: SchemaObject | SchemaObject[] | null;
  json?: SchemaObject | SchemaObject[] | null;
  schema?: SchemaObject | SchemaObject[] | null;
};

export function JsonLd({ data, json, schema }: JsonLdProps) {
  const source = data ?? json ?? schema;
  const payload = normalizeStructuredDataPayload(source);

  if (!payload) return null;

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
