import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavbarDropdown({
  children,
  asChild,
  forceDarkShadow,
}: {
  children: ReactNode;
  asChild?: boolean;
  forceDarkShadow?: boolean;
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
        className={cn(
          forceDarkShadow ? "shadow-xl" : "shadow-slate-200 dark:shadow-black"
        )}
      >
        <DropdownMenuItem asChild>
          <Link href="/">home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/work">work</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/projects">projects</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/PR_Resume.pdf">resume</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
