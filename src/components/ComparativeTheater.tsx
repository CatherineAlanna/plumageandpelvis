import type { Exhibit, VideoSource } from "@/data/types";
import { catalogNumber } from "@/data/exhibits";

type Side = "avian" | "human";

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function embedUrl(v: VideoSource): string | undefined {
  if (!v.videoId) return undefined;
  if (v.provider === "youtube") {
    const p = new URLSearchParams({ rel: "0", cc_load_policy: "1" });
    if (v.startSeconds !== null) p.set("start", String(Math.floor(v.startSeconds)));
    if (v.endSeconds !== null) p.set("end", String(Math.floor(v.endSeconds)));
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.videoId)}?${p}`;
  }
  if (v.provider === "vimeo") {
    const t = v.startSeconds !== null ? `#t=${Math.floor(v.startSeconds)}s` : "";
    return `https://player.vimeo.com/video/${encodeURIComponent(v.videoId)}?dnt=1${t}`;
  }
  return undefined;
}

function ExternalPanel({ v, accession }: { v: VideoSource; accession: string }) {
  return (
    <div className="draft-media">
      <span className="draft-corner tl">{accession}</span>
      <span className="draft-corner br">Held off-site</span>
      <div className="draft-inner">
        <p className="eyebrow">Specimen held by its publisher</p>
        <p className="draft-title">View at source</p>
        {v.rightsNote && <p className="draft-note">{v.rightsNote}</p>}
        <a className="btn btn-sm" href={v.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: 14 }}>
          Watch original<span className="visually-hidden"> (opens in a new tab)</span> ↗
        </a>
      </div>
    </div>
  );
}

export function SpecimenVideo({
  side,
  label,
  v,
  accession,
  compact,
}: {
  side: Side;
  label: string;
  v: VideoSource;
  accession: string;
  compact?: boolean;
}) {
  const src = embedUrl(v);
  const letter = side === "avian" ? "A" : "B";
  return (
    <figure className={`specimen-panel ${side}`} style={{ margin: 0 }}>
      <div className="panel-head">
        <span className="panel-kind">
          Specimen {letter} / {side === "avian" ? "Avian" : "Human"}
        </span>
        {!compact && <span className="eyebrow">{label}</span>}
      </div>
      <div className="media-frame">
        {src ? (
          <iframe
            src={src}
            title={`Specimen ${letter}, ${side}: ${v.sourceTitle} (${v.creator})`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <ExternalPanel v={v} accession={accession} />
        )}
      </div>
      {!compact && (
        <figcaption className="panel-caption">
          <span>
            {v.sourceTitle} · {v.creator}
          </span>
          <span className="panel-links">
            <span className="mono muted">
              {v.startSeconds !== null
                ? `Segment ${fmt(v.startSeconds)}${v.endSeconds !== null ? `–${fmt(v.endSeconds)}` : ""}`
                : "Segment not yet timestamped"}
            </span>
            <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer">
              Watch original<span className="visually-hidden"> (opens in a new tab)</span> ↗
            </a>
          </span>
        </figcaption>
      )}
    </figure>
  );
}

export function ComparativeTheater({ exhibit, compact = false }: { exhibit: Exhibit; compact?: boolean }) {
  const acc = catalogNumber(exhibit.number);
  return (
    <div>
      <div className="diptych">
        <SpecimenVideo
          side="avian"
          label={exhibit.bird.scientificName}
          v={exhibit.bird.video}
          accession={`${acc}-A`}
          compact={compact}
        />
        <SpecimenVideo
          side="human"
          label={exhibit.human.performer}
          v={exhibit.human.video}
          accession={`${acc}-B`}
          compact={compact}
        />
      </div>
      {!compact && (
        <p className="playback-note">
          Each specimen is held by its original publisher and plays in that publisher’s own player.
          Play them one at a time. Nothing here is synchronised, and nothing plays with sound until
          you ask it to.
        </p>
      )}
    </div>
  );
}
