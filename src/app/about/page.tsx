"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { aboutData } from "@/config/about"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About <span className="text-indigo-500">This Blog</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Добро пожаловать в мой блог — здесь я делюсь статьями о технологиях, программировании и опыте разработки.
        </p>
      </section>

      {/* О проекте */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">О проекте</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2">🎯 Цель</h3>
            <p className="text-muted-foreground">
              Создать пространство, где каждый сможет найти полезные статьи о веб-разработке, современных технологиях и практических решениях.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2">📚 Темы</h3>
            <p className="text-muted-foreground">
              Backend (Python, Django, DRF), Fullstack (React, Next.js), базы данных, лучшие практики и мои личные заметки.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Поддержка */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Как поддержать</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2">⭐ GitHub</h3>
            <p className="text-muted-foreground mb-4">
              Поставь звезду на репозитории или подпишись — это мотивирует меня делиться ещё большим количеством проектов.
            </p>
            <Button asChild>
              <Link href="https://github.com/RustamovAkrom" target="_blank">
                Мой GitHub
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl border bg-white dark:bg-neutral-900 shadow-sm"
          >
            <h3 className="font-bold text-lg mb-2">☕ Поддержка</h3>
            <p className="text-muted-foreground mb-4">
              Если тебе нравятся статьи, можешь поддержать проект — это поможет мне развивать блог.
            </p>
            <Button variant="outline" asChild>
              <Link href="https://buymeacoffee.com/akromjonru1" target="_blank">
                Buy me a coffee
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Обо мне */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Обо мне</h2>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 relative rounded-full overflow-hidden border">
            <Image
              src={aboutData.image}
              alt={aboutData.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <p className="text-lg font-semibold">
              {aboutData.name} — {aboutData.role}
            </p>
            {aboutData.description.map((line, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {line}
              </p>
            ))}

            {/* Соцсети */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
              {aboutData.socials.map((social) => (
                <Link key={social.label} href={social.href} target="_blank">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-xl"
                  >
                    <social.icon className="w-4 h-4 text-indigo-500" />
                    {social.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
