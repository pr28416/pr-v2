"use client";

import React from "react";
import Link from "next/link";
import NavbarDropdown from "./navbar-dropdown";

export default function Navbar({ page }: { page: string }) {
  return (
    <nav className="flex items-center gap-4 text-dos-white text-lg">
      <div className="hidden md:flex items-center gap-0">
        <Link href="/" className="hover:text-dos-bright-white transition-colors">
          C:\PR
        </Link>
        <span>\</span>
        <Link
          href={`/${page}`}
          className="uppercase hover:text-dos-bright-white transition-colors"
        >
          {page}
        </Link>
        <span>&gt;&nbsp;</span>
        <span className="dos-cursor">_</span>
      </div>
      <div className="flex md:hidden">
        <NavbarDropdown>
          <button className="text-dos-white hover:text-dos-bright-yellow border border-dos-white px-2 py-0.5 hover:border-dos-bright-yellow transition-colors">
            [MENU]
          </button>
        </NavbarDropdown>
      </div>
    </nav>
  );
}
