import Link from "next/link";
import type { Exhibit } from "@/data/types";
import { catalogNumber, statusLabel } from "@/data/exhibits";

export function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  return (
    <article className="exhibit-card">
      <div className="card-visual" aria-hidden="true">
        <div className="half">
          <span>Avian<br /><i>{exhibit.bird.scientificName}</i></span>
        </div>
        <div className="half">
          <span>Human<br />{exhibit.human.performer}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="eyebrow">{catalogNumber(exhibit.number)}</span>
          <span className={`status-badge status-${exhibit.status}`}>
            {exhibit.status === "candidate" ? "Candidate" : statusLabel[exhibit.status]}
          </span>
        </div>
        <h3 className="card-title">
          <Link href={`/archive/${exhibit.slug}`}>{exhibit.title}</Link>
        </h3>
        <p className="mono muted">
          {exhibit.bird.species} × {exhibit.human.performer}
        </p>
        <p>{exhibit.description}</p>
        <p className="mono muted card-type">Movement type: {exhibit.movementType}</p>
      </div>
    </article>
  );
}

export function ReservedCard({ number }: { number: number }) {
  return (
    <article className="exhibit-card reserved" aria-label={`${catalogNumber(number)}, awaiting field observation`}>
      <div className="card-visual" aria-hidden="true">
        <div className="half">Unoccupied</div>
        <div className="half">Unoccupied</div>
      </div>
      <div className="card-body">
        <span className="eyebrow">{catalogNumber(number)}</span>
        <h3 className="card-title">Awaiting Field Observation</h3>
        <p className="muted">Catalogue number reserved. No specimens have been collected.</p>
      </div>
    </article>
  );
}
