import type { Metadata } from "next";
import "./mocks.css";

export const metadata: Metadata = {
  title: "Design mocks",
  robots: { index: false, follow: false },
};

export default function MocksLayout({ children }: { children: React.ReactNode }) {
  return <main id="main">{children}</main>;
}
