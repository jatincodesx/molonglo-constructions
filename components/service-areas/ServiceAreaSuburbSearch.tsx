"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ServiceAreaGroup } from "@/lib/service-areas";

type ServiceAreaSuburbSearchProps = {
  groups: ServiceAreaGroup[];
};

function normalise(value: string) {
  return value.toLowerCase().trim();
}

export function ServiceAreaSuburbSearch({ groups }: ServiceAreaSuburbSearchProps) {
  const [query, setQuery] = useState("");
  const filteredGroups = useMemo(() => {
    const searchTerm = normalise(query);

    if (!searchTerm) return groups;

    return groups
      .map((group) => ({
        ...group,
        suburbs: group.suburbs.filter((suburb) =>
          normalise(`${suburb.name} ${group.region}`).includes(searchTerm)
        )
      }))
      .filter((group) => group.suburbs.length > 0);
  }, [groups, query]);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Canberra & ACT Suburb Finder</p>
            <h2 className="heading-lg mt-4">Search the suburbs and regions we regularly discuss with clients.</h2>
          </div>
          <div className="max-w-md">
            <label htmlFor="service-area-search" className="sr-only">
              Search suburbs and service areas
            </label>
            <input
              id="service-area-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-base text-molonglo-ink outline-none transition focus:border-molonglo-gold focus:bg-white focus:ring-2 focus:ring-molonglo-gold/25"
            />
          </div>
        </div>

        {filteredGroups.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredGroups.map((group) => (
              <article key={group.region} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
                <h3 className="font-display text-2xl font-semibold text-molonglo-ink">{group.region}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700">{group.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.region} suburbs`}>
                  {group.suburbs.map((suburb) => (
                    <li key={suburb.name}>
                      {suburb.href ? (
                        <Link href={suburb.href} className="inline-flex rounded-full border border-[#d8cec0] bg-white px-3 py-2 text-sm font-semibold text-[#6f4c25] transition hover:border-molonglo-gold hover:text-molonglo-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-molonglo-gold">
                          {suburb.name}
                        </Link>
                      ) : (
                        <span className="inline-flex rounded-full border border-[#ded4c6] bg-white/70 px-3 py-2 text-sm font-semibold text-zinc-700">
                          {suburb.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-6">
            <p className="text-base leading-7 text-zinc-700">
              No matching suburb is listed. Send the address or suburb through and the team can confirm whether the project is a fit.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
