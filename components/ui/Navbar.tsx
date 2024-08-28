import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { RxSlash } from "react-icons/rx";
import NavbarDropdown from "./navbar-dropdown";
import { Button } from "./button";
import { Menu } from "lucide-react";

export default function Navbar({ page }: { page: string }) {
  const animation = "transition ease-in-out hover:scale-110";
  return (
    <>
      <div className="hidden md:flex">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className={animation}>
              <BreadcrumbLink
                href="/"
                className="text-slate-600 hover:text-slate-400 dark:text-slate-200"
              >
                pr
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600 dark:text-slate-300 text-lg">
              <RxSlash />
            </BreadcrumbSeparator>
            <BreadcrumbItem className={animation}>
              <NavbarDropdown>
                <div>
                  <BreadcrumbEllipsis className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                  <span className="sr-only">Toggle menu</span>
                </div>
              </NavbarDropdown>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-slate-600 dark:text-slate-300 text-lg">
              <RxSlash />
            </BreadcrumbSeparator>
            <BreadcrumbItem className={animation}>
              <BreadcrumbLink
                href={`/${page}`}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-400"
              >
                {page}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NavbarDropdown>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="flex md:hidden hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <Menu className="text-slate-700 dark:text-slate-300" />
        </Button>
      </NavbarDropdown>
    </>
  );
}
