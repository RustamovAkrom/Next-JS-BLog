"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import NProgress from "nprogress" 
import "nprogress/nprogress.css"

// Настройки NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
})

export default function ProgressProvider() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    // Запуск линии
    NProgress.start()

    // Окончание линии через короткое время
    const timer = setTimeout(() => {
      NProgress.done()
    }, 500) // полсекунды, можно настроить

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
