"use client";

import { useState } from "react";
import Link from "next/link";
import { cast, bill } from "@/mocks/cast";
import { PARTY_SECONDS, useDanceParty, youTubePoster } from "@/mocks/useDanceParty";
import { Well, ArrowOut, fmtClock } from "@/mocks/Well";
import type { Exhibit } from "@/data/types";
import s from "./plumage.module.css";

// Dome colour and the ink printed on it, per pairing.
const DOME: Record<string, [string, string]> = {
  "the-chest-thruster": ["#D9101C", "#FFF6F0"],
  "the-moonwalker": ["#FFD60A", "#0A0A0A"],
  "the-ballerina": ["#2AF5D9", "#0B0A1A"],
};

function Ring({ id, text }: { id: string; text: string }) {
  const unit = `${text} · `;
  const phrase = unit.repeat(Math.max(2, Math.round(58 / unit.length)));
  return (
    <svg className={s.ring} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id={id} d="M100,100 m-93,0 a93,93 0 1,1 186,0 a93,93 0 1,1 -186,0" />
      </defs>
      <text>
        <textPath href={`#${id}`} textLength="584" lengthAdjust="spacing">
          {phrase}
        </textPath>
      </text>
    </svg>
  );
}

function Plate({ exhibit, children }: { exhibit: Exhibit; children: React.ReactNode }) {
  const b = bill(exhibit);
  const { birdHost, humanHost, phase, remaining, canParty, toggle } = useDanceParty(exhibit);
  const live = phase === "party";
  // The wordmark melts as the party runs: Climate Crisis's YEAR axis, 1979 → 2050.
  const year = live ? 1979 + Math.round(((PARTY_SECONDS - remaining) / PARTY_SECONDS) * 71) : 1979;

  return (
    <div
      className={s.plate}
      data-phase={phase}
      style={
        {
          "--ground": b.ground,
          "--accent": b.accent,
          "--ink": b.ink,
          "--dome": (DOME[exhibit.slug] ?? DOME["the-chest-thruster"])[0],
          "--dome-ink": (DOME[exhibit.slug] ?? DOME["the-chest-thruster"])[1],
        } as React.CSSProperties
      }
    >
      {children}

      <div className={s.eyes}>
        <div className={`${s.eye} ${s.left}`}>
          <Well hostRef={birdHost} live={live} poster={youTubePoster(exhibit.bird.video)} className={s.iris} />
          <Ring id={`ring-b-${exhibit.slug}`} text={exhibit.bird.species} />
        </div>
        <div className={`${s.eye} ${s.right}`}>
          <Well hostRef={humanHost} live={live} poster={youTubePoster(exhibit.human.video)} className={s.iris}>
            {!exhibit.human.video.videoId && (
              <a className={s.offsite} href={exhibit.human.video.sourceUrl} target="_blank" rel="noopener noreferrer">
                Watch at source <ArrowOut />
              </a>
            )}
          </Well>
          <Ring id={`ring-h-${exhibit.slug}`} text={exhibit.human.performer} />
        </div>

        <button type="button" className={s.panic} onClick={toggle} disabled={!canParty} aria-pressed={phase !== "idle"}>
          <span className={s.pedestal} aria-hidden="true">
            <span className={s.dome}>
              <span>{live ? fmtClock(remaining) : phase === "cueing" ? "…" : "30"}</span>
            </span>
          </span>
          <span className={s.label}>{phase === "idle" ? "Second dance party" : "Stop"}</span>
        </button>
      </div>

      <h1 className={s.word} style={{ fontVariationSettings: `"YEAR" ${year}` }}>
        Plumage&nbsp;&amp; Pelvis
      </h1>
      {!canParty && <p className={s.pending}>Music clip not cleared yet</p>}
    </div>
  );
}

export function PlumageMock() {
  const [i, setI] = useState(0);
  const exhibit = cast[i];
  return (
    <Plate key={exhibit.id} exhibit={exhibit}>
      <nav className={s.swatches} aria-label="Choose a pairing">
        {cast.map((e, n) => {
          const b = bill(e);
          return (
            <button
              key={e.id}
              type="button"
              aria-current={n === i || undefined}
              aria-label={`${e.bird.species} and ${e.human.performer}`}
              title={`${b.bird} × ${b.human}`}
              onClick={() => setI(n)}
              style={{ "--sw": b.ground, "--sw2": b.accent } as React.CSSProperties}
            />
          );
        })}
      </nav>
      <Link className={s.dossier} href={`/archive/${exhibit.slug}`}>
        Evidence <ArrowOut />
      </Link>
    </Plate>
  );
}
