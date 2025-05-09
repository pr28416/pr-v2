import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import ClientLayout from "./client-layout";

const fontFamily = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pranav Ramesh",
  description:
    "Avid builder & entrepreneur. Prev. Growth Eng @ Ramp. Building AI for engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-FVRFW9M3LZ" />
      <GoogleTagManager gtmId="GTM-PDJTJ6XV" />
      <body className={fontFamily.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
