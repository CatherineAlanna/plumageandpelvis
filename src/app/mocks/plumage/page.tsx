import type { Metadata } from "next";
import { Climate_Crisis, Hanken_Grotesk } from "next/font/google";
import { PlumageMock } from "./PlumageMock";

const display = Climate_Crisis({ subsets: ["latin"], axes: ["YEAR"], variable: "--pl-display" });
const ui = Hanken_Grotesk({ subsets: ["latin"], weight: ["600", "800"], variable: "--pl-ui" });

export const metadata: Metadata = { title: "Mock B · Plumage" };

export default function Page() {
  return (
    <div className={`${display.variable} ${ui.variable}`}>
      <PlumageMock />
    </div>
  );
}
