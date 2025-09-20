import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

export default function PostAuthor({
  author,
  publishedAt,
}: {
  author?: { name?: string; image?: string }
  publishedAt?: string
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar>
        {author?.image ? (
          <AvatarImage src={author.image} alt={author.name} />
        ) : null}
        <AvatarFallback>{author?.name?.[0] ?? "A"}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{author?.name}</p>
        <p className="text-sm text-muted-foreground">
          {publishedAt ? format(new Date(publishedAt), "dd MMM yyyy") : ""}
        </p>
      </div>
    </div>
  )
}
