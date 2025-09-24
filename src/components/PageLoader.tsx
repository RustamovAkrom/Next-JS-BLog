"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site"; // можно использовать логотип или имя сайта

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground transition-colors">
        {/* Можно вставить логотип */}
        <div className="mb-4 text-2xl font-bold">{siteConfig.name}</div>
        
        {/* Спиннер */}
        <div className="w-16 h-16 border-4 border-primary/40 border-t-primary rounded-full animate-spin"></div>
        
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
