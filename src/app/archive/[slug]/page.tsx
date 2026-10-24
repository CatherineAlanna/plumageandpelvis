import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComparativeTheater } from "@/components/ComparativeTheater";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import {
  catalogNumber,
  exhibitNumber,
  exhibits,
  getExhibit,
  matchLabel,
  neighbours,
  statusLabel,
} from "@/data/exhibits";
import type { Citation, VideoSource } from "@/data/types";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return exhibits.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getExhibit(slug);
  if (!e) return {};
  const title = `${catalogNumber(e.number)}: ${e.title}`;
  return {
    title,
    description: e.description,
    alternates: { canonical: `/archive/${e.slug}` },
    openGraph: { title, description: e.description, url: `/archive/${e.slug}` },
  };
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span> ↗
    </a>
  );
}

function SourceCard({ heading, v, extra }: { heading: string; v: VideoSource; extra?: Citation[] }) {
  return (
    <div className="credit specimen-card">
      <p className="eyebrow" style={{ marginBottom: 14 }}>{heading}</p>
      <dl>
        <dt>Video</dt>
        <dd><ExternalLink href={v.sourceUrl}>{v.sourceTitle}</ExternalLink></dd>
        <dt>Credit</dt>
        <dd>{v.creator}</dd>
        <dt>Player</dt>
        <dd>
          {v.provider === "external"
            ? "Linked only, not embedded"
            : `Publisher’s ${v.provider === "youtube" ? "YouTube" : "Vimeo"} player`}
        </dd>
        <dt>Segment</dt>
        <dd>{v.startSeconds === null ? <span className="tbd">Not yet timestamped</span> : `${v.startSeconds}s`}</dd>
        {v.rightsNote && (
          <>
            <dt>Note</dt>
            <dd>{v.rightsNote}</dd>
          </>
        )}
        {extra?.map((c) => (
          <span key={c.url} style={{ display: "contents" }}>
            <dt>See also</dt>
            <dd><ExternalLink href={c.url}>{c.label}</ExternalLink></dd>
          </span>
        ))}
      </dl>
    </div>
  );
}

export default async function ExhibitPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getExhibit(slug);
  if (!e) notFound();
  const acc = catalogNumber(e.number);
  const { prev, next } = neighbours(e);

  return (
    <article>
      {/* Masthead and hero title */}
      <header className="exhibit-masthead">
        <div className="container masthead-grid">
          <p className="exhibit-number" aria-hidden="true">{exhibitNumber(e.number)}</p>
          <div>
            <div className="meta-row">
              <span className="eyebrow">Exhibit {exhibitNumber(e.number)} / Active investigation</span>
              <span className={`status-badge status-${e.status}`}>{statusLabel[e.status]}</span>
            </div>
            <h1 className="display exhibit-title">{e.title}</h1>
            <p className="exhibit-subjects">
              <span className="binomial">{e.bird.scientificName}</span>
              <span className="muted"> ({e.bird.species})</span>
              <span className="vs" aria-hidden="true"> × </span>
              <span className="visually-hidden"> compared with </span>
              <span>{e.human.performer}, <i>{e.human.work}</i></span>
            </p>
            <p className="lede editorial">{e.description}</p>
          </div>
        </div>
      </header>

      {/* Dual specimen theater */}
      <section className="diptych-wrap" aria-label="Specimen theater">
        <div className="container">
          <ComparativeTheater exhibit={e} />
        </div>
      </section>

      {/* Observe the ritual */}
      <section className="section" style={{ paddingTop: 16 }} aria-labelledby="observe">
        <div className="container field-report">
          <div className="journal">
            <p className="eyebrow" style={{ marginBottom: 6 }}>Editorial · {acc}</p>
            <h2 id="observe" className="display section-title" style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", marginBottom: 18 }}>
              Observe the Ritual
            </h2>
            <ol className="observe-list">
              {e.observation.map((o) => <li key={o}>{o}</li>)}
            </ol>
          </div>
          <aside className="specimen-card" aria-label="Avian specimen label">
            <div className="card-accession">
              <span className="eyebrow">{acc}-A · Avian</span>
              <span className="mono muted">Documented</span>
            </div>
            <h3 className="specimen-name">{e.bird.species}</h3>
            <p style={{ margin: "0 0 16px" }}><span className="binomial">{e.bird.scientificName}</span></p>
            <ul className="behavior-list" aria-label="Documented behaviours">
              {e.bird.facts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      {/* Compare evidence */}
      <section className="section section-alt" aria-labelledby="ledger">
        <div className="container">
          <p className="eyebrow">Compare the evidence</p>
          <h2 id="ledger" className="display section-title" style={{ marginBottom: 14 }}>Observation Ledger</h2>
          <div className="ledger-meta">
            <span className="mono">
              Resemblance: <strong>{matchLabel[e.matchStrength]}</strong>
            </span>
            <span className="fiction-tag" style={{ marginLeft: 0 }}>Satirical editorial judgment</span>
          </div>
          <p className="muted" style={{ fontSize: 15.5, margin: "0 0 20px", maxWidth: "70ch" }}>
            The avian column restates documented behaviour. The human column describes a performance
            and implies nothing about motive. Rows are provisional until both clips have been
            reviewed against each other.
          </p>
          <table className="comparison">
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                <th scope="col">Specimen A / Avian</th>
                <th scope="col">Specimen B / Human</th>
              </tr>
            </thead>
            <tbody>
              {e.ledger.map((r) => (
                <tr key={r.dimension}>
                  <th scope="row" data-label="Dimension" className="mono">{r.dimension}</th>
                  <td data-label="Specimen A / Avian">{r.avian}</td>
                  <td data-label="Specimen B / Human">{r.human}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Natural history note: verified facts, kept apart from the comedy */}
      <section className="section" aria-labelledby="natural-history">
        <div className="container two-col">
          <div>
            <p className="eyebrow">Natural history note · sourced</p>
            <h2 id="natural-history" className="display section-title" style={{ marginBottom: 24 }}>
              {e.bird.species}
            </h2>
            <div className="prose">
              <p className="dropcap">{e.bird.naturalHistory}</p>
            </div>
            <h3 className="eyebrow" style={{ margin: "32px 0 6px" }}>References</h3>
            <ol className="citations">
              {e.bird.citations.map((c) => (
                <li key={c.url}>
                  <span>
                    {c.label} <ExternalLink href={c.url}>{c.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}</ExternalLink>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="sidebar">
            <div className="paper-slip">
              <p className="eyebrow">Scientific claims</p>
              <p>{e.scientificClaimDisclaimer}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Sources */}
      <section className="section section-alt" aria-labelledby="sources">
        <div className="container">
          <p className="eyebrow">Provenance</p>
          <h2 id="sources" className="display section-title" style={{ marginBottom: 14 }}>Sources</h2>
          <p className="muted" style={{ fontSize: 15.5, margin: "0 0 24px", maxWidth: "70ch" }}>
            Third-party videos remain hosted by their owners and play in the owners’ players. No
            footage or stills are copied to this site.
          </p>
          <div className="credits-grid">
            <SourceCard heading="Specimen A / Avian" v={e.bird.video} />
            <SourceCard heading="Specimen B / Human" v={e.human.video} extra={e.human.alternatives} />
          </div>
          <details className="transcript review-notes">
            <summary>Curator’s review notes</summary>
            <p>{e.reviewNotes}</p>
          </details>
        </div>
      </section>

      {/* Share and pagination */}
      <nav className="section" aria-label="Exhibit navigation">
        <div className="container">
          <div className="exhibit-footer-nav" style={{ marginBottom: 28 }}>
            <CopyLinkButton path={`/archive/${e.slug}`} />
            <Link href="/archive" className="btn btn-sm">All exhibits</Link>
          </div>
          <div className="pager">
            {prev ? (
              <Link href={`/archive/${prev.slug}`} className="pager-link">
                <span className="eyebrow">← Previous specimen · {catalogNumber(prev.number)}</span>
                <span className="pager-title">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/archive/${next.slug}`} className="pager-link next">
                <span className="eyebrow">Next specimen · {catalogNumber(next.number)} →</span>
                <span className="pager-title">{next.title}</span>
              </Link>
            ) : (
              <span className="pager-link next disabled">
                <span className="eyebrow">Next specimen</span>
                <span className="pager-title muted">Awaiting field observation</span>
              </span>
            )}
          </div>
        </div>
      </nav>
    </article>
  );
}
