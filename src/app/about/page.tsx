"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { aboutData } from "@/config/about"


export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Заголовок */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          About <span className="text-indigo-500">{aboutData.name}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hi, I&apos;m {aboutData.name} — {aboutData.role}.
        </p>
      </section>

      {/* Фото + описание */}
      <section className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 relative rounded-full overflow-hidden shadow-lg">
          <Image
            src={aboutData.image}
            alt={aboutData.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4 text-center sm:text-left">
          {aboutData.description.map((line, i) => (
            <p
              key={i}
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {line}
            </p>
          ))}

          {/* Ссылки на соцсети */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
            {aboutData.socials.map((social) => (
              <Link key={social.label} href={social.href} target="_blank">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-xl"
                >
                  <social.icon className="w-4 h-4" />
                  {social.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
