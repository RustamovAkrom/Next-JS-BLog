// src/lib/portableTextComponents.tsx
import Image from "next/image"
import CodeBlock from "@/components/CodeBlock"
import { PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import { AlertTriangle, CheckCircle2, Info } from "lucide-react"

export const portableTextComponents: PortableTextComponents = {
  types: {
    // 🖼️ Изображения
    image: ({ value }) => {
      if (!value?.asset?._ref) return null

      const imageUrl = urlFor(value).width(1000).height(600).fit("max").url()
      if (!imageUrl) return null

      return (
        <figure className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md">
          <Image
            src={imageUrl}
            alt={value.alt || "Post image"}
            width={1000}
            height={600}
            className="object-cover w-full h-auto transition-transform duration-300 hover:scale-[1.02]"
          />
          {value.alt && (
            <figcaption className="text-center text-sm text-zinc-600 dark:text-zinc-400 py-2 bg-zinc-50 dark:bg-zinc-900">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },

    // 🔥 Код
    code: ({ value }) => (
      <CodeBlock code={value.code} filename={value.filename} />
    ),

    // 📢 Callout блоки
    callout: ({ value }) => {
      const tone =
        value.tone === "warning"
          ? "bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-600"
          : value.tone === "success"
          ? "bg-green-100 border-green-400 text-green-800 dark:bg-green-900 dark:text-green-100 dark:border-green-600"
          : "bg-blue-100 border-blue-400 text-blue-800 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-600"

      const Icon =
        value.tone === "warning"
          ? AlertTriangle
          : value.tone === "success"
          ? CheckCircle2
          : Info

      return (
        <div
          className={`my-6 flex items-start gap-3 border-l-4 rounded-md px-4 py-3 shadow-sm ${tone}`}
        >
          <Icon className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">{value.text}</div>
        </div>
      )
    },
  },

  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline decoration-dotted hover:decoration-solid transition-colors"
      >
        {children}
      </a>
    ),
  },

  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-extrabold mt-12 mb-6 leading-tight tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-5 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-4 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium mt-6 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/60 pl-5 italic my-6 text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 rounded-md py-2">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 pl-3">{children}</ul>
    ),
  },
}
