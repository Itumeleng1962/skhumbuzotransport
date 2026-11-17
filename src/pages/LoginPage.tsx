import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/layout/PageHero.tsx"
import { Container } from "@/components/layout/Section.tsx"
import { Button } from "@/components/ui/button.tsx"
import { portalLogins, type PortalRole } from "@/content/site.ts"
import { useTheme } from "@/lib/theme.tsx"

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

type FormValues = z.infer<typeof schema>

export function LoginPage({ role }: { role: PortalRole }) {
  const portal = portalLogins[role]
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  const [signedIn, setSignedIn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: role === "admin" ? "admin@sitholetransport.co.za" : role === "driver" ? "driver.sipho@sitholetransport.co.za" : "parent.itumeleng@gmail.com", password: "••••••••" },
  })

  useEffect(() => {
    document.title = `${portal.title} · Skhumbuzo Sithole Transport`
  }, [portal.title])

  const onSubmit = () => {
    setSignedIn(true)
    setTimeout(() => {
      navigate(`/${role}`)
    }, 1000)
  }

  // Visual image preview depending on role
  const roleImage = role === "parent" 
    ? "/images/sa-children-happy.jpg" 
    : role === "driver" 
    ? "/images/sa-driver-portrait.jpg" 
    : "/images/hero-quantum-bg.jpg"

  return (
    <>
      <PageHero eyebrow="Secure Access" title={portal.title} text={portal.intro} />
      <section className={`py-14 sm:py-20 transition-colors ${isDark ? "bg-[#0B0B0E]" : "bg-[#f8fafc]"}`}>
        <Container className="grid gap-10 lg:grid-cols-2 items-center">
          
          {/* Form Card */}
          <div className={`rounded-3xl border p-6 sm:p-10 shadow-2xl relative overflow-hidden ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F5C542] to-[#D4AF37] text-black font-black shadow-md">
                <Lock size={22} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold">{portal.title} Sign In</h2>
                <p className="text-xs text-slate-400">POPIA Verified Session Authentication</p>
              </div>
            </div>

            {signedIn ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-white">Credentials Verified</h3>
                <p className="text-sm text-slate-400">Redirecting to live {portal.title.toLowerCase()}...</p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Authorized Email Address</span>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="email"
                      autoComplete="username"
                      className="w-full rounded-xl border border-slate-700 bg-[#18181F] pl-10 pr-3.5 py-3 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                      {...register("email")}
                    />
                  </div>
                  {errors.email ? <span className="mt-1 block text-xs text-red-400">{errors.email.message}</span> : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-300">Password / PIN</span>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-700 bg-[#18181F] pl-10 pr-3.5 py-3 text-sm text-white outline-hidden focus:border-[#D4AF37]"
                      {...register("password")}
                    />
                  </div>
                  {errors.password ? <span className="mt-1 block text-xs text-red-400">{errors.password.message}</span> : null}
                </label>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck size={14} /> 256-bit Encryption
                  </span>
                  <Link to="/contact" className="hover:text-[#F5C542] transition">
                    Need Help Signing In?
                  </Link>
                </div>

                <Button
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] py-3.5 text-sm font-extrabold text-black hover:brightness-110 shadow-xl transition"
                  type="submit"
                >
                  Enter Portal <ArrowRight size={16} className="ml-2" />
                </Button>

                <div className="pt-4 border-t border-white/10 text-center">
                  <Link
                    to={`/${role}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5C542] hover:underline"
                  >
                    Quick Preview Without Login →
                  </Link>
                </div>
              </form>
            )}
          </div>

          {/* Right: Picture & Feature Showcase */}
          <div className="space-y-6">
            <div className={`overflow-hidden rounded-3xl border shadow-2xl ${
              isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-800"
            }`}>
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={roleImage}
                  alt={`${portal.title} preview`}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-[#141419]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-black text-black">
                    {role === "admin" ? "Operations Desk" : role === "driver" ? "Driver Console" : "Guardian Mobile Portal"}
                  </span>
                  <h3 className="mt-2 text-xl font-black text-white">
                    {role === "admin" 
                      ? "Real-Time Fleet Oversight Across Gauteng" 
                      : role === "driver" 
                      ? "Hands-Free Route Navigation & Passenger Manifest" 
                      : "Peace of Mind Every Single Morning"}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <UserCheck size={16} className="text-[#F5C542]" />
                  <span>Verified credentials managed under South African POPIA regulations.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#F5C542]" />
                  <span>Real-time GPS coordinates active only during designated route trips.</span>
                </div>
              </div>
            </div>

            {/* Role Switcher Pill Bar */}
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="text-slate-400">Switch Sign In:</span>
              <Link to="/parent/login" className={`px-3 py-1 rounded-full font-bold ${role === "parent" ? "bg-[#D4AF37] text-black" : "bg-[#18181F] text-slate-300"}`}>
                Parent
              </Link>
              <Link to="/driver/login" className={`px-3 py-1 rounded-full font-bold ${role === "driver" ? "bg-[#D4AF37] text-black" : "bg-[#18181F] text-slate-300"}`}>
                Driver
              </Link>
              <Link to="/admin/login" className={`px-3 py-1 rounded-full font-bold ${role === "admin" ? "bg-[#D4AF37] text-black" : "bg-[#18181F] text-slate-300"}`}>
                Admin
              </Link>
            </div>
          </div>

        </Container>
      </section>
    </>
  )
}
