"use client"

import { useState } from "react"
import { contactInfo } from "@/config/contact"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь можно подключить API (например, email сервис, Telegram-бот, backend Django)
    console.log("Form submitted:", form)
    setSubmitted(true)
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 space-y-12">
      {/* Заголовок */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Contact <span className="text-indigo-500">Me</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Have a question, proposal, or just want to say hi? Drop me a message 👇
        </p>
      </section>

      {/* Контакты */}
      <section className="grid gap-4 sm:grid-cols-2">
        {contactInfo.map((item) => (
          <div
            key={item.label}
            className="border rounded-xl p-4 text-center sm:text-left"
          >
            <h3 className="font-semibold">{item.label}</h3>
            {item.href ? (
              <Link
                href={item.href}
                target="_blank"
                className="text-indigo-500 hover:underline"
              >
                {item.value}
              </Link>
            ) : (
              <p>{item.value}</p>
            )}
          </div>
        ))}
      </section>

      {/* Форма */}
      <section>
        {submitted ? (
          <div className="p-6 text-center bg-green-100 dark:bg-green-800 rounded-xl">
            <h3 className="text-lg font-semibold">✅ Thank you!</h3>
            <p className="text-muted-foreground">
              Your message has been sent successfully.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border rounded-xl p-6 shadow-sm"
          >
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        )}
      </section>
    </div>
  )
}
