import type { Citation, Exhibit, ExhibitStatus, MatchStrength } from "./types";

const disclaimer =
  "The human performance is a work of art and entertainment. No claim is made that it serves, or was intended to serve, any reproductive purpose. Bird facts are sourced below; everything else is editorial.";

const sageGrouseOverview: Citation = {
  label: "Greater Sage-Grouse overview. All About Birds, Cornell Lab of Ornithology.",
  url: "https://www.allaboutbirds.org/guide/Greater_Sage-Grouse/overview",
};
const dancersOfSpring: Citation = {
  label: "“Dancers of Spring: Displaying Grouse Are a Must-See Spectacle.” All About Birds, Cornell Lab of Ornithology.",
  url: "https://www.allaboutbirds.org/news/dancers-of-spring-displaying-grouse-are-a-must-see-spectacle/",
};
const natGeoManakin: Citation = {
  label: "“‘Moonwalking’ Birds and Other Crazy Courtship Rituals.” National Geographic.",
  url: "https://www.nationalgeographic.com/animals/article/animals-birds-courtship-mating",
};
const stilesSkutch: Citation = {
  label:
    "Stiles, F. G. & Skutch, A. F. (1989). A Guide to the Birds of Costa Rica. Cornell University Press. (Plumage and display description, as quoted by Improbable Research.)",
  url: "https://improbable.com/2006/09/25/an-all-natural-michael-jackson/",
};
const cornellManakinChapter: Citation = {
  label: "“Chapter 11: How it Evolved: the Red-capped Manakin.” Kimberly Bostwick / Cornell Lab of Ornithology, Vimeo.",
  url: "https://vimeo.com/40657519",
};
const parotiaBallerina: Citation = {
  label: "“Parotia: Ballerina Dance.” Bird Academy, Cornell Lab of Ornithology.",
  url: "https://academy.allaboutbirds.org/parotia-ballerina-dance/",
};
const parotiaSkirt: Citation = {
  label: "“Bird-of-Paradise Spreads His Feather Skirt and Dances.” Bird Academy, Cornell Lab of Ornithology.",
  url: "https://academy.allaboutbirds.org/bird-of-paradise-spreads-his-feather-skirt-and-dances/",
};

export const exhibits: Exhibit[] = [
  {
    id: "pp-001",
    slug: "the-chest-thruster",
    number: 1,
    title: "The Chest-Thruster",
    movementType: "Thoracic display",
    status: "candidate",
    matchStrength: "unassessed",
    description:
      "A highly visible display involving repeated thoracic emphasis and the apparent conviction that discretion is evolutionarily disadvantageous.",
    scientificClaimDisclaimer: disclaimer,
    bird: {
      species: "Greater Sage-Grouse",
      scientificName: "Centrocercus urophasianus",
      video: {
        provider: "youtube",
        videoId: "AZSttPGQM1E",
        sourceUrl: "https://www.youtube.com/watch?v=AZSttPGQM1E",
        sourceTitle: "The Male Display",
        creator: "Cornell Lab of Ornithology",
        startSeconds: null,
        endSeconds: null,
      },
      naturalHistory:
        "Each spring, male Greater Sage-Grouse gather on leks: traditional open display grounds in the sagebrush where males perform for visiting females. Activity peaks from March to May, especially in the hours just before sunrise. A displaying male puffs out his chest, holds his spiky tail fanned upright, and struts forward a step or two while golden, balloon-like air sacs on his neck inflate and deflate at high speed. The display begins with the male filling a pouch in his esophagus with air; releasing it produces pops, whistles and a burbling sound that carries a long way across open country. The sound is loudest to the side, which is why males often stand beside a female rather than in front of her. Many males display, but most females choose one or two of them.",
      facts: [
        "Males display communally on leks at dawn, March to May",
        "Chest puffed, tail fanned upright, short strutting steps",
        "Golden neck air sacs inflate and deflate rapidly, producing pops",
        "Most females choose among only one or two males",
      ],
      citations: [sageGrouseOverview, dancersOfSpring],
    },
    human: {
      performer: "Jason Derulo",
      work: "Take You Dancing (Official Dance Video)",
      video: {
        provider: "youtube",
        videoId: "vC8qJfVYxZY",
        sourceUrl: "https://www.youtube.com/watch?v=vC8qJfVYxZY",
        sourceTitle: "Jason Derulo - Take You Dancing [Official Dance Video]",
        creator: "Jason Derulo (official channel)",
        startSeconds: null,
        endSeconds: null,
      },
      alternatives: [
        { label: "Take You Dancing – GMA Live", url: "https://www.youtube.com/watch?v=bfWFF9oM3OQ" },
      ],
    },
    observation: [
      "In the avian clip, watch the moment the neck air sacs swell and the tail fans upright. The whole bird becomes, briefly, a chest.",
      "In the human clip, look for choreography that centres the torso and chest, delivered with total commitment.",
      "Compare conviction, not anatomy. The grouse’s air sacs are a vocal apparatus and should not be mistaken for any other kind of thrust.",
    ],
    ledger: [
      {
        dimension: "Visible display",
        avian: "Chest puffed and air sacs inflated to many times their resting size",
        human: "Torso and chest emphasis in the choreography",
      },
      {
        dimension: "Rhythmic repetition",
        avian: "Strut and air-sac pops repeated in sequence",
        human: "Repeated high-energy movement",
      },
      {
        dimension: "Use of stage or territory",
        avian: "Traditional lek shared with rival males",
        human: "Purpose-built set for a dance video",
      },
      {
        dimension: "Audience orientation",
        avian: "Positions beside the female, where the sound is loudest",
        human: "Performs to camera",
      },
    ],
    reviewNotes:
      "Watch both videos in full. Find an unbroken 10–25 second segment of inflation and popping, and a matching 10–25 second sequence of chest-centred choreography. Record timestamps only after watching. If the movement is not uncannily comparable, change the human clip rather than stretching the science.",
  },
  {
    id: "pp-002",
    slug: "the-moonwalker",
    number: 2,
    title: "The Moonwalker",
    movementType: "Backward glide",
    status: "candidate",
    matchStrength: "unassessed",
    description:
      "Independent observations indicate that the backward glide was not, in fact, invented by the entertainment industry.",
    scientificClaimDisclaimer: disclaimer,
    bird: {
      species: "Red-capped Manakin",
      scientificName: "Ceratopipra mentalis",
      video: {
        provider: "vimeo",
        videoId: "40657519",
        sourceUrl: "https://vimeo.com/40657519",
        sourceTitle: "Chapter 11: How it Evolved: the Red-capped Manakin",
        creator: "Kimberly Bostwick / Cornell Lab of Ornithology",
        startSeconds: null,
        endSeconds: null,
        rightsNote:
          "An explanatory research chapter; may not contain an isolated, uninterrupted courtship shot.",
      },
      naturalHistory:
        "The Red-capped Manakin is a small bird of humid lowland forest and second growth, found from southern Mexico through Central America to north-western South America. The adult male is velvety black, with a bright red head and nape, bright yellow thighs and a pale yellow chin. Males gather at leks to show off their footwork to visiting females. The best-known element of the display is a rapid backward slide, performed with the legs stretched and the yellow thighs exposed, which observers have compared to the moonwalk. National Geographic notes that the dance is accompanied by snapping, flapping and buzzing. Cornell Lab researchers have studied the species alongside the related Club-winged Manakin to trace how the Club-winged Manakin’s unusual wing-song evolved.",
      facts: [
        "Males display at leks",
        "Rapid backward slide with yellow thighs exposed",
        "Accompanied by snapping, flapping and buzzing",
        "Black body, red head and nape, yellow thighs",
      ],
      citations: [stilesSkutch, natGeoManakin, cornellManakinChapter],
    },
    human: {
      performer: "Michael Jackson",
      work: "Billie Jean, Motown 25 (1983)",
      video: {
        provider: "youtube",
        videoId: "LXJcOduo0w4",
        sourceUrl: "https://classic.motown.com/video/michael-jackson-performs-at-motown-25/",
        sourceTitle: "Michael Jackson Performs At Motown 25",
        creator: "Classic Motown",
        startSeconds: null,
        endSeconds: null,
        rightsNote: "Player embedded by Classic Motown on its official performance page.",
      },
    },
    observation: [
      "In the avian clip, look for the backward slide: the bird travels in reverse while appearing not to walk at all.",
      "In the human clip, find the moonwalk itself, a dance technique of considerable fame and no documented biological function.",
      "Note the shared commitment to a narrow performance surface and the importance of footwear, or in the bird’s case, thighs.",
    ],
    ledger: [
      {
        dimension: "Visible display",
        avian: "Backward slide with bright yellow thighs exposed",
        human: "The moonwalk",
      },
      {
        dimension: "Rhythmic repetition",
        avian: "Display accompanied by snapping and buzzing",
        human: "Performance to a strongly rhythmic track",
      },
      {
        dimension: "Use of stage or territory",
        avian: "Lek, where several males gather to display",
        human: "Television stage, Motown 25 anniversary special",
      },
      {
        dimension: "Audience orientation",
        avian: "Footwork shown off to visiting females",
        human: "Live audience and broadcast",
      },
    ],
    reviewNotes:
      "Confirm the bird source shows an identifiable smooth glide; prefer an official Cornell or authorised standalone video if this chapter only shows it briefly. Find the moonwalk moment in the Motown 25 performance and record its timestamp. The YouTube candidate d17ggav1Lto was unavailable on 24 Oct 2026, so the official Classic Motown player is used instead.",
  },
  {
    id: "pp-003",
    slug: "the-ballerina",
    number: 3,
    title: "The Ballerina",
    movementType: "Prepared stage",
    status: "candidate",
    matchStrength: "conceptual",
    description:
      "One dancer painstakingly arranges his plumage before performing for a discerning observer. The other works in a studio and has the benefit of a cinematographer.",
    scientificClaimDisclaimer: disclaimer,
    bird: {
      species: "Western Parotia",
      scientificName: "Parotia sefilata",
      video: {
        provider: "youtube",
        videoId: "kI0K5j3qm2g",
        sourceUrl: "https://www.youtube.com/watch?v=kI0K5j3qm2g",
        sourceTitle: "Dancing Like a Ballerina: Western Parotia",
        creator: "Cornell Lab of Ornithology",
        startSeconds: null,
        endSeconds: null,
      },
      naturalHistory:
        "The Western Parotia is a bird-of-paradise found only in New Guinea. The male clears and maintains a court on the forest floor and performs there. He begins with a bow, standing frozen “like a plank,” then rises and spreads his flank feathers into a skirt-like shape around his body. He stutter-steps around the court, shaking his head rhythmically and later swinging it from side to side, in what researchers call the “ballerina dance.” The name describes how the display looks to us, from the side. A female watches from a perch above, and from her angle the skirt becomes a disc around the body, the legs disappear, and the male looks like a wobbling black ovoid. Between performances he preens and tidies the court.",
      facts: [
        "Found only in New Guinea",
        "Clears and maintains a court on the forest floor",
        "Bows, spreads a flank-feather skirt, and stutter-steps",
        "Display is judged by females watching from above",
      ],
      citations: [parotiaBallerina, parotiaSkirt],
    },
    human: {
      performer: "Sergei Polunin",
      work: "Take Me to Church (Hozier), directed by David LaChapelle",
      video: {
        provider: "external",
        sourceUrl: "https://vimeo.com/119999698",
        sourceTitle: "Sergei Polunin, Take Me to Church by Hozier, directed by David LaChapelle",
        creator: "David LaChapelle (director); Jade Hale-Christofi (choreography)",
        startSeconds: null,
        endSeconds: null,
        rightsNote:
          "The only located copy is a third-party upload, so it is linked rather than embedded until an official source is found.",
      },
      alternatives: [
        {
          label: "The Guardian on the film",
          url: "https://www.theguardian.com/stage/dance-blog/2015/feb/12/sergei-polunin-hozier-take-me-to-church-david-lachapelle",
        },
      ],
    },
    observation: [
      "In the avian clip, watch the bow, the unfurling of the skirt, and the stutter-step across a court the bird has swept himself.",
      "In the human clip, observe an elaborate, highly rehearsed-looking solo in a carefully prepared space.",
      "This is a conceptual pairing. The resemblance is one of effort and staging rather than of specific movement.",
    ],
    ledger: [
      {
        dimension: "Visible display",
        avian: "Flank feathers raised into a skirt; rhythmic head movement",
        human: "Elaborate physical display rooted in ballet technique",
      },
      {
        dimension: "Rhythmic repetition",
        avian: "Stutter-steps around the court",
        human: "Highly rehearsed-looking sequences",
      },
      {
        dimension: "Use of stage or territory",
        avian: "Court cleared and maintained by the male himself",
        human: "A prepared performance space, professionally lit",
      },
      {
        dimension: "Audience orientation",
        avian: "Performed for a female watching from above",
        human: "Performed for the camera",
      },
    ],
    reviewNotes:
      "Check whether Polunin’s movements genuinely resemble the parotia’s skirted stutter-step. If not, keep him as a related specimen and look for male ballet turns or voguing with closer poses. Find an official source for the film before embedding it. Never imply Polunin made this film to attract a partner.",
  },
];

export function getExhibit(slug: string): Exhibit | undefined {
  return exhibits.find((e) => e.slug === slug);
}

export function catalogNumber(n: number): string {
  return `P&P-${String(n).padStart(3, "0")}`;
}

export function exhibitNumber(n: number): string {
  return String(n).padStart(3, "0");
}

export function featuredExhibit(): Exhibit {
  return exhibits[0];
}

export function neighbours(current: Exhibit): { prev?: Exhibit; next?: Exhibit } {
  const i = exhibits.findIndex((e) => e.id === current.id);
  return { prev: exhibits[i - 1], next: exhibits[i + 1] };
}

export const statusLabel: Record<ExhibitStatus, string> = {
  candidate: "Candidate pairing · under review",
  verified: "Verified pairing",
  published: "Published",
};

export const matchLabel: Record<MatchStrength, string> = {
  unassessed: "Not yet assessed",
  conceptual: "Conceptual only",
  moderate: "Moderately similar",
  uncanny: "Visually uncanny",
};
