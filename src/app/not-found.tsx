// src/app/not-found.tsx
import Link from "next/link";
import { ArrowLeft, ArrowUp } from "lucide-react"; // импорт стрелки из модуля

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background text-foreground">
      {/* 404 с градиентом */}
      <h1 className="text-[12rem] md:text-[15rem] font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
        404
      </h1>

      <p className="text-2xl md:text-3xl font-semibold mb-4 text-center">
        Ooops! Page not found
      </p>

      <p className="text-center text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      {/* Кнопка с импортированной стрелкой */}
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        Go back home
      </Link>

      {/* Декоративная иконка */}
      <div className="mt-12 animate-bounce">
        <ArrowUp className="w-16 h-16 text-blue-400 opacity-50" />
      </div>
    </div>
  );
}
