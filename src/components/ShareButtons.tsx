import { Button } from "@/components/ui/button"

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = `https://your-site.com/post/${slug}`
  return (
    <div className="flex gap-3 mt-10">
      <Button variant="outline" asChild>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
        >
          Telegram
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank">
          Twitter
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank">
          LinkedIn
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href={`https://api.whatsapp.com/send?text=${title} ${url}`} target="_blank">
          WhatsApp
        </a>
      </Button>
    </div>
  )
}
