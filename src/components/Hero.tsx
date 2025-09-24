// src/components/Hero.tsx
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative w-full rounded-2xl border p-12 mb-12
      bg-neutral-100 text-neutral-900 border-neutral-200
      dark:bg-neutral-900 dark:text-white dark:border-neutral-800
      transition-colors">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          {siteConfig.title}
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          {siteConfig.description}
        </p>
        <Link
          href="/posts"
          className="inline-block px-6 py-3 rounded-lg font-medium
            border border-neutral-300 text-neutral-900 hover:bg-neutral-200
            dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800
            transition-colors"
        >
          Читать статьи
        </Link>
      </div>
    </section>
  );
}
