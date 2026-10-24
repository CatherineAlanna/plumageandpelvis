import Link from "next/link";
import { Seal } from "@/components/Seal";
import { VideoDiptych } from "@/components/VideoDiptych";
import { ExhibitCard, ReservedCard } from "@/components/ExhibitCard";
import { catalogNumber, exhibits, featuredExhibit, reservedSlots } from "@/data/exhibits";

export default function HomePage() {
  const featured = featuredExhibit();
  return (
    <>
      <section className="hero" aria-labelledby="masthead">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Department of Comparative Courtship Studies · Est. MMXXVI</p>
            <h1 id="masthead" className="display masthead">
              Plumage <span className="amp">&amp;</span> Pelvis
            </h1>
            <p className="subtitle">A Comparative Archive of Human and Avian Courtship Displays</p>
            <hr className="rule-brass" style={{ maxWidth: 120, marginBottom: 32 }} />
            <h2>The mating ritual is rarely subtle.</h2>
            <p className="lede">
              An ongoing comparative investigation into displays of rhythm, ornamentation, and
              extraordinary confidence across species.
            </p>
            <div className="hero-actions">
              <Link href="/archive" className="btn btn-primary">Enter the Archive</Link>
              <Link href={`/archive/${featured.slug}`} className="btn">
                View Exhibit {String(featured.number).padStart(3, "0")}
              </Link>
            </div>
          </div>
          <Seal className="hero-seal" detailed />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="featured-title">
        <div className="container featured">
          <VideoDiptych exhibit={featured} compact />
          <div>
            <div className="meta-row">
              <span className="eyebrow">Featured · {catalogNumber(featured.number)}</span>
              {featured.status === "draft" && <span className="status-badge">Draft · footage pending</span>}
            </div>
            <h2 id="featured-title" className="display section-title">{featured.title}</h2>
            <p className="mono muted" style={{ margin: "6px 0 0" }}>
              <i>{featured.human.fictionalClassification}</i> (fictional) × avian counterpart under review
            </p>
            <ul className="observations" aria-label="Matching observations">
              {featured.comparisonRows.slice(0, 3).map((r) => (
                <li key={r.human}>
                  <span>{r.human}</span>
                  <span className="vs" aria-hidden="true">≈</span>
                  <span>{r.avian}</span>
                </li>
              ))}
            </ul>
            <Link href={`/archive/${featured.slug}`} className="btn btn-primary">Examine the exhibit</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="preview-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2 id="preview-title" className="display section-title">From the Archive</h2>
            </div>
            <Link href="/archive" className="btn btn-sm">All exhibits</Link>
          </div>
          <div className="card-grid">
            {exhibits.map((e) => (
              <ExhibitCard key={e.id} exhibit={e} />
            ))}
            {reservedSlots.slice(0, 2).map((s) => (
              <ReservedCard key={s.number} slot={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
