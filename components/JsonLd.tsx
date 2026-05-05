import { normalizeStructuredData, type SchemaObject } from "@/lib/structured-data";

type JsonLdProps = {
  data?: SchemaObject | SchemaObject[] | null;
  json?: SchemaObject | SchemaObject[] | null;
  schema?: SchemaObject | SchemaObject[] | null;
};

export function JsonLd({ data, json, schema }: JsonLdProps) {
  const source = data ?? json ?? schema;
  const payload = normalizeStructuredData(source);

  if (payload.length === 0) return null;

  return (
    <>
      {payload.map((item, index) => (
        <script
          key={`${String(item["@type"])}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c")
          }}
        />
      ))}
    </>
  );
}

export default JsonLd;
