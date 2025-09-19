"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          {siteConfig.name}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={`${navigationMenuTriggerStyle()} ${
                        pathname === link.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-2">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
