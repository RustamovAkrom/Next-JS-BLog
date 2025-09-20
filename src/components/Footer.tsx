// src/components/Footer.tsx
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/40 dark:border-gray-800/40 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} {process.env.NEXT_PUBLIC_SITE_NAME ?? "MySite"}</div>
        <div className="flex gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
          <Link href="/services" className="text-sm text-muted-foreground hover:text-primary">Services</Link>
        </div>
      </div>
    </footer>
  );
}
