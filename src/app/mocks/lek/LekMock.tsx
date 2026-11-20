"use client";

import { useState } from "react";
import Link from "next/link";
import { cast, bill } from "@/mocks/cast";
import { useDanceParty, youTubePoster } from "@/mocks/useDanceParty";
import { Well, ArrowOut, fmtClock } from "@/mocks/Well";
import type { Exhibit } from "@/data/types";
import s from "./lek.module.css";

/** The word painted on the dome. "30 Second Dance Party" is a trademarked
 *  product name, so the button says something of our own. */
const PAINTED = "Strut";

function Floor({ exhibit, children }: { exhibit: Exhibit; children: React.ReactNode }) {
  const b = bill(exhibit);
  const { birdHost, humanHost, phase, remaining, canParty, toggle } = useDanceParty(exhibit);
  const live = phase === "party";

  return (
    <div className={s.floor} data-phase={phase}>
      <div className={s.lights} aria-hidden="true" />

      <h1 className={s.word}>
        <span className={s.top}>Plumage</span>
        <span className={s.amp}>&amp;</span>
        <span className={s.bottom}>Pelvis</span>
      </h1>

      <div className={s.pair}>
        <Well hostRef={birdHost} live={live} poster={youTubePoster(exhibit.bird.video)} className={`${s.panel} ${s.bird}`}>
          <span className={s.tape}>{b.bird}</span>
        </Well>
        <Well
          hostRef={humanHost}
          live={live}
          poster={youTubePoster(exhibit.human.video)}
          className={`${s.panel} ${s.human}`}
        >
          {!exhibit.human.video.videoId && (
            <a className={s.offsite} href={exhibit.human.video.sourceUrl} target="_blank" rel="noopener noreferrer">
              Watch at source <ArrowOut />
            </a>
          )}
          <span className={s.tape}>{b.human}</span>
        </Well>
      </div>

      <div className={s.console}>
        <button
          type="button"
          className={s.panic}
          onClick={toggle}
          disabled={!canParty}
          aria-pressed={phase !== "idle"}
          aria-label={phase === "idle" ? `${PAINTED}: play both dances together for 30 seconds` : "Stop"}
          title={phase === "idle" ? "Both dances, his music, 30 seconds" : "Stop"}
        >
          <span className={s.housing} aria-hidden="true">
            <span className={s.dome}>
              <span className={s.domeText}>{live ? fmtClock(remaining) : phase === "cueing" ? "…" : PAINTED}</span>
            </span>
          </span>
        </button>
        {!canParty && <p className={s.pending}>Music clip not cleared yet</p>}
      </div>

      {children}
    </div>
  );
}

export function LekMock() {
  const [i, setI] = useState(0);
  const exhibit = cast[i];
  return (
    <div className={s.root}>
      <Floor key={exhibit.id} exhibit={exhibit}>
        <nav className={s.lineup} aria-label="Choose a pairing">
          {cast.map((e, n) => (
            <button key={e.id} type="button" aria-current={n === i || undefined} onClick={() => setI(n)}>
              {bill(e).bird}
            </button>
          ))}
        </nav>
        <Link className={s.dossier} href={`/archive/${exhibit.slug}`}>
          The evidence <ArrowOut />
        </Link>
      </Floor>
    </div>
  );
}
