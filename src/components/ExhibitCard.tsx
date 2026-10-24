import Link from "next/link";
import type { Exhibit, ReservedSlot } from "@/data/types";
import { catalogNumber } from "@/data/exhibits";

export function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  const bird =
    exhibit.bird.commonName === "TBD" ? "Avian counterpart under review" : exhibit.bird.commonName;
  return (
    <article className="exhibit-card">
      <div className="card-visual" aria-hidden="true">
        <div className="half">{exhibit.human.video.kind === "placeholder" ? "Human footage pending" : "Human"}</div>
        <div className="half">{exhibit.bird.video.kind === "placeholder" ? "Avian footage pending" : "Avian"}</div>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="eyebrow">{catalogNumber(exhibit.number)}</span>
          <span className={`status-badge ${exhibit.status}`}>{exhibit.status === "draft" ? "Draft" : "Published"}</span>
        </div>
        <h3 className="card-title">
          <Link href={`/archive/${exhibit.slug}`}>{exhibit.title}</Link>
        </h3>
        <p className="mono muted">
          {exhibit.human.name} × {bird}
        </p>
        <p>{exhibit.summary}</p>
      </div>
    </article>
  );
}

export function ReservedCard({ slot }: { slot: ReservedSlot }) {
  return (
    <article className="exhibit-card reserved" aria-label={`${catalogNumber(slot.number)}, awaiting field observation`}>
      <div className="card-visual" aria-hidden="true">
        <div className="half">Unoccupied</div>
        <div className="half">Unoccupied</div>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="eyebrow">{catalogNumber(slot.number)}</span>
        </div>
        <h3 className="card-title">Awaiting Field Observation</h3>
        <p className="mono muted">Candidate format: {slot.workingFormat}</p>
        <p className="muted">Catalogue number reserved. No specimens have been collected.</p>
      </div>
    </article>
  );
}
