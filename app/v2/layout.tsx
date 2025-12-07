import { instrumentSerif, inter } from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pranav Ramesh | v2",
  description: "Creating the future.",
};

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${instrumentSerif.variable} ${inter.variable} font-serif bg-retro-bg text-retro-text min-h-screen selection:bg-retro-accent selection:text-white`}>
      {children}
    </div>
  );
}
