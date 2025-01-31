import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "@/lib/sessionContext";

const fontFamily = Figtree({ subsets: ["latin"] });

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
      <SessionProvider>
        <body className={fontFamily.className}>
          <Analytics />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
