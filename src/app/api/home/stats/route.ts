import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    // 1️⃣ Общее количество постов
    const totalPosts = await client.fetch(`count(*[_type == "post"])`);

    // 2️⃣ Общее количество категорий
    const totalCategories = await client.fetch(`count(*[_type == "category"])`);

    // 3️⃣ Получаем все views постов и суммируем на сервере
    const postsViews: { views?: number }[] = await client.fetch(`*[_type == "post"]{views}`);
    const totalViews = postsViews.reduce((sum, post) => sum + (post.views || 0), 0);

    return NextResponse.json({ totalPosts, totalCategories, totalViews });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
