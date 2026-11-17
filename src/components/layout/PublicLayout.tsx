import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { SiteFooter } from "@/components/layout/SiteFooter.tsx"
import { SiteHeader } from "@/components/layout/SiteHeader.tsx"
import { useTheme } from "@/lib/theme.tsx"

export function PublicLayout() {
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={`flex min-h-screen flex-col font-sans transition-colors ${
      isDark ? "bg-[#0B0B0E] text-slate-100" : "bg-[#f8fafc] text-slate-800"
    }`}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#D4AF37] focus:px-4 focus:py-2 focus:text-black font-bold"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
