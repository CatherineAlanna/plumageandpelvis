import type { Metadata } from "next";
import Link from "next/link";
import { Big_Shoulders, Climate_Crisis, Alfa_Slab_One } from "next/font/google";
import s from "./index.module.css";

const a = Big_Shoulders({ subsets: ["latin"], weight: "900", variable: "--ix-a" });
const b = Climate_Crisis({ subsets: ["latin"], variable: "--ix-b" });
const c = Alfa_Slab_One({ subsets: ["latin"], weight: "400", variable: "--ix-c" });

export const metadata: Metadata = { title: "Three mocks" };

export default function MocksIndex() {
  return (
    <div className={`${a.variable} ${b.variable} ${c.variable} ${s.wall}`}>
      <Link href="/mocks/lek" className={`${s.door} ${s.a}`}>
        <span>Lek</span>
        <small>A</small>
      </Link>
      <Link href="/mocks/plumage" className={`${s.door} ${s.b}`}>
        <span>Plumage</span>
        <small>B</small>
      </Link>
      <Link href="/mocks/fight-night" className={`${s.door} ${s.c}`}>
        <span>Fight night</span>
        <small>C</small>
      </Link>
    </div>
  );
}
