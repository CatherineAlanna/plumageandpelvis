"use client";

import { useEffect, useState } from "react";
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

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, k) => k);
  for (let k = n - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}

function NextIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5l10 7-10 7z" fill="currentColor" />
      <rect x="16" y="5" width="3.5" height="14" fill="currentColor" />
    </svg>
  );
}

/** The homepage: one random pairing per visit, then Next deals the rest
 *  in a shuffled order before any pairing repeats. */
export function Lek() {
  const [deck, setDeck] = useState<number[]>(() => cast.map((_, k) => k));
  const [pos, setPos] = useState(0);
  useEffect(() => {
    setDeck(shuffled(cast.length));
  }, []);
  const exhibit = cast[deck[pos]];

  const next = () => {
    if (pos + 1 < deck.length) {
      setPos(pos + 1);
    } else {
      // New shuffle, never opening on the pairing just shown.
      let d = shuffled(cast.length);
      if (d.length > 1 && d[0] === deck[pos]) d = [...d.slice(1), d[0]];
      setDeck(d);
      setPos(0);
    }
  };

  return (
    <div className={s.root}>
      <Floor key={exhibit.id} exhibit={exhibit}>
        {cast.length > 1 && (
          <button type="button" className={s.next} onClick={next} aria-label="Next pairing">
            Next <NextIcon />
          </button>
        )}
        <p className="mock-sr" aria-live="polite">
          Now showing {exhibit.bird.species} and {exhibit.human.performer}
        </p>
        <nav className={s.exits} aria-label="Site">
          <Link className={s.dossier} href={`/archive/${exhibit.slug}`}>
            The evidence <ArrowOut />
          </Link>
          <Link className={s.dossier} href="/archive">
            The archive <ArrowOut />
          </Link>
        </nav>
      </Floor>
    </div>
  );
}
