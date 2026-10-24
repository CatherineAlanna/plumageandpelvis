// Content model for the archive. Mirrors section 7 of the build spec, with a
// few additions (citations, candidate counterparts, row verification) so that
// unconfirmed material can be labelled honestly in the UI.

export type VideoSource = {
  kind: "selfHosted" | "youtube" | "vimeo" | "placeholder";
  /** selfHosted: file URL. youtube/vimeo: the video ID. placeholder: unused. */
  url?: string;
  posterUrl?: string;
  sourceTitle: string;
  creator?: string;
  creditUrl?: string;
  licenseNotes?: string;
  startAtSeconds?: number;
  endAtSeconds?: number;
  captionsUrl?: string;
};

export type Citation = {
  label: string;
  url: string;
  note?: string;
};

export type BirdCandidate = {
  commonName: string;
  scientificName: string;
  rationale: string;
  reference: Citation;
};

export type ComparisonRow = {
  human: string;
  avian: string;
  /** False until the behaviour has been confirmed in both chosen clips. */
  verified: boolean;
};

export type Exhibit = {
  id: string;
  slug: string;
  number: number;
  title: string;
  status: "draft" | "published";
  summary: string;
  human: {
    name: string;
    fictionalClassification?: string;
    displayLabel: string;
    behaviors: string[];
    caption: string;
    video: VideoSource;
  };
  bird: {
    /** Use "TBD" until a species has been selected and verified. */
    commonName: string;
    scientificName?: string;
    behaviors: string[];
    caption: string;
    video: VideoSource;
    referenceUrls: string[];
    candidates?: BirdCandidate[];
  };
  hypothesis: string;
  fieldNotes: string;
  comparisonRows: ComparisonRow[];
  narrationText?: string;
  citations: Citation[];
  pendingDecisions?: string[];
  tags: string[];
};

/** A reserved catalogue number with no content yet. Never given media. */
export type ReservedSlot = {
  number: number;
  workingFormat: string;
};
