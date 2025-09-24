import { Github, Coffee } from "lucide-react"

export const aboutData = {
  name: "Akrom Rustamov",
  role: "Fullstack Developer",
  image: "/images/about.jpg",
  description: [
    "Я увлекаюсь веб-разработкой и делюсь своим опытом в этом блоге.",
    "Моя цель — сделать сложные темы простыми и доступными для всех.",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/RustamovAkrom",
      icon: Github,
    },
    {
      label: "Buy me a coffee",
      href: "https://buymeacoffee.com/akromjonru1",
      icon: Coffee,
    },
  ],
  project: [
    {
      title: "🎯 Цель",
      desc: "Создать пространство, где каждый сможет найти полезные статьи о веб-разработке, современных технологиях и практических решениях.",
    },
    {
      title: "📚 Темы",
      desc: "Backend (Python, Django, DRF), Fullstack (React, Next.js), базы данных, лучшие практики и мои личные заметки.",
    },
  ],
  support: [
    {
      title: "⭐ GitHub",
      desc: "Поставь звезду на репозитории или подпишись — это мотивирует меня делиться ещё большим количеством проектов.",
      href: "https://github.com/RustamovAkrom",
      label: "Мой GitHub",
      variant: "primary",
    },
    {
      title: "☕ Поддержка",
      desc: "Если тебе нравятся статьи, можешь поддержать проект — это поможет мне развивать блог.",
      href: "https://buymeacoffee.com/akromjonru1",
      label: "Buy me a coffee",
      variant: "outline",
    },
  ],
}
