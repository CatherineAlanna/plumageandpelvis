"use client";

import type { RefObject } from "react";

/** A video well: the publisher's player behind a still, revealed during the party. */
export function Well({
  hostRef,
  poster,
  live,
  className,
  children,
}: {
  hostRef: RefObject<HTMLDivElement | null>;
  poster?: string;
  live: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className} data-live={live || undefined} style={{ position: "relative", overflow: "hidden" }}>
      <div
        ref={hostRef}
        className="well-host"
        aria-hidden={!live}
        style={{ position: "absolute", inset: 0 }}
      />
      <div
        className="well-veil"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "var(--veil, #111)",
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: live ? 0 : 1,
          transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

export function ArrowOut({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: "inline-block" }}>
      <path d="M5 3h8v8M13 3 3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

export function fmtClock(s: number): string {
  return String(Math.ceil(s)).padStart(2, "0");
}
