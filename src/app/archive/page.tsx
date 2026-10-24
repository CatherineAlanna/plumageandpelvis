import type { Metadata } from "next";
import { ArchiveBrowser } from "@/components/ArchiveBrowser";
import { exhibits } from "@/data/exhibits";

export const metadata: Metadata = {
  title: "The Archive",
  description: "Every exhibit in the comparative courtship collection, catalogued.",
};

export default function ArchivePage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <p className="eyebrow">Collection index · {exhibits.length} catalogued</p>
          <h1 className="display page-title">The Archive</h1>
          <p className="lede">
            Each exhibit pairs one avian courtship display with one human performance. Pairings
            marked <em>candidate</em> are under active investigation and have not yet been verified
            against both recordings.
          </p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <ArchiveBrowser exhibits={exhibits} />
        </div>
      </section>
    </>
  );
}
