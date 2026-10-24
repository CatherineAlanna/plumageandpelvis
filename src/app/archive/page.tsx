import type { Metadata } from "next";
import { ExhibitCard, ReservedCard } from "@/components/ExhibitCard";
import { exhibits, reservedSlots } from "@/data/exhibits";

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
            Each exhibit pairs one human performance with one avian courtship display. Specimens are
            admitted only once both recordings have been located, licensed, and reviewed.
          </p>
        </div>
      </header>
      <section className="section">
        <div className="container">
          <h2 className="visually-hidden">Exhibits</h2>
          <div className="card-grid">
            {exhibits.map((e) => (
              <ExhibitCard key={e.id} exhibit={e} />
            ))}
            {reservedSlots.map((s) => (
              <ReservedCard key={s.number} slot={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
