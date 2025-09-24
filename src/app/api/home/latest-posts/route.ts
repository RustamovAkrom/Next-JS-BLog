import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0..2]{
      _id,
      title,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      publishedAt,
      excerpt
    }`);
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch latest posts" }, { status: 500 });
  }
}
