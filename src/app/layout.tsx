// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/theme-provider";
import PageLoader from "@/components/PageLoader";
import { siteConfig } from "@/config/site";
import ProgressProvider from "@/providers/progress-provider";

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
    default: siteConfig.name,
    template: "%s | My Blog App",
  },
  description: siteConfig.description,
  keywords: [
    "blog",
    "technology",
    "programming",
    "nextjs",
    "sanity",
    "tutorial",
    "news",
  ],
  authors: [{ name: "Akrom", url: siteConfig.public_url }],
  creator: siteConfig.creator,
  publisher: "My Blog App",
  metadataBase: new URL(siteConfig.public_url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.public_url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: `${siteConfig.public_url}/metadata-logo.webp`,
        width: 1200,
        height: 630,
        alt: "My Blog App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.creator,
    images: [`${siteConfig.public_url}/metadata-logo.webp`],
  },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader>

            <Navbar />
            <ProgressProvider />

            <main className="min-h-screen py-6 max-w-7xl mx-auto transition-colors">
              {children}
            </main>
            <Footer />
          </PageLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
