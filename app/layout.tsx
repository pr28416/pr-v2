import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import ClientLayout from "./client-layout";
import { instrumentSerif, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Pranav Ramesh",
  description:
    "Avid builder & entrepreneur. Prev. Growth Eng @ Ramp. Building AI for engineers.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <GoogleAnalytics gaId="G-FVRFW9M3LZ" />
      <GoogleTagManager gtmId="GTM-PDJTJ6XV" />
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
