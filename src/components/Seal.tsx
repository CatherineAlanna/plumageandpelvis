type Props = { className?: string; detailed?: boolean };

/** Circular collection seal. Decorative; the brand name is always in text nearby. */
export function Seal({ className, detailed = false }: Props) {
  return (
    <svg
      className={`seal ${className ?? ""}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id="seal-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="none" stroke="var(--brass)" strokeWidth="2" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="var(--brass)" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="60" fill="var(--surface-alt)" stroke="var(--brass)" strokeWidth="1.25" />
      {detailed && (
        <text fontSize="11.5" fill="var(--brass-light)">
          <textPath href="#seal-ring" startOffset="0" textLength="452" lengthAdjust="spacing">
            DEPT. OF COMPARATIVE COURTSHIP STUDIES · EST. MMXXVI ·
          </textPath>
        </text>
      )}
      {!detailed &&
        Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r1 = 70;
          const r2 = i % 2 ? 78 : 82;
          return (
            <line
              key={i}
              x1={(100 + Math.cos(a) * r1).toFixed(2)}
              y1={(100 + Math.sin(a) * r1).toFixed(2)}
              x2={(100 + Math.cos(a) * r2).toFixed(2)}
              y2={(100 + Math.sin(a) * r2).toFixed(2)}
              stroke="var(--brass)"
              strokeWidth="1.25"
            />
          );
        })}
      {/* Engraved quill-feather emblem */}
      <g fill="none" stroke="var(--brass)" strokeWidth="1.3" strokeLinecap="round">
        <path d="M100 52 C 122 70, 124 112, 100 148 C 76 112, 78 70, 100 52 Z" />
        <path d="M100 58 L100 156" />
        {[66, 76, 86, 96, 106, 116, 126].map((y, i) => (
          <g key={y}>
            <path d={`M100 ${y + 6} Q ${108 + i * 0.6} ${y + 1}, ${114 - Math.abs(i - 3) * 1.5} ${y - 5}`} />
            <path d={`M100 ${y + 6} Q ${92 - i * 0.6} ${y + 1}, ${86 + Math.abs(i - 3) * 1.5} ${y - 5}`} />
          </g>
        ))}
      </g>
      {!detailed && <text
        x="100"
        y="176"
        textAnchor="middle"
        fontSize="10"
        fill="var(--brass-light)"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.3em" }}
      >
        P &amp; P
      </text>}
    </svg>
  );
}
