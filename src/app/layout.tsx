// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👉 ВОТ ЭТО ВЫНОСИМ В ОТДЕЛЬНЫЙ viewport
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Профессиональный metadata для сайта
export const metadata: Metadata = {
  title: {
    default: "My Blog App",
    template: "%s | My Blog App",
  },
  description:
    "Discover insightful articles, useful tips, and inspiring stories on the My Blog App.",
  keywords: [
    "blog",
    "technology",
    "programming",
    "nextjs",
    "sanity",
    "tutorial",
    "news",
  ],
  authors: [{ name: "Akrom", url: "https://akrom-omega.vercel.app" }],
  creator: "Akrom",
  publisher: "My Blog App",
  metadataBase: new URL("https://akromblogdev.vercel.app"),
  openGraph: {
    title: "My Blog App",
    description:
      "Discover insightful articles, useful tips, and inspiring stories on the My Blog App.",
    url: "https://akromblogdev.vercel.app",
    siteName: "My Blog App",
    type: "website",
    images: [
      {
        url: "https://akromblogdev.vercel.app/metadata-logo.webp",
        width: 1200,
        height: 630,
        alt: "My Blog App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog App",
    description:
      "Discover insightful articles, useful tips, and inspiring stories on the My Blog App.",
    creator: "@AkromDev01",
    images: ["https://akromblogdev.vercel.app/metadata-logo.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container min-h-screen py-6 max-w-7xl mx-auto">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
