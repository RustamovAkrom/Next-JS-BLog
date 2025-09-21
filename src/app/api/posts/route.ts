import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const start = parseInt(searchParams.get("start") || "0");
    const limit = parseInt(searchParams.get("limit") || "6");
    const category = searchParams.get("category");

    const query = `
      *[_type == "post" ${category ? `&& "${category}" in categories[]->title` : ""}]
      | order(publishedAt desc)[${start}...${start + limit}]{
        title,
        "slug": slug.current,
        excerpt,
        publishedAt,
        "mainImage": mainImage.asset->url,
        "author": author->{name, "image": image.asset->url},
        categories[]->{title}
      }
    `;

    const posts = await client.fetch(query);
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
