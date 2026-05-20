import type { Metadata } from "next";
import {
  Inter_Tight,
  JetBrains_Mono,
  Instrument_Serif,
  Press_Start_2P,
} from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { NavBar } from "@/components/ui/NavBar";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CinematicBackground } from "@/components/scene/CinematicBackground";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans-loaded" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-loaded" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-loaded",
  display: "swap",
});
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-loaded",
});

export const metadata: Metadata = {
  title: "Victor Fornet · Product Manager shipping consumer apps",
  description:
    "Product Manager at Rocapine ($5.6M ARR, 315K MAU). Building Vibo. HEC Paris. Relocating to San Francisco. Open to founder collabs and pre-seed product roles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable} ${pixel.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <CinematicBackground />
          <NavBar />
          <CustomCursor />
          {children}
          <ScrollProgress />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
