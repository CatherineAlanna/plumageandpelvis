import Link from "next/link";

export default function NotFound() {
  return (
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
  );
}
