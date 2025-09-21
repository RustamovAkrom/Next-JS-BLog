import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const query = `*[_type == "category"]{title}`;
    const categories = await client.fetch(query);
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
