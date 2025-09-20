"use client"

import { useState } from "react"

export default function CodeBlock({
  code,
  filename,
}: {
  code: string
  filename?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="my-6 border border-zinc-300 dark:border-zinc-800 rounded-md overflow-hidden shadow-sm">
      {filename && (
        <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3 py-1 text-xs font-mono flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <span>{filename}</span>
          <button
            onClick={handleCopy}
            className="px-2 py-0.5 rounded bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition text-xs"
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>
        </div>
      )}
      <pre className="bg-zinc-50 dark:bg-zinc-800 text-sm p-4 overflow-x-auto font-mono text-zinc-800 dark:text-zinc-100">
        <code>{code}</code>
      </pre>
    </div>

  )
}
