type HomeStatsProps = { posts: number; categories: number; views: number };

export default function HomeStats({ posts, categories, views }: HomeStatsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow transition-colors">
        <div className="text-2xl font-bold">{posts}</div>
        <div className="text-sm text-muted-foreground mt-1">Статей</div>
      </div>
      <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow transition-colors">
        <div className="text-2xl font-bold">{categories}</div>
        <div className="text-sm text-muted-foreground mt-1">Категорий</div>
      </div>
      <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow transition-colors">
        <div className="text-2xl font-bold">{views}</div>
        <div className="text-sm text-muted-foreground mt-1">Просмотров</div>
      </div>
    </section>
  );
}
