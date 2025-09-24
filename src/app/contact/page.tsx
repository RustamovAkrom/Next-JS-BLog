"use client"

import { motion, Variants } from "framer-motion"
import { FaTelegramPlane, FaGithub, FaEnvelope } from "react-icons/fa"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function ContactPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16 flex flex-col items-center text-center space-y-16">
      {/* Заголовок */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="space-y-4"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Get in <span className="text-indigo-500">Touch</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          I&apos;m always open to collaboration, discussions, or just a friendly chat.  
          The fastest way to reach me is through Telegram, but you can also use other ways below.
        </p>
      </motion.div>

      {/* Карточки контактов */}
      <div className="grid sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Telegram */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 
                     rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4 
                     hover:shadow-2xl transition duration-300"
        >
          <FaTelegramPlane className="w-12 h-12 text-indigo-500 animate-bounce" />
          <h2 className="text-xl font-semibold">Telegram</h2>
          <p className="text-gray-500">@Akrom_Rustamov</p>
          <Button asChild className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
            <Link href="https://t.me/Akrom_Rustamov" target="_blank">
              Open Telegram
            </Link>
          </Button>
        </motion.div>

        {/* GitHub */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 
                     rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4 
                     hover:shadow-2xl transition duration-300"
        >
          <FaGithub className="w-12 h-12 text-indigo-500 animate-pulse" />
          <h2 className="text-xl font-semibold">GitHub</h2>
          <p className="text-gray-500">Follow my projects</p>
          <Button asChild className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
            <Link href="https://github.com/RustamovAkrom" target="_blank">
              Visit GitHub
            </Link>
          </Button>
        </motion.div>

        {/* Email */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 
                     rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4 
                     hover:shadow-2xl transition duration-300"
        >
          <FaEnvelope className="w-12 h-12 text-indigo-500" />
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-gray-500">akromjonrustamov56@gmail.com</p>
          <Button asChild className="rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
            <a href="mailto:akromjonrustamov56@gmail.com">Send Email</a>
          </Button>
        </motion.div>

{/* Feedback */}
<motion.div
  variants={cardVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  whileHover={{ y: -5, scale: 1.02 }}
  className="bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 
             rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4 
             hover:shadow-2xl transition duration-300"
>
  <h2 className="text-xl font-semibold">💬 Feedback</h2>
  <p className="text-gray-500">Have an idea or found a bug? Let me know!</p>
  <Button
    variant="outline"
    disabled
    className="rounded-full border-indigo-400/40 text-indigo-400/50 cursor-not-allowed opacity-60"
  >
    Coming soon
  </Button>
</motion.div>

      </div>
    </div>
  )
}
