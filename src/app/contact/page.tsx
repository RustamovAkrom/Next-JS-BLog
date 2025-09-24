"use client"

import { FaTelegramPlane } from "react-icons/fa"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-16 flex flex-col items-center text-center space-y-8">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold tracking-tight">
        Get in <span className="text-indigo-500">Touch</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-lg">
        I&apos;m always open to collaboration, discussions, or just a friendly chat.  
        The fastest way to reach me is through Telegram.
      </p>

      {/* Контакт-карта */}
      <div className="bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-8 w-full sm:w-[400px] flex flex-col items-center space-y-4 hover:shadow-2xl transition duration-300">
        <FaTelegramPlane className="w-12 h-12 text-indigo-500 animate-bounce" />
        <h2 className="text-xl font-semibold">Chat with me on Telegram</h2>
        <p className="text-gray-500">@Akrom_Rustamov</p>
        <Link
          href="https://t.me/Akrom_Rustamov"
          target="_blank"
          className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition"
        >
          Open Telegram
        </Link>
      </div>
    </div>
  )
}
