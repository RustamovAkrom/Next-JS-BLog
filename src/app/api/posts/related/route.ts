import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  if (!category || !slug) {
    return NextResponse.json({ error: "Category and slug are required" }, { status: 400 });
  }

  try {
    const relatedPosts = await client.fetch(
      `*[_type == "post" && references(*[_type == "category" && title == $category]._id) && slug.current != $slug]
        | order(publishedAt desc)[0...3]{
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          publishedAt
        }
        `,
      { category, slug }
    );
    if (!relatedPosts || relatedPosts.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(relatedPosts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch related posts" }, { status: 500 });
  }
}
