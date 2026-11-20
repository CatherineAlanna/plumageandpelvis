// Short billing names and per-exhibit colour for the design mocks.
// Colours are taken from each bird's own plumage.

import { exhibits } from "@/data/exhibits";
import type { Exhibit } from "@/data/types";

export type Billing = {
  bird: string;
  human: string;
  /** Ground, accent, ink: drawn from the bird. */
  ground: string;
  accent: string;
  ink: string;
};

export const billing: Record<string, Billing> = {
  "the-chest-thruster": { bird: "Sage-Grouse", human: "Derulo", ground: "#E8A317", accent: "#FFF3D6", ink: "#1E1406" },
  "the-moonwalker": { bird: "Manakin", human: "Jackson", ground: "#E1121F", accent: "#FFD60A", ink: "#0A0A0A" },
  "the-ballerina": { bird: "Parotia", human: "Polunin", ground: "#0B0A1A", accent: "#2AF5D9", ink: "#F4F1FF" },
};

export const cast: Exhibit[] = exhibits;

const lastWord = (s: string) => s.trim().split(/\s+/).pop() ?? s;

/** Billing for an exhibit. New exhibits work without an entry above: the
 *  names come from the data (last word of species and performer) and the
 *  colours fall back to the grouse palette until someone picks their own. */
export function bill(e: Exhibit): Billing {
  return (
    billing[e.slug] ?? {
      ...billing["the-chest-thruster"],
      bird: lastWord(e.bird.species),
      human: lastWord(e.human.performer),
    }
  );
}
