import type { Metadata } from "next";
import Link from "next/link";
import { Seal } from "@/components/Seal";

export const metadata: Metadata = {
  title: "About",
  description: "Plumage & Pelvis is an Unnecessary by Design passion project.",
};

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">About the institution</p>
          <h1 className="display page-title">About</h1>
          <p className="lede">
            A playfully over-investigated collision of pop culture, animal behaviour, and design.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container two-col">
          <div className="prose">
            <h2>The premise</h2>
            <p>
              Somewhere a man is executing a hip roll in front of twenty thousand people. Somewhere
              else a small bird is clearing leaves from a patch of forest floor so that his dance
              will be properly seen. Plumage &amp; Pelvis places these two performances side by
              side, labels them carefully, and refuses to laugh first.
            </p>
            <p>
              The archive is an <strong>Unnecessary by Design</strong> project: a thing that did
              not need to exist, made with more care than it deserves. It is affectionate toward
              its human subjects, sincere about its birds, and committed to the bit.
            </p>

            <h2 id="footage">Footage credits &amp; licensing</h2>
            <p>
              Every exhibit lists the source, creator and segment of each clip in its Sources
              section, with a link to the original. Clips appear only with permission or through a provider’s
              embeddable player under its terms. Music videos and performance recordings are never
              downloaded and re-hosted without the rights holder’s consent.
            </p>
            <p>
              Pairings still under review are marked <em>Candidate</em>. Where a clip can only be
              linked, not embedded, the exhibit shows a “view at source” panel in place of a player.
            </p>

            <h2 id="accessibility">Accessibility</h2>
            <p>
              The archive is designed to meet WCAG 2.2 AA. All controls are keyboard operable,
              focus is always visible, and nothing plays until you press play. Interface motion is
              disabled when your system requests reduced motion. Embedded players request captions
              where the publisher provides them, and every exhibit describes in writing what to
              watch for.
            </p>
            <p>
              If something in the archive does not work for you, the Department would genuinely
              like to know.
            </p>
          </div>
          <aside className="sidebar">
            <Seal detailed className="hero-seal" />
            <div className="paper-slip">
              <p className="eyebrow">Disclaimer</p>
              <p>
                This is satire. The Department of Comparative Courtship Studies is fictional. The
                birds are real.
              </p>
            </div>
            <Link href="/archive" className="btn btn-primary">Enter the Archive</Link>
          </aside>
        </div>
      </section>
    </>
  );
}
