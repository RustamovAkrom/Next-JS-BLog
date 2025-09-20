import { Github, Linkedin, Globe } from "lucide-react"
import { AboutDataType } from "@/types/about"

export const aboutData: AboutDataType = {
  name: "Akrom",
  role: "Backend & Fullstack Developer",
  image: "/about.jpg", // загрузи в public/
  description: [
    "I am a Backend developer with experience in Python and Django.",
    "Currently exploring frontend frameworks like React to enhance my projects.",
    "My goal is to build modern, scalable, and user-friendly applications."
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/RustamovAkrom",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/akrom-rustamov-255b372b7/",
      icon: Linkedin,
    },
    {
      label: "Portfolio",
      href: "https://akrom-omega.vercel.app/",
      icon: Globe,
    },
  ],
}
