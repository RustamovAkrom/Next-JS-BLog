// src/components/LoadMoreButton.tsx
"use client";

import React from "react";

export default function LoadMoreButton({
  onClick,
  disabled,
  children = "Load more",
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled}
        className="rounded-md px-5 py-2 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:opacity-60 transition"
      >
        {children}
      </button>
    </div>
  );
}
