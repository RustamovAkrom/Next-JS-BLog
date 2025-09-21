import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        "mainImage": mainImage.asset->url,
        "author": author->{name, "image": image.asset->url},
        publishedAt,
        categories[]->{title, "slug": slug.current}
      }`,
      { slug }
    );

    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json(post);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}
