import Link from "next/link";
import { Seal } from "@/components/Seal";
import { ComparativeTheater } from "@/components/ComparativeTheater";
import { ExhibitCard } from "@/components/ExhibitCard";
import { catalogNumber, exhibitNumber, exhibits, featuredExhibit } from "@/data/exhibits";

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
                View Exhibit {exhibitNumber(featured.number)}
              </Link>
            </div>
          </div>
          <Seal className="hero-seal" detailed />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="featured-title">
        <div className="container featured">
          <ComparativeTheater exhibit={featured} compact />
          <div>
            <div className="meta-row">
              <span className="eyebrow">Featured · {catalogNumber(featured.number)}</span>
              {featured.status === "candidate" && <span className="status-badge">Candidate pairing</span>}
            </div>
            <h2 id="featured-title" className="display section-title">{featured.title}</h2>
            <p className="mono muted" style={{ margin: "6px 0 0" }}>
              <i>{featured.bird.scientificName}</i> × {featured.human.performer}
            </p>
            <p style={{ margin: "18px 0 0" }}>{featured.description}</p>
            <ul className="observations" aria-label="Comparative ledger excerpt">
              {featured.ledger.slice(0, 3).map((r) => (
                <li key={r.dimension}>
                  <span>{r.avian}</span>
                  <span className="vs" aria-hidden="true">≈</span>
                  <span>{r.human}</span>
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
          </div>
        </div>
      </section>
    </>
  );
}
