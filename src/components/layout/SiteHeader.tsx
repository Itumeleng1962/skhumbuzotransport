import { Menu, X, Sun, Moon, Phone, Mail, Clock } from "lucide-react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTheme } from "@/lib/theme.tsx"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "black-gold"

  return (
    <>
      {/* Top Banner Header with Contacts and Social Media */}
      <div className={`border-b text-xs transition-colors ${
        isDark ? "bg-[#070709] border-[#22222a] text-slate-400" : "bg-slate-900 border-slate-800 text-slate-300"
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 sm:px-8">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="tel:08007484653"
              className="flex items-center gap-1.5 font-semibold text-[#F5C542] hover:underline"
            >
              <Phone size={13} className="text-[#F5C542]" />
              <span>0800 748 4653 (Toll Free)</span>
            </a>
            <a
              href="mailto:dispatch@sitholetransport.co.za"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition"
            >
              <Mail size={13} className="text-slate-400" />
              <span>dispatch@sitholetransport.co.za</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock size={13} />
              <span>Mon - Fri: 06:00 - 18:00</span>
            </div>
          </div>

          {/* Right: Social Media Links */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 hidden md:inline">Follow Us:</span>
            {/* WhatsApp */}
            <a
              href="https://wa.me/27825554912"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition"
              title="Chat with Dispatch on WhatsApp"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.5C9.36 7.5 9.09 7.57 8.85 7.82C8.61 8.07 7.94 8.7 7.94 9.97C7.94 11.24 8.87 12.47 9 12.64C9.13 12.81 10.8 15.48 13.41 16.5C15.5 17.31 16 17.15 16.44 17.11C16.89 17.07 17.87 16.53 18.08 15.96C18.28 15.39 18.28 14.9 18.22 14.8C18.17 14.7 18.03 14.64 17.82 14.53C17.61 14.43 16.56 13.91 16.36 13.84C16.17 13.77 16.03 13.73 15.89 13.94C15.75 14.15 15.36 14.61 15.24 14.75C15.12 14.89 15 14.9 14.79 14.8C14.58 14.7 13.91 14.48 13.11 13.77C12.49 13.22 12.07 12.54 11.95 12.33C11.83 12.12 11.94 12.01 12.04 11.91C12.14 11.81 12.25 11.68 12.36 11.55C12.46 11.42 12.5 11.33 12.57 11.19C12.64 11.05 12.6 10.93 12.55 10.83C12.5 10.72 12.08 9.7 11.91 9.28C11.74 8.87 11.57 8.93 11.44 8.92H11.03C10.9 8.92 10.69 8.97 10.51 9.17"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition"
              title="Facebook"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white transition"
              title="Instagram"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700/20 text-blue-400 hover:bg-blue-700 hover:text-white transition"
              title="LinkedIn"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDark ? "border-[#262630] bg-[#0B0B0E]/90 text-white" : "border-slate-200 bg-white/95 text-slate-800"
      }`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.png"
            alt="Skhumbuzo Sithole Transport"
            className="h-12 sm:h-14 w-auto object-contain transition group-hover:scale-105"
          />
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-sm font-semibold tracking-wide transition ${
                isActive
                  ? "text-[#F5C542]"
                  : isDark
                    ? "text-slate-300 hover:text-[#F5C542]"
                    : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Administrators
          </NavLink>
          <NavLink
            to="/parent"
            className={({ isActive }) =>
              `text-sm font-semibold tracking-wide transition ${
                isActive
                  ? "text-[#F5C542]"
                  : isDark
                    ? "text-slate-300 hover:text-[#F5C542]"
                    : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Parents
          </NavLink>
          <NavLink
            to="/driver"
            className={({ isActive }) =>
              `text-sm font-semibold tracking-wide transition ${
                isActive
                  ? "text-[#F5C542]"
                  : isDark
                    ? "text-slate-300 hover:text-[#F5C542]"
                    : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Bus Operators
          </NavLink>
          <NavLink
            to="/fleet"
            className={({ isActive }) =>
              `text-sm font-semibold tracking-wide transition ${
                isActive
                  ? "text-[#F5C542]"
                  : isDark
                    ? "text-slate-300 hover:text-[#F5C542]"
                    : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Fleet
          </NavLink>
          <NavLink
            to="/safety"
            className={({ isActive }) =>
              `text-sm font-semibold tracking-wide transition ${
                isActive
                  ? "text-[#F5C542]"
                  : isDark
                    ? "text-slate-300 hover:text-[#F5C542]"
                    : "text-slate-600 hover:text-blue-600"
              }`
            }
          >
            Safety
          </NavLink>
        </nav>

        {/* Right CTA Buttons & Theme Switcher Button */}
        <div className="hidden items-center gap-4 md:flex">
          {/* THEME CHANGER BUTTON */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition shadow-xs ${
              isDark
                ? "border-[#D4AF37]/40 bg-[#18181F] text-[#F5C542] hover:bg-[#D4AF37]/10"
                : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isDark ? (
              <>
                <Sun size={15} className="text-[#F5C542]" />
                <span>Gold Theme</span>
              </>
            ) : (
              <>
                <Moon size={15} className="text-blue-600" />
                <span>Light Theme</span>
              </>
            )}
          </button>

          <Link
            to="/admin/login"
            className={`text-sm font-semibold transition ${
              isDark ? "text-slate-300 hover:text-[#F5C542]" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Sign in
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] px-6 py-2.5 text-sm font-bold text-[#0B0B0E] transition hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.25)]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu and Theme Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-700 text-[#F5C542]"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg text-slate-300 hover:text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <div className={`border-t px-6 py-6 md:hidden space-y-4 ${
          isDark ? "border-[#262630] bg-[#121216] text-white" : "border-slate-200 bg-white text-slate-800"
        }`}>
          <Link to="/admin" onClick={() => setOpen(false)} className="block text-base font-medium">
            Administrators
          </Link>
          <Link to="/parent" onClick={() => setOpen(false)} className="block text-base font-medium">
            Parents
          </Link>
          <Link to="/driver" onClick={() => setOpen(false)} className="block text-base font-medium">
            Bus Operators
          </Link>
          <Link to="/fleet" onClick={() => setOpen(false)} className="block text-base font-medium">
            Fleet
          </Link>
          <Link to="/safety" onClick={() => setOpen(false)} className="block text-base font-medium">
            Safety
          </Link>
          <div className="pt-4 border-t border-slate-700 flex gap-4">
            <Link to="/admin/login" onClick={() => setOpen(false)} className="text-sm font-semibold">
              Sign in
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-full bg-[#D4AF37] px-5 py-2 text-sm font-bold text-[#0B0B0E]">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  )
}
