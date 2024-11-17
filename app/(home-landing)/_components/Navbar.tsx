"use client";
import { Button } from "@/components/ui/button";
import { headerRoutes } from "@/lib/data";
import { ZapIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  const scrollIntoView = (ele: string) => {
    let element = document.getElementById(ele.substring(1));

    if (!element) return;
    element!.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center max-w-screen-xl mx-auto w-full text-primary py-10 sticky top-0 backdrop-blur-sm">
      <Link className="flex items-center justify-center" href="#">
        <ZapIcon className="h-8 w-8" />
        <span className="ml-2 text-white">Flow Scrape</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {headerRoutes.map((route) =>
          route?.button ? (
            <Button key={route.href} className="hover:bg-white group">
              <Link
                className="text-sm font-medium text-white group-hover:text-primary"
                href={route.href}
              >
                {route.title}
              </Link>
            </Button>
          ) : (
            <span
              className="text-sm font-medium hover:text-white cursor-pointer select-none"
              key={route.href}
              onClick={() => {
                scrollIntoView(route.href);
              }}
            >
              {route.title}
            </span>
          )
        )}
      </nav>
    </header>
  );
}

export default Navbar;
