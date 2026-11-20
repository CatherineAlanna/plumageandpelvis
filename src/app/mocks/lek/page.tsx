import type { Metadata } from "next";
import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import { LekMock } from "./LekMock";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["800", "900"], variable: "--lek-display" });
const ui = Hanken_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--lek-ui" });

export const metadata: Metadata = { title: "Mock A · Lek" };

export default function Page() {
  return (
    <div className={`${display.variable} ${ui.variable}`}>
      <LekMock />
    </div>
  );
}
