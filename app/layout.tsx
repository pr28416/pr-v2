import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import {
  Poppins,
  Kanit,
  Lora,
  Figtree,
  Urbanist,
  Inter_Tight,
  Raleway,
  Inter,
  Playfair_Display,
  Anek_Devanagari,
  Merriweather,
  Roboto_Slab,
  PT_Sans,
  Work_Sans,
  Fira_Sans,
  Fira_Code,
  Manrope,
  Mulish,
  DM_Sans,
  IBM_Plex_Mono,
  Inconsolata,
  Source_Code_Pro,
  Noto_Sans_Mono,
  JetBrains_Mono,
  Reddit_Mono,
  Martian_Mono,
  Red_Hat_Mono,
  Roboto_Mono,
  M_PLUS_Code_Latin,
  Sono,
  Fira_Mono,
  Fira_Sans_Condensed,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// const fontFamily = Poppins({ subsets: ["latin"], weight: "600" });
// const fontFamily = Kanit({ subsets: ["latin"], weight: "500" });
// const fontFamily = Lora({ subsets: ["latin"], weight: "500" });
// const fontFamily = IBM_Plex_Mono({ subsets: ["latin"], weight: "700" });
// const fontFamily = Raleway({ subsets: ["latin"] });
// const fontFamily = Inter_Tight({ subsets: ["latin"] });
// const fontFamily = Inter({ subsets: ["latin"] });
// const fontFamily = Urbanist({ subsets: ["latin"] });
// const fontFamily = Anek_Devanagari({ subsets: ["latin"] });
// const fontFamily = DM_Sans({ subsets: ["latin"] });

const fontFamily = Figtree({ subsets: ["latin"] });
// const fontFamily = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pranav Ramesh's Website",
  description: "Pranav Ramesh's Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-FVRFW9M3LZ" />
      <GoogleTagManager gtmId="GTM-PDJTJ6XV" />
      <body className={fontFamily.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
