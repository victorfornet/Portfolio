import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans-loaded" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-loaded" });
const pixel = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel-loaded" });

export const metadata: Metadata = {
  title: "Victor Fornet — I build consumer apps from idea to growth",
  description:
    "Product & Growth at Rocapine. Building Vibo. HEC Paris gap year. Open to founder collabs and pre-seed product roles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
