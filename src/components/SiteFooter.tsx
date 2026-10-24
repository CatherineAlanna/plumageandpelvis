import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h2>A note from the Department</h2>
            <p>
              Plumage &amp; Pelvis is a work of satire. The Department of Comparative Courtship
              Studies does not exist, the human taxonomies are fictional, and no performer is
              assumed to be dancing for any reason other than art. The birds, however, are real,
              and are described as accurately as the researchers can manage.
            </p>
          </div>
          <div>
            <h2>The Collection</h2>
            <ul>
              <li><Link href="/archive">The Archive</Link></li>
              <li><Link href="/archive/the-showman">Exhibit 001: The Showman</Link></li>
              <li><Link href="/methodology">Methodology</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
          <div>
            <h2>Records</h2>
            <ul>
              <li><Link href="/methodology#sources">Sources &amp; citations</Link></li>
              <li><Link href="/about#footage">Footage credits &amp; licensing</Link></li>
              <li><Link href="/about#accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span className="mono muted">An Unnecessary by Design project</span>
          <span className="mono muted">Catalogued with excessive care, MMXXVI</span>
        </div>
      </div>
    </footer>
  );
}
