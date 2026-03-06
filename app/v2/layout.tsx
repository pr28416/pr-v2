import { firaCode } from "@/lib/fonts";
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
    <div className={`${firaCode.variable} font-mono bg-dos-black text-dos-white min-h-screen`}>
      {children}
    </div>
  );
}
