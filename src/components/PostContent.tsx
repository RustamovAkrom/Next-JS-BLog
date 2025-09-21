"use client"

import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/react"

import Image from "next/image"
import CodeBlock from "./CodeBlock"

export default function PostContent({ body }: { body: PortableTextBlock[]  }) {
  return (
    <article className="prose dark:prose-invert max-w-none leading-relaxed">
      <PortableText
        value={body}
        components={{
          types: {
            // 🖼️ Рендеринг изображений
            image: ({ value }) => {
              if (!value?.asset?.url) return null
              return (
                <div className="my-6">
                  <Image
                    src={value.asset.url}
                    alt={value.alt || "Post image"}
                    width={800}
                    height={500}
                    className="rounded-lg"
                  />
                  {value.alt && (
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      {value.alt}
                    </p>
                  )}
                </div>
              )
            },

            // 🔥 Рендеринг блоков кода с кнопкой Copy
            code: ({ value }) => (
              <CodeBlock code={value.code} filename={value.filename} />
            ),
            callout: ({ value }) => (
              <div
                className={`my-4 p-4 rounded-md ${value.tone === "warning"
                  ? "bg-yellow-900 text-yellow-200"
                  : value.tone === "success"
                    ? "bg-green-900 text-green-200"
                    : "bg-blue-900 text-blue-200"
                  }`}
              >
                {value.icon && <span className="mr-2">{value.icon}</span>}
                {value.text}
              </div>
            ),
          },

          marks: {
            link: ({ children, value }) => (
              <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:no-underline"
              >
                {children}
              </a>
            ),

          },

          block: {
            h1: ({ children }) => (
              <h1 className="text-4xl font-extrabold mt-10 mb-6">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-xl font-medium mt-4 mb-2">{children}</h4>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
          },

          list: {
            bullet: ({ children }) => (
              <ul className="list-disc list-inside space-y-1">{children}</ul>
            ),
          },
        }}
      />
    </article>
  )
}
