// src/components/CategorySelect.tsx
"use client";

import React from "react";

export default function CategorySelect({
  categories,
  value,
  onChange,
  className = "w-52",
}: {
  categories: string[]; // titles
  value?: string | undefined;
  onChange: (v?: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <select
        value={value ?? "all"}
        onChange={(e) => onChange(e.target.value === "all" ? undefined : e.target.value)}
        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 px-3 py-2 text-sm
                   text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 transition"
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
