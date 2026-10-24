"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Seal } from "./Seal";

const links = [
  { href: "/archive", label: "The Archive" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand" aria-label="Plumage & Pelvis, home">
          <Seal className="brand-seal" />
          <span>
            <span className="brand-name">Plumage &amp; Pelvis</span>
            <span className="brand-dept">Dept. of Comparative Courtship Studies</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            {links.map((l) => {
              const current = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <li key={l.href}>
                  <Link href={l.href} aria-current={current ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
