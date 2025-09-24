"use client"

import { useEffect, useState } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css" // тёмная тема
import "prismjs/components/prism-jsx" // язык, если нужен

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = "javascript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="my-6 border border-zinc-300 dark:border-zinc-800 rounded-lg overflow-hidden shadow-lg relative">
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

      <pre
        className={`p-4 overflow-x-auto text-sm font-mono ${language ? `language-${language}` : ""}`}
        tabIndex={0}
      >
        <code className={language ? `language-${language}` : ""}>
          {code}
        </code>
      </pre>


    </div>
  )
}
