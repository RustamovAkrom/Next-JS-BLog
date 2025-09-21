// components/CodeBlockServer.tsx
import shiki from "shiki"

interface CodeBlockProps {
  code: string
  filename?: string
  language?: string
}

export default async function CodeBlockServer({
  code,
  filename,
  language = "javascript",
}: CodeBlockProps) {
  const highlighter = await shiki.getHighlighter({ theme: "github-dark" })
  const highlighted = highlighter.codeToHtml(code, { lang: language })

  return (
    <div className="my-6 border border-zinc-300 dark:border-zinc-800 rounded-lg overflow-hidden shadow-lg">
      {filename && (
        <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-3 py-1 text-xs font-mono border-b border-zinc-200 dark:border-zinc-800">
          {filename}
        </div>
      )}
      <div
        className="p-4 overflow-x-auto text-sm font-mono prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  )
}
