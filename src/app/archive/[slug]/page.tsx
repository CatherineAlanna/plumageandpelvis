import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoDiptych } from "@/components/VideoDiptych";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { catalogNumber, exhibits, getExhibit, nextExhibit } from "@/data/exhibits";
import type { Exhibit, VideoSource } from "@/data/types";

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
    description: e.hypothesis,
    alternates: { canonical: `/archive/${e.slug}` },
    openGraph: { title, description: e.summary, url: `/archive/${e.slug}` },
  };
}

function birdName(e: Exhibit) {
  return e.bird.commonName === "TBD" ? "Species to be confirmed" : e.bird.commonName;
}

function Credit({ side, v }: { side: string; v: VideoSource }) {
  const pending = v.kind === "placeholder";
  return (
    <div className="credit specimen-card">
      <p className="eyebrow" style={{ marginBottom: 14 }}>{side} footage</p>
      <dl>
        <dt>Source</dt>
        <dd>{v.creditUrl ? <a href={v.creditUrl}>{v.sourceTitle}</a> : v.sourceTitle}</dd>
        <dt>Creator</dt>
        <dd>{v.creator ?? <span className="tbd">TBD</span>}</dd>
        <dt>Licence</dt>
        <dd>{v.licenseNotes ?? <span className="tbd">TBD</span>}</dd>
        <dt>Segment</dt>
        <dd>
          {pending || v.startAtSeconds === undefined ? (
            <span className="tbd">TBD</span>
          ) : (
            `${v.startAtSeconds}s – ${v.endAtSeconds !== undefined ? `${v.endAtSeconds}s` : "end"}`
          )}
        </dd>
        <dt>Captions</dt>
        <dd>{v.captionsUrl ? "Available" : <span className="tbd">{pending ? "TBD" : "Not provided"}</span>}</dd>
      </dl>
    </div>
  );
}

export default async function ExhibitPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = getExhibit(slug);
  if (!e) notFound();
  const acc = catalogNumber(e.number);
  const next = nextExhibit(e);
  const birdPending = e.bird.commonName === "TBD";

  return (
    <article>
      {/* 1. Catalogue number, title, hypothesis */}
      <header className="exhibit-masthead">
        <div className="container masthead-grid">
          <p className="exhibit-number" aria-hidden="true">{String(e.number).padStart(3, "0")}</p>
          <div>
            <div className="meta-row">
              <span className="eyebrow">Exhibit {acc}</span>
              <span className={`status-badge ${e.status}`}>
                {e.status === "draft" ? "Draft exhibit · footage pending" : "Published"}
              </span>
            </div>
            <h1 className="display exhibit-title">{e.title}</h1>
            <p className="lede">{e.hypothesis}</p>
          </div>
        </div>
      </header>

      {/* 2–3. Paired video presentation */}
      <section className="diptych-wrap" aria-label="Paired specimen footage">
        <div className="container">
          <VideoDiptych exhibit={e} />
        </div>
      </section>

      {/* 4. Specimen cards */}
      <section className="section" style={{ paddingTop: 24 }} aria-labelledby="specimens">
        <div className="container">
          <h2 id="specimens" className="eyebrow" style={{ marginBottom: 20 }}>Specimen labels</h2>
          <div className="specimen-cards">
            <section className="specimen-card human" aria-label="Human specimen">
              <div className="card-accession">
                <span className="eyebrow">{acc}-H · Human</span>
                <span className="mono muted">Performance display</span>
              </div>
              <h3 className="specimen-name">{e.human.name}</h3>
              {e.human.fictionalClassification && (
                <p style={{ margin: 0 }}>
                  <span className="binomial">{e.human.fictionalClassification}</span>
                  <span className="fiction-tag">Fictional</span>
                </p>
              )}
              <p className="descriptor">{e.human.displayLabel}</p>
              <ul className="behavior-list" aria-label="Observed behaviours">
                {e.human.behaviors.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </section>
            <section className="specimen-card avian" aria-label="Avian specimen">
              <div className="card-accession">
                <span className="eyebrow">{acc}-A · Avian</span>
                <span className="mono muted">Courtship display</span>
              </div>
              <h3 className="specimen-name">{birdName(e)}</h3>
              <p style={{ margin: 0 }}>
                {e.bird.scientificName ? (
                  <span className="binomial">{e.bird.scientificName}</span>
                ) : (
                  <span className="tbd">Scientific name: TBD</span>
                )}
              </p>
              <p className="descriptor">
                {birdPending
                  ? "Counterpart species has not been selected. Candidates under review are listed in the field report below."
                  : e.bird.caption}
              </p>
              {e.bird.behaviors.length > 0 ? (
                <ul className="behavior-list" aria-label="Observed behaviours">
                  {e.bird.behaviors.map((b) => <li key={b}>{b}</li>)}
                </ul>
              ) : (
                <p className="tbd">Observed behaviours: TBD, pending footage review</p>
              )}
            </section>
          </div>
        </div>
      </section>

      {/* 5. Matching behaviour annotation */}
      <section className="section section-alt" aria-labelledby="comparison">
        <div className="container">
          <p className="eyebrow">Comparative analysis</p>
          <h2 id="comparison" className="display section-title" style={{ marginBottom: 28 }}>Mirrored Observations</h2>
          <p className="muted" style={{ fontSize: 15.5, margin: "-12px 0 20px" }}>
            Avian entries are provisional until the counterpart clip has been reviewed against the human performance.
          </p>
          <table className="comparison">
            <thead>
              <tr>
                <th scope="col">Human performance</th>
                <th scope="col">Avian performance</th>
              </tr>
            </thead>
            <tbody>
              {e.comparisonRows.map((r) => (
                <tr key={r.human}>
                  <th scope="row" data-label="Human performance">{r.human}</th>
                  <td data-label="Avian performance">
                    {r.avian}
                    {!r.verified && <span className="tbd row-status">Pending verification</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Field report */}
      <section className="section" aria-labelledby="field-report">
        <div className="container">
          <p className="eyebrow">Field report</p>
          <h2 id="field-report" className="display section-title" style={{ marginBottom: 28 }}>Notes from the Arena</h2>
          <div className="field-report">
            <div className="journal">
              <p className="eyebrow" style={{ marginBottom: 14 }}>Observer’s journal · {acc}</p>
              <blockquote>
                <p className="dropcap">{e.fieldNotes}</p>
              </blockquote>
              {e.narrationText && (
                <details className="transcript">
                  <summary>Narration transcript</summary>
                  <p>{e.narrationText}</p>
                  <p className="mono muted" style={{ fontStyle: "normal" }}>
                    Draft script. Narration has not been recorded.
                  </p>
                </details>
              )}
            </div>
            {e.pendingDecisions && e.pendingDecisions.length > 0 && (
              <aside className="paper-slip" aria-label="Outstanding curatorial decisions">
                <p className="eyebrow">Curator’s slip · outstanding</p>
                <ol className="pending-list" style={{ marginTop: 12 }}>
                  {e.pendingDecisions.map((d) => <li key={d}>{d}</li>)}
                </ol>
              </aside>
            )}
          </div>

          {e.bird.candidates && e.bird.candidates.length > 0 && (
            <div style={{ marginTop: 56 }}>
              <h3 className="eyebrow" style={{ marginBottom: 18 }}>Candidate avian counterparts under review</h3>
              <div className="candidates">
                {e.bird.candidates.map((c) => (
                  <div className="candidate" key={c.scientificName}>
                    <span className="mono muted">Candidate</span>
                    <h4 className="display">{c.commonName}</h4>
                    <span className="binomial">{c.scientificName}</span>
                    <p>{c.rationale}</p>
                    <a className="ref" href={c.reference.url}>Reference ↗</a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 56 }}>
            <h3 className="eyebrow" style={{ marginBottom: 6 }}>Natural-history citations</h3>
            <ol className="citations">
              {e.citations.map((c) => (
                <li key={c.url}>
                  <span>
                    {c.label} <a href={c.url}>{c.url.replace(/^https?:\/\//, "")}</a>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Source credits */}
      <section className="section section-alt" aria-labelledby="credits">
        <div className="container">
          <p className="eyebrow">Provenance</p>
          <h2 id="credits" className="display section-title" style={{ marginBottom: 28 }}>Footage Credits</h2>
          <div className="credits-grid">
            <Credit side="Human" v={e.human.video} />
            <Credit side="Avian" v={e.bird.video} />
          </div>
        </div>
      </section>

      {/* 8. Share and next */}
      <section className="section" aria-label="Share and continue">
        <div className="container exhibit-footer-nav">
          <CopyLinkButton path={`/archive/${e.slug}`} />
          {next ? (
            <Link href={`/archive/${next.slug}`} className="btn btn-primary">
              Next: {catalogNumber(next.number)} {next.title} →
            </Link>
          ) : (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <span className="mono muted">Next exhibit awaiting field observation</span>
              <Link href="/archive" className="btn">Return to the Archive</Link>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
