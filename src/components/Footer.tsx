// src/components/Footer.tsx
import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/40 dark:border-gray-800/40 mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>

        {/* Навигация */}
        <div className="flex gap-4">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Социальные ссылки */}
        <div className="flex gap-4 mt-2 sm:mt-0">
          {siteConfig.social.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
