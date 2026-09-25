import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { CommandPalette } from "@/components/ui/command-palette";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { buildStructuredData } from "@/lib/structured-data";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        // Browser extensions (Grammarly, password managers, etc.) inject
        // attributes such as `data-gr-ext-installed` onto <body> before React
        // hydrates, which React reports as a hydration mismatch. The server and
        // client markup we control are identical, so suppress the warning for
        // this one element only.
        suppressHydrationWarning
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <script
          type="application/ld+json"
          // JSON-LD is inert data, not executable script — safe to inline.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c"),
          }}
        />
        <ScrollProgress />
        <CursorGlow />
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
