import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const posts = await client.fetch(`*[_type == "post"]{
      "slug": slug.current,
      publishedAt
    }`);
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
