// src/components/NavLinks.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkItem = {
  label: string;
  href: string;
};

export function NavLinks({
  links,
  className = "",
  itemClassName = "",
}: {
  links: NavLinkItem[];
  className?: string;
  itemClassName?: string;
}) {
  const pathname = usePathname();
  return (
    <div className={className}>
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`${itemClassName} inline-flex items-center rounded-md px-3 py-2 text-sm transition 
            ${active ? "text-primary bg-accent/10" : "text-muted-foreground hover:text-primary"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}

export default NavLinks;
