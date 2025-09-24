"use client"

import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/react"
import { portableTextComponents } from "@/lib/portableTextComponents"

export default function PostContent({ body }: { body: PortableTextBlock[] }) {
  return (
    <article className="prose dark:prose-invert max-w-none leading-relaxed">
      <PortableText value={body} components={portableTextComponents} />
    </article>
  )
}
