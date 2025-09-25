import { FileText, FolderTree, Eye } from "lucide-react";

type HomeStatsProps = {
  posts: number;
  categories: number;
  views: number;
};

const stats = [
  { label: "Статей", icon: FileText },
  { label: "Категорий", icon: FolderTree },
  { label: "Просмотров", icon: Eye },
];

export default function HomeStats({ posts, categories, views }: HomeStatsProps) {
  const values = [posts, categories, views];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map(({ label, icon: Icon }, i) => (
        <div
          key={label}
          className="group p-6 rounded-xl border border-border/40 bg-card/60 
                     shadow-md hover:shadow-lg transition-all duration-300
                     hover:-translate-y-1"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold">{values[i]}</span>
          </div>
          <div className="text-sm text-muted-foreground text-center">{label}</div>
        </div>
      ))}
    </section>
  );
}
