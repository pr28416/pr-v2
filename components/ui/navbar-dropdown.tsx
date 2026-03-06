import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";

export default function NavbarDropdown({
  children,
  asChild,
}: {
  children: ReactNode;
  asChild?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1"
        asChild={asChild}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-dos-black border-2 border-dos-white text-dos-white min-w-[200px] p-0"
      >
        <div className="border-b border-dos-white px-2 py-1 text-dos-bright-cyan text-sm">
          ══ NAVIGATE ══
        </div>
        <DropdownMenuItem asChild className="px-2 py-1 text-dos-white hover:bg-dos-white hover:text-dos-black focus:bg-dos-white focus:text-dos-black cursor-pointer">
          <Link href="/">{">"} HOME</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="px-2 py-1 text-dos-white hover:bg-dos-white hover:text-dos-black focus:bg-dos-white focus:text-dos-black cursor-pointer">
          <Link href="/work">{">"} WORK</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="px-2 py-1 text-dos-white hover:bg-dos-white hover:text-dos-black focus:bg-dos-white focus:text-dos-black cursor-pointer">
          <Link href="/projects">{">"} PROJECTS</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="px-2 py-1 text-dos-white hover:bg-dos-white hover:text-dos-black focus:bg-dos-white focus:text-dos-black cursor-pointer">
          <Link href="/PR_Resume.pdf">{">"} RESUME</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
