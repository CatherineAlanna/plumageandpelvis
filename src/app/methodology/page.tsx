import type { Metadata } from "next";
import { exhibits } from "@/data/exhibits";

export const metadata: Metadata = {
  title: "Methodology",
  description: "Selection criteria, limitations, and sources of the comparative courtship research program.",
};

const criteria = [
  ["Conspicuous movement", "The display must be visible from the back of the auditorium, or the far side of the clearing."],
  ["Repeated gesture", "A movement performed once is an accident. Performed eight times on the beat, it is a behaviour."],
  ["Staging", "Prepared arenas, cleared courts, lighting rigs, and leks all qualify."],
  ["Ornamentation", "Plumes, trains, air sacs, sequins, open shirts, and comparable structures."],
  ["Audience engagement", "Evidence that the performance is directed toward an observer."],
  ["Rhythm", "A discernible tempo, whether supplied by a drummer or by the bird’s own anatomy."],
];

export default function MethodologyPage() {
  const allCitations = Array.from(
    new Map(exhibits.flatMap((e) => e.bird.citations).map((c) => [c.url, c])).values(),
  );
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Research protocol · revision 1.2</p>
          <h1 className="display page-title">Methodology</h1>
          <p className="lede">
            The Department’s methods are rigorous, its sample sizes small, and its central
            hypothesis entirely unnecessary. What follows is a formal account of how specimens are
            selected, compared, and catalogued.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container two-col">
          <div className="prose">
            <h2>Selection criteria</h2>
            <p>
              A pairing is admitted to the archive only when both performances satisfy a majority
              of the following criteria, as assessed by a panel of one or more researchers who
              have watched the footage more times than is strictly healthy.
            </p>
            <ul className="behavior-list" style={{ maxWidth: "none", marginBottom: "1.6em" }}>
              {criteria.map(([name, desc]) => (
                <li key={name}>
                  <span><strong>{name}.</strong> {desc}</span>
                </li>
              ))}
            </ul>

            <h2>Pairing procedure</h2>
            <p>
              The human performance is located first. A counterpart bird is then chosen on the
              basis of <em>observed movement</em> in licensed footage, not mere resemblance of
              costume. Every natural-history statement is checked against reputable ornithological
              sources before publication. Specimen labels and comparisons are written only after
              both clips have been reviewed side by side.
            </p>

            <h2>Limitations</h2>
            <p>
              The behavioural parallels recorded here are humorous observations. They are{" "}
              <strong>not evidence of shared motives or equivalent evolutionary mechanisms</strong>.
              Human performers dance for artistic, commercial, and personal reasons that this
              Department has neither the standing nor the inclination to investigate. No claim is
              made about any performer’s intentions, romantic or otherwise.
            </p>
            <p>
              The birds, by contrast, are generally quite clear about what they want. Their
              behaviour is described using published sources, and where the literature is
              uncertain, so are we.
            </p>
            <p>
              Satirical human taxonomies, such as <i>Homo sapiens deruloensis</i>, are fictional
              and labelled as such wherever they appear.
            </p>

            <h2>Footage</h2>
            <p>
              Recordings are used only with permission or under the terms of an embeddable player.
              Where two clips cannot be controlled together, the archive presents two independent
              players rather than pretending otherwise. Where footage has not yet been licensed, the
              exhibit says so plainly. No poster frames or recordings are fabricated.
            </p>

            <h2 id="sources">Sources</h2>
            <ol className="citations">
              {allCitations.map((c) => (
                <li key={c.url}>
                  <span>
                    {c.label} <a href={c.url}>{c.url.replace(/^https?:\/\//, "")}</a>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="sidebar">
            <div className="paper-slip">
              <p className="eyebrow">Ethics note</p>
              <p>
                The Department compares choreography, staging, ornaments, and signals. It does not
                rate the men.
              </p>
            </div>
            <div className="specimen-card">
              <p className="eyebrow">Comparison dimensions</p>
              <p className="mono muted" style={{ margin: "10px 0 0", lineHeight: 1.9 }}>
                Strutting<br />Synchronization<br />Ornamentation<br />Vocalization<br />Audience selection
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
