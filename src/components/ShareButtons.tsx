"use client";

import { Button } from "@/components/ui/button";

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  // Берём базовый URL из env или из браузера
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const url = `${baseUrl}/post/${slug}`;

  return (
    <div className="flex gap-3 mt-10">
      <Button variant="outline" asChild>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
            title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </Button>
    </div>
  );
}
