// src/app/api/posts/[slug]/views/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const post = await client.fetch(
      `*[_type=="post" && slug.current==$slug][0]{_id, views}`,
      { slug },
      { useCdn: false }
    );
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = await client
      .patch(post._id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ views: updated.views });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
