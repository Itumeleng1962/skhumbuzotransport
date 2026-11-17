import { useEffect } from "react"
import { Link } from "react-router-dom"
import { brand } from "@/content/site.ts"
import { useTheme } from "@/lib/theme.tsx"

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  useEffect(() => {
    document.title = `${title} · ${brand.short}`
  }, [title])

  return (
    <section className={`relative overflow-hidden border-b transition-colors ${
      isDark ? "bg-[#121216] border-[#262630] text-white" : "bg-[#152544] border-slate-700 text-white"
    }`}>
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-18 relative z-10">
        <p className="text-xs font-bold tracking-[0.22em] text-[#F5C542] uppercase">{eyebrow}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl text-white">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{text}</p>
        <p className="mt-5 text-xs text-slate-400">
          <Link to="/" className="hover:text-[#F5C542] transition">Home</Link>
          <span className="px-2 text-slate-500">/</span>
          <span className="text-white font-medium">{title}</span>
        </p>
      </div>
    </section>
  )
}
