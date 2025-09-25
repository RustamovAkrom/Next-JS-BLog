"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { aboutData } from "@/config/about";
import { motion, Variants, LazyMotion, domAnimation } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="container max-w-5xl mx-auto px-4 py-16 space-y-20">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-indigo-500">This Blog</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Добро пожаловать в мой блог — здесь я делюсь статьями о технологиях,
            программировании и опыте разработки.
          </p>
        </motion.section>

        <section>
          <h2 className="text-2xl font-semibold mb-10 text-center">О проекте</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {aboutData.project.map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl border border-indigo-200/30 dark:border-indigo-500/20 
                           bg-white/60 dark:bg-neutral-900/60 shadow-md backdrop-blur-sm
                           transition-all duration-300 hover:shadow-lg hover:border-indigo-400/50"
              >
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-10 text-center">Как поддержать</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {aboutData.support.map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-2xl border border-indigo-200/30 dark:border-indigo-500/20 
                         bg-white/60 dark:bg-neutral-900/60 shadow-md backdrop-blur-sm
                         transition-all duration-300 hover:shadow-lg hover:border-indigo-400/50"
              >
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.desc}</p>
                <Button
                  asChild
                  className={`rounded-full ${
                    item.variant === "primary"
                      ? "bg-transparent border border-indigo-400/40 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                      : "border-indigo-400/40 text-indigo-500 hover:bg-indigo-500 hover:text-white"
                  } transition-all duration-300 shadow-sm`}
                >
                  <Link href={item.href} target="_blank">
                    {item.label}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-10 text-center">Обо мне</h2>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 relative rounded-full overflow-hidden border-4 border-indigo-500/40 shadow-lg">
              <Image
                src={aboutData.image}
                alt={aboutData.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 12rem"
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

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                {aboutData.socials.map((social) => (
                  <Link key={social.label} href={social.href} target="_blank">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 rounded-full border-indigo-400/40 text-indigo-500 
                                 hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <social.icon className="w-4 h-4" />
                      {social.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </LazyMotion>
  );
}
