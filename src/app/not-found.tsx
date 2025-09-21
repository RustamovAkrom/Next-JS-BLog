// src/app/not-found.tsx
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Oops! Page not found
      </p>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
      <div className="mt-10">
        <svg
          className="w-64 h-64 md:w-80 md:h-80"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
      </div>
    </div>
  )
}
