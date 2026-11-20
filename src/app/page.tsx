import { Big_Shoulders, Hanken_Grotesk } from "next/font/google";
import { Lek } from "@/components/lek/Lek";
import "./mocks/mocks.css";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["800", "900"], variable: "--lek-display" });
const ui = Hanken_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--lek-ui" });

// The homepage is the lek: two dancers, one button.
export default function HomePage() {
  return (
    <main id="main" className={`${display.variable} ${ui.variable}`}>
      <Lek />
    </main>
  );
}
