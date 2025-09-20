import Link from "next/link"

export default function PostCategories({
  categories,
}: {
  categories?: { title: string; slug?: string }[]
}) {
  if (!categories?.length) return null

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/?category=${cat.slug}`}
          className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
        >
          {cat.title}
        </Link>
      ))}
    </div>
  )
}
