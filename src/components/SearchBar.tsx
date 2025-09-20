// src/components/SearchBar.tsx
"use client";

import React from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search posts...",
  className = "w-full max-w-sm",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="sr-only">Search</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60
                   px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none
                   focus:ring-2 focus:ring-indigo-400 transition"
        aria-label="Search posts"
      />
    </div>
  );
}
