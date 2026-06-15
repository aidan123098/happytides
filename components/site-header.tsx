"use client"

import { useState } from "react"
import { Box, ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

const navLinks = [
  { label: "Standards", href: "#standards" },
  { label: "Verification", href: "#verification" },
  { label: "Launch Access", href: "/launch-access" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

const catalogItems = [
  { label: "GLP3-RT", note: "10 mg", href: "#glp3-rt" },
  { label: "BPC-157", note: "10 mg", href: "#bpc-157" },
  { label: "TB-500", note: "10 mg", href: "#tb-500" },
  { label: "NAD+", note: "500 mg", href: "#nad" },
  { label: "View all products", note: "", href: "#catalog" },
]

export function SiteHeader() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cartCount = 2

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="flex h-20 w-full items-center justify-between px-5 lg:px-[clamp(2rem,5vw,5rem)]">
        <a href="#" aria-label="HappyTides home">
          <BrandLogo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <div
            className="relative"
            onMouseEnter={() => setCatalogOpen(true)}
            onMouseLeave={() => setCatalogOpen(false)}
          >
            <button
              type="button"
              aria-expanded={catalogOpen}
              aria-haspopup="menu"
              onClick={() => setCatalogOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors hover:text-navy"
            >
              Catalog
              <ChevronDown
                className={`h-4 w-4 transition-transform ${catalogOpen ? "rotate-180" : ""}`}
              />
            </button>

            {catalogOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-popover p-2 shadow-xl shadow-navy/5">
                  {catalogItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      role="menuitem"
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-lavender/60 hover:text-navy"
                    >
                      <span>{item.label}</span>
                      {item.note && (
                        <span className="text-xs text-muted-foreground">{item.note}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] font-medium text-ink transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            aria-label="Account"
            className="hidden text-ink transition-colors hover:text-navy sm:block"
          >
            <User className="h-6 w-6" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            aria-label={`Cart, ${cartCount} items`}
            className="relative text-ink transition-colors hover:text-navy"
          >
            <ShoppingBag className="h-6 w-6" strokeWidth={1.6} />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1 text-[11px] font-semibold text-background">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-navy sm:flex"
          >
            <Box className="h-4 w-4" strokeWidth={2} />
            Build Kit
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="text-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <span className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Catalog
            </span>
            {catalogItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-lavender/60"
              >
                {item.label}
                {item.note && (
                  <span className="text-xs text-muted-foreground">{item.note}</span>
                )}
              </a>
            ))}
            <div className="my-2 h-px bg-border" />
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-lavender/60"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background"
            >
              <Box className="h-4 w-4" /> Build Kit
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
