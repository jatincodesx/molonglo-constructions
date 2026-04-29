"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import type { PageRecord } from "@/lib/admin-pages";
import type { SeoOverride } from "@/lib/admin-db";

export function SeoManagerClient({ pages, overrides }: { pages: PageRecord[]; overrides: SeoOverride[] }) {
  const [selectedPath, setSelectedPath] = useState(pages[0]?.path || "/");
  const selectedPage = pages.find((page) => page.path === selectedPath) || pages[0];
  const existingOverride = overrides.find((override) => override.path === selectedPath);
  const [title, setTitle] = useState(existingOverride?.title || selectedPage?.title || "");
  const [description, setDescription] = useState(existingOverride?.description || selectedPage?.description || "");
  const [schema, setSchema] = useState(existingOverride?.schema || "");
  const [message, setMessage] = useState("");

  const previewUrl = useMemo(() => `molongloconstructions.com.au${selectedPath === "/" ? "" : selectedPath}`, [selectedPath]);

  function choose(path: string) {
    const page = pages.find((item) => item.path === path);
    const override = overrides.find((item) => item.path === path);
    setSelectedPath(path);
    setTitle(override?.title || page?.title || "");
    setDescription(override?.description || page?.description || "");
    setSchema(override?.schema || "");
    setMessage("");
  }

  async function save() {
    const response = await fetch("/api/admin/seo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: selectedPath, title, description, schema })
    });

    setMessage(response.ok ? "SEO settings saved." : "Unable to save SEO settings.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-[#f6f3ee] text-left text-zinc-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">URL</th>
                  <th className="px-5 py-4 font-semibold">Title</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Last Updated</th>
                  <th className="px-5 py-4 font-semibold">Warnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {pages.map((page) => (
                  <tr key={page.path} className={page.path === selectedPath ? "bg-zinc-50" : ""} onClick={() => choose(page.path)}>
                    <td className="cursor-pointer px-5 py-4 font-semibold text-molonglo-ink">{page.path}</td>
                    <td className="px-5 py-4 text-zinc-600">{page.title}</td>
                    <td className="px-5 py-4 text-zinc-600">{page.status}</td>
                    <td className="px-5 py-4 text-zinc-600">{page.lastUpdated}</td>
                    <td className="px-5 py-4 text-zinc-600">{page.warnings.join(", ") || "OK"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Edit SEO metadata</h2>
          <div className="mt-6 grid gap-4">
            <Field label="Page">
              <Select value={selectedPath} onChange={(event) => choose(event.target.value)}>
                {pages.map((page) => (
                  <option key={page.path} value={page.path}>{page.path}</option>
                ))}
              </Select>
            </Field>
            <Field label="Meta Title">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} />
            </Field>
            <Field label="Meta Description">
              <Textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} />
            </Field>
            <Field label="Schema JSON-LD Override">
              <Textarea rows={8} value={schema} onChange={(event) => setSchema(event.target.value)} />
            </Field>
            <Button type="button" onClick={save}>Save SEO Settings</Button>
            {message ? <p className="text-sm font-semibold text-molonglo-gold">{message}</p> : null}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-zinc-200 bg-white p-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-molonglo-ink">Snippet preview</h2>
          <div className="mt-6 rounded-xl border border-zinc-200 p-5">
            <p className="text-sm text-[#202124]">{previewUrl}</p>
            <h3 className="mt-1 text-xl font-normal leading-7 text-[#1a0dab]">{title || "Meta title preview"}</h3>
            <p className="mt-1 text-sm leading-6 text-[#4d5156]">{description || "Meta description preview"}</p>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div className="rounded-lg bg-zinc-100 p-4"><strong>{title.length}</strong><br />title chars</div>
            <div className="rounded-lg bg-zinc-100 p-4"><strong>{description.length}</strong><br />description chars</div>
            <div className="rounded-lg bg-zinc-100 p-4"><strong>{selectedPage?.warnings.length || 0}</strong><br />warnings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
