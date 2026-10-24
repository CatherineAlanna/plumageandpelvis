"use client";

import { useMemo, useState } from "react";
import type { Exhibit } from "@/data/types";
import { ExhibitCard, ReservedCard } from "./ExhibitCard";

function haystack(e: Exhibit) {
  return [
    e.title,
    e.movementType,
    e.description,
    e.bird.species,
    e.bird.scientificName,
    e.human.performer,
    e.human.work,
  ]
    .join(" ")
    .toLowerCase();
}

export function ArchiveBrowser({ exhibits }: { exhibits: Exhibit[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string | null>(null);
  const types = useMemo(() => Array.from(new Set(exhibits.map((e) => e.movementType))), [exhibits]);
  const q = query.trim().toLowerCase();
  const shown = exhibits.filter(
    (e) => (!type || e.movementType === type) && (!q || haystack(e).includes(q)),
  );
  const filtering = Boolean(type || q);

  return (
    <>
      <div className="archive-tools">
        <div className="search">
          <label htmlFor="archive-search" className="control-label">Search the archive</label>
          <input
            id="archive-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Species, performer, behaviour…"
            autoComplete="off"
          />
        </div>
        <div className="control-group">
          <span className="control-label" id="type-label">Movement type</span>
          <div className="seg" role="group" aria-labelledby="type-label">
            <button type="button" aria-pressed={type === null} onClick={() => setType(null)}>All</button>
            {types.map((t) => (
              <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(type === t ? null : t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mono muted" role="status" aria-live="polite" style={{ margin: "0 0 20px" }}>
        {shown.length} of {exhibits.length} exhibits shown
      </p>
      <h2 className="visually-hidden">Exhibits</h2>
      <div className="card-grid">
        {shown.map((e) => (
          <ExhibitCard key={e.id} exhibit={e} />
        ))}
        {!filtering && <ReservedCard number={exhibits.length + 1} />}
      </div>
      {shown.length === 0 && (
        <p className="lede" style={{ marginTop: 24 }}>
          No specimens match. The Department regrets that this behaviour has not yet been observed.
        </p>
      )}
    </>
  );
}
