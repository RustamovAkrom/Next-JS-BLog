// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-gray-200/40 dark:border-gray-800/40 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="rounded-md p-1 bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <Link href="/" className="text-sm font-semibold text-gray-900 dark:text-white">
              {siteConfig.name}
            </Link>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {siteConfig.description}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex gap-4">
            {siteConfig.navLinks.slice(0, 5).map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            {siteConfig.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 dark:text-gray-300 text-sm hover:text-indigo-600 transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-6">
        © {year} <span className="font-medium">Akrom Rustamov</span>. All rights reserved.
      </div>
    </footer>
  );
}
