import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
    <a href="#main" className="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">
    <section className="not-found">
      <div className="container">
        <p className="eyebrow">Accession not located</p>
        <h1 className="display">Specimen Missing</h1>
        <p className="lede" style={{ margin: "16px auto 32px" }}>
          The cabinet you requested is empty. It may have been misfiled, or it was never collected.
        </p>
        <Link href="/archive" className="btn btn-primary">Return to the Archive</Link>
      </div>
    </section>
    </main>
    <SiteFooter />
    </>
  );
}
