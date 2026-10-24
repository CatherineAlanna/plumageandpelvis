// Content model for the archive. Follows the schema in the "First Three
// Exhibits" brief, keeping unverified material explicitly labelled.

export type Citation = {
  label: string;
  url: string;
};

export type VideoSource = {
  /** youtube/vimeo embed the publisher's own player; external links out only. */
  provider: "youtube" | "vimeo" | "external";
  videoId?: string;
  /** Page for "Watch original". Always required. */
  sourceUrl: string;
  sourceTitle: string;
  creator: string;
  /** Null until the clip has been watched and a segment confirmed. */
  startSeconds: number | null;
  endSeconds: number | null;
  rightsNote?: string;
};

export type LedgerRow = {
  dimension: string;
  avian: string;
  human: string;
};

export type ExhibitStatus = "candidate" | "verified" | "published";

/** Curator's ranking, a satirical editorial judgment rather than a measurement. */
export type MatchStrength = "unassessed" | "conceptual" | "moderate" | "uncanny";

export type Exhibit = {
  id: string;
  slug: string;
  number: number;
  title: string;
  movementType: string;
  status: ExhibitStatus;
  matchStrength: MatchStrength;
  /** Deadpan editorial line. Comedy, not science. */
  description: string;
  scientificClaimDisclaimer: string;
  bird: {
    species: string;
    scientificName: string;
    video: VideoSource;
    /** 100–160 words of sourced, verified natural history. */
    naturalHistory: string;
    facts: string[];
    citations: Citation[];
  };
  human: {
    performer: string;
    work: string;
    video: VideoSource;
    alternatives?: Citation[];
  };
  /** What the viewer should notice. Editorial; asserts no synchronization. */
  observation: string[];
  ledger: LedgerRow[];
  reviewNotes: string;
};
