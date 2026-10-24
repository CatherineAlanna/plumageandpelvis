import type { Citation, Exhibit, ReservedSlot } from "./types";

const sageGrouse: Citation = {
  label: "Greater Sage-Grouse overview. All About Birds, Cornell Lab of Ornithology.",
  url: "https://www.allaboutbirds.org/guide/Greater_Sage-Grouse/overview",
};

const westernParotia: Citation = {
  label:
    "“Bird-of-Paradise Spreads His Feather Skirt and Dances.” Bird Academy, Cornell Lab of Ornithology.",
  url: "https://academy.allaboutbirds.org/bird-of-paradise-spreads-his-feather-skirt-and-dances/",
};

const manakinSong: Citation = {
  label:
    "Trainer, J. M. & McDonald, D. B. (1995). Singing performance, frequency matching and courtship success of long-tailed manakins (Chiroxiphia linearis). Behavioral Ecology and Sociobiology 37(4): 249–254.",
  url: "https://scholarworks.uni.edu/facpub/4224",
};

const manakinStatus: Citation = {
  label:
    "Clay, R. P. (2001). Correlates of male status in the Long-tailed Manakin Chiroxiphia linearis (Aves: Pipridae). PhD thesis abstract, University of Cambridge. British Ornithologists’ Union.",
  url: "https://bou.org.uk/branta/correlates-of-male-status-in-the-long-tailed-manakin-ichiroxiphia-linearisi-aves-pipridae/",
};

const peafowl: Citation = {
  label:
    "Dakin, R., McCrossan, O., Hare, J. F., Montgomerie, R. & Amador Kane, S. (2016). Biomechanics of the peacock’s display: how feather structure and resonance influence multimodal signaling. PLoS ONE 11(4): e0152759.",
  url: "https://doi.org/10.1371/journal.pone.0152759",
};

export const exhibits: Exhibit[] = [
  {
    id: "pp-001",
    slug: "the-showman",
    number: 1,
    title: "The Showman",
    status: "draft",
    summary: "Ceremonial pelvic display with synchronized support troupe.",
    human: {
      name: "Jason Derulo",
      fictionalClassification: "Homo sapiens deruloensis",
      displayLabel: "Ceremonial pelvic display with synchronized support troupe.",
      behaviors: [
        "Rhythmic hip and pelvic movement",
        "Hand clapping",
        "High-confidence stage presence",
        "Synchronized backup dancers",
        "Selection of an audience member to join the display, where it occurs in the chosen clip",
      ],
      caption:
        "H. sapiens deruloensis — performance display; amplified audio; coordinated ensemble.",
      video: {
        kind: "placeholder",
        sourceTitle: "Performance clip under selection",
        licenseNotes:
          "Clip, rights holder, permitted use and start/end timestamps have not yet been recorded.",
      },
    },
    bird: {
      commonName: "TBD",
      behaviors: [],
      caption:
        "Species to be confirmed — documented species-specific courtship display.",
      video: {
        kind: "placeholder",
        sourceTitle: "Field footage under selection",
        licenseNotes:
          "Awaiting species selection and a permitted, creditable footage source.",
      },
      referenceUrls: [],
      candidates: [
        {
          commonName: "Long-tailed Manakin",
          scientificName: "Chiroxiphia linearis",
          rationale:
            "Males display in cooperating teams: a dominant alpha and a beta partner sing a joint song in near unison to draw females to the lek. The closest documented parallel to a support troupe.",
          reference: manakinSong,
        },
        {
          commonName: "Western Parotia",
          scientificName: "Parotia sefilata",
          rationale:
            "A bird-of-paradise that clears and maintains a court on the forest floor, spreads its flank feathers into a skirt, bows, and dances across the court with rhythmic head movements.",
          reference: westernParotia,
        },
        {
          commonName: "Greater Sage-Grouse",
          scientificName: "Centrocercus urophasianus",
          rationale:
            "Males gather on traditional leks at dawn, puff out their chests, fan starburst tails and inflate yellow air sacs, producing pops and whistles. Strong on strutting; weaker on choreography.",
          reference: sageGrouse,
        },
        {
          commonName: "Indian Peafowl",
          scientificName: "Pavo cristatus",
          rationale:
            "Males fan the train and vibrate it in a “train-rattling” display at roughly 25 Hz. Dramatic ornament, though less aligned with a synchronized ensemble.",
          reference: peafowl,
        },
      ],
    },
    hypothesis:
      "Across widely separated branches of the tree of life, elaborate choreography remains an effective way to command an audience’s attention. The researchers decline to speculate on the efficacy of individual pelvic maneuvers.",
    fieldNotes:
      "The male enters the arena with exceptional confidence. A sequence of rhythmic pelvic gestures follows, frequently accompanied by a synchronized support troupe. In some recorded performances, an audience member is invited into the display area, briefly transforming observer into participant.",
    comparisonRows: [
      {
        human: "Synchronized support dancers",
        avian: "Cooperative or nearby displaying males, if observed in the chosen species and clip",
        verified: false,
      },
      {
        human: "Rhythmic pelvic emphasis",
        avian: "Repeated species-specific body movement",
        verified: false,
      },
      {
        human: "Elevated theatrical presence",
        avian: "Display posture, feathers, or arena preparation",
        verified: false,
      },
      {
        human: "Audience engagement",
        avian: "Courtship directed toward a potential mate, when verified",
        verified: false,
      },
    ],
    narrationText:
      "Observe the showman. His territory is brightly illuminated, his movements meticulously rehearsed. A supporting ensemble echoes the central display. Across another habitat, an avian performer undertakes a choreography no less exacting. Coincidence, perhaps. Spectacle, certainly.",
    citations: [manakinSong, manakinStatus, westernParotia, sageGrouse, peafowl],
    pendingDecisions: [
      "Select the exact Jason Derulo performance clip; record rights holder, URL, permitted use and timestamps.",
      "Choose one counterpart species based on observed movement, then verify every natural-history claim.",
      "Identify a permitted, creditable bird-footage source and confirm whether the two clips can be controlled together.",
      "Approve specimen labels and comparisons only after reviewing both clips.",
    ],
    tags: ["synchronization", "strutting", "audience selection"],
  },
];

export const reservedSlots: ReservedSlot[] = [
  { number: 2, workingFormat: "Ballroom" },
  { number: 3, workingFormat: "Hip-hop" },
  { number: 4, workingFormat: "Vampire show" },
];

export function getExhibit(slug: string): Exhibit | undefined {
  return exhibits.find((e) => e.slug === slug);
}

export function catalogNumber(n: number): string {
  return `P&P-${String(n).padStart(3, "0")}`;
}

export function featuredExhibit(): Exhibit {
  return exhibits[0];
}

export function nextExhibit(current: Exhibit): Exhibit | undefined {
  const i = exhibits.findIndex((e) => e.id === current.id);
  return exhibits[i + 1];
}

export function hasMedia(e: Exhibit): boolean {
  return e.human.video.kind !== "placeholder" && e.bird.video.kind !== "placeholder";
}
