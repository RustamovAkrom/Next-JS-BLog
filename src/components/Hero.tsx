// src/components/Hero.tsx
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section
      className="relative w-full rounded-2xl border mb-12 px-6 py-16 md:px-12
                 border-neutral-200 dark:border-neutral-800
                 transition-colors"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight 
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-blue-400 to-purple-400"
        >
          {siteConfig.title}
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
          {siteConfig.description}
        </p>
        <Link
          href="/posts"
          className="inline-block px-8 py-3 rounded-xl font-semibold
                     bg-gradient-to-r from-blue-600 to-purple-600 text-white
                     hover:from-blue-500 hover:to-purple-500
                     shadow-md shadow-blue-500/20 hover:shadow-purple-500/30
                     transition-all"
        >
          Читать статьи
        </Link>
      </div>
    </section>
  );
}
