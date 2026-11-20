import type { Metadata } from "next";
import { Alfa_Slab_One, Hanken_Grotesk } from "next/font/google";
import { FightMock } from "./FightMock";

const display = Alfa_Slab_One({ subsets: ["latin"], weight: "400", variable: "--fn-display" });
const ui = Hanken_Grotesk({ subsets: ["latin"], weight: ["600", "800"], variable: "--fn-ui" });

export const metadata: Metadata = { title: "Mock C · Fight Night" };

export default function Page() {
  return (
    <div className={`${display.variable} ${ui.variable}`}>
      <FightMock />
    </div>
  );
}
