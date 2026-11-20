"use client";

import { useState } from "react";
import Link from "next/link";
import { cast, bill } from "@/mocks/cast";
import { useDanceParty, youTubePoster } from "@/mocks/useDanceParty";
import { Well, ArrowOut } from "@/mocks/Well";
import type { Exhibit } from "@/data/types";
import s from "./fight.module.css";

function clock(sec: number) {
  const c = Math.ceil(sec);
  return `0:${String(c).padStart(2, "0")}`;
}

function Bout({ exhibit, children }: { exhibit: Exhibit; children: React.ReactNode }) {
  const b = bill(exhibit);
  const { birdHost, humanHost, phase, remaining, canParty, toggle } = useDanceParty(exhibit);
  const live = phase === "party";
  const top = b.bird.toUpperCase();
  const bottom = b.human.toUpperCase();

  return (
    <div className={s.poster} data-phase={phase}>
      {children}

      <h1 className="mock-sr">
        Plumage &amp; Pelvis: {exhibit.bird.species} versus {exhibit.human.performer}
      </h1>

      <p className={`${s.name} ${s.nameTop}`} style={{ "--chars": top.length } as React.CSSProperties} aria-hidden="true">
        {top}
      </p>

      <div className={s.ring}>
        <Well hostRef={birdHost} live={live} poster={youTubePoster(exhibit.bird.video)} className={`${s.corner} ${s.blue}`} />
        <span className={s.vs} aria-hidden="true">vs</span>
        <Well
          hostRef={humanHost}
          live={live}
          poster={youTubePoster(exhibit.human.video)}
          className={`${s.corner} ${s.red}`}
        >
          {!exhibit.human.video.videoId && (
            <a className={s.offsite} href={exhibit.human.video.sourceUrl} target="_blank" rel="noopener noreferrer">
              Watch at source <ArrowOut />
            </a>
          )}
        </Well>
      </div>

      <p className={`${s.name} ${s.nameBottom}`} style={{ "--chars": bottom.length } as React.CSSProperties} aria-hidden="true">
        {bottom}
      </p>

      <button type="button" className={s.panic} onClick={toggle} disabled={!canParty} aria-pressed={phase !== "idle"}>
        <span className={s.stand} aria-hidden="true">
          <span className={s.mushroom} />
        </span>
        <span className={s.plate}>
          {phase === "idle" ? (
            "30 second dance party"
          ) : phase === "cueing" ? (
            "Gloves on…"
          ) : (
            <>
              <span className={s.clock}>{clock(remaining)}</span> stop
            </>
          )}
        </span>
      </button>
      {!canParty && <p className={s.pending}>Music clip not cleared yet</p>}
    </div>
  );
}

export function FightMock() {
  const [i, setI] = useState(0);
  const exhibit = cast[i];
  return (
    <Bout key={exhibit.id} exhibit={exhibit}>
      <header className={s.bill}>
        <span className={s.presents}>Plumage &amp; Pelvis</span>
        <nav className={s.card} aria-label="Choose a bout">
          {cast.map((e, n) => (
            <button key={e.id} type="button" aria-current={n === i || undefined} onClick={() => setI(n)}>
              {bill(e).bird}
            </button>
          ))}
        </nav>
        <Link className={s.dossier} href={`/archive/${exhibit.slug}`}>
          Evidence <ArrowOut />
        </Link>
      </header>
    </Bout>
  );
}
