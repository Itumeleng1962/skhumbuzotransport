import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import {
  Lock,
  Mail,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Phone,
  Shield,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { portalLogins, type PortalRole } from "@/content/site.ts"
import { useTheme } from "@/lib/theme.tsx"

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Full name is required."),
  phone: z.string().trim().min(10, "Valid phone number required."),
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["parent", "driver", "admin"]),
})

type LoginValues = z.infer<typeof loginSchema>
type SignUpValues = z.infer<typeof signUpSchema>

export function LoginPage({ role: initialRole }: { role: PortalRole }) {
  const [currentRole, setCurrentRole] = useState<PortalRole>(initialRole)
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const portal = portalLogins[currentRole]
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:
        currentRole === "admin"
          ? "admin@sitholetransport.co.za"
          : currentRole === "driver"
          ? "sipho.driver@sitholetransport.co.za"
          : "itumeleng.parent@gmail.com",
      password: "password123",
    },
  })

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      role: currentRole,
    },
  })

  useEffect(() => {
    document.title = `${mode === "login" ? "Sign In" : "Sign Up"} · Skhumbuzo Sithole Transport`
  }, [mode, currentRole])

  const onLogin = () => {
    setSignedIn(true)
    setTimeout(() => {
      navigate(`/${currentRole}`)
    }, 1200)
  }

  const onSignUp = () => {
    setSignedIn(true)
    setTimeout(() => {
      navigate(`/${currentRole}`)
    }, 1200)
  }

  // Dynamic image matching the role
  const roleImage =
    currentRole === "parent"
      ? "/images/sa-children-happy.jpg"
      : currentRole === "driver"
      ? "/images/sa-driver-portrait.jpg"
      : "/images/hero-quantum-bg.jpg"

  return (
    <div className={`min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans transition-colors ${
      isDark ? "bg-[#0B0B0E] text-slate-100" : "bg-[#F3F4F8] text-slate-800"
    }`}>
      
      {/* 
        ================================================================
        LEFT HALF: Dramatic Full Picture with Golden Overlay & Brand Logo
        ================================================================
      */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden min-h-screen bg-black">
        {/* Background Image */}
        <img
          src={roleImage}
          alt="Skhumbuzo Sithole Transport Vehicle and Community"
          className="absolute inset-0 h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark-to-Gold Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        
        {/* Top Floating Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="inline-block group">
            <img
              src="/images/logo.png"
              alt="Skhumbuzo Sithole Transport"
              className="h-14 w-auto object-contain transition group-hover:scale-105 drop-shadow-2xl"
            />
          </Link>
          <span className="rounded-full bg-black/60 border border-[#D4AF37]/50 px-3.5 py-1 text-xs font-bold text-[#F5C542] backdrop-blur-md flex items-center gap-1.5 shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Johannesburg Live Network
          </span>
        </div>

        {/* Center / Bottom Slogan Typography */}
        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3.5 py-1 text-xs font-extrabold text-[#F5C542] backdrop-blur-md">
            <Sparkles size={14} />
            <span>Smart School Transport for a Safer South Africa</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight drop-shadow-md">
            Safe Journeys, <br />
            <span className="bg-gradient-to-r from-[#FDE08B] via-[#F5C542] to-[#D4AF37] bg-clip-text text-transparent">
              Brighter Futures.
            </span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed drop-shadow-sm">
            Empowering South African schools, guardians, and vetted drivers with real-time telemetry, instant notifications, and complete passenger visibility.
          </p>

          {/* Social Proof / Security Badge */}
          <div className="pt-4 flex items-center gap-6 border-t border-white/15 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#F5C542]" />
              <span>POPIA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>256-Bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        ================================================================
        RIGHT HALF: Sign In / Sign Up Form Card Container
        ================================================================
      */}
      <div className={`flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20 min-h-screen ${
        isDark ? "bg-[#0E0E12]" : "bg-white"
      }`}>
        <div className="mx-auto w-full max-w-md space-y-6">

          {/* Back Button */}
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className={`inline-flex items-center gap-1.5 text-xs font-bold transition rounded-full px-3 py-1.5 border ${
                isDark
                  ? "border-[#262630] bg-[#141419] text-slate-400 hover:text-white hover:border-[#D4AF37]"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900"
              }`}
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>

            {/* Mobile Brand Logo */}
            <Link to="/" className="lg:hidden">
              <img src="/images/logo.png" alt="Logo" className="h-9 w-auto" />
            </Link>
          </div>

          {/* Header Title */}
          <div>
            <h2 className={`text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              {mode === "login" ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {mode === "login"
                ? `Access your ${portal.title.toLowerCase()} and real-time tracking console.`
                : "Register as a guardian or driver for certified school transport."}
            </p>
          </div>

          {/* Role Pill Switcher */}
          <div className={`grid grid-cols-3 p-1 rounded-2xl border text-xs font-bold ${
            isDark ? "bg-[#141419] border-[#262630]" : "bg-slate-100 border-slate-200"
          }`}>
            {(["parent", "driver", "admin"] as PortalRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setCurrentRole(r)}
                className={`py-2 px-3 rounded-xl transition capitalize text-center ${
                  currentRole === r
                    ? "bg-gradient-to-r from-[#F5C542] to-[#D4AF37] text-black shadow-md font-black"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r === "parent" ? "Guardian" : r === "driver" ? "Driver" : "Admin"}
              </button>
            ))}
          </div>

          {/* Success State */}
          {signedIn ? (
            <div className="py-12 text-center space-y-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
              <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                Welcome, {currentRole.toUpperCase()}!
              </h3>
              <p className="text-xs text-slate-400">Authenticating verified credentials... Entering console.</p>
            </div>
          ) : mode === "login" ? (
            /* 
              ============================================================
              LOGIN FORM
              ============================================================
            */
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="email"
                    {...registerLogin("email")}
                    className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs outline-hidden transition ${
                      isDark
                        ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                        : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                    }`}
                  />
                </div>
                {loginErrors.email && (
                  <span className="text-[11px] text-red-400 mt-1 block">{loginErrors.email.message}</span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  <Link to="/contact" className="text-[11px] text-[#F5C542] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...registerLogin("password")}
                    className={`w-full rounded-xl border pl-10 pr-10 py-2.5 text-xs outline-hidden transition ${
                      isDark
                        ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                        : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {loginErrors.password && (
                  <span className="text-[11px] text-red-400 mt-1 block">{loginErrors.password.message}</span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] py-3 text-xs font-black text-black hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition flex items-center justify-center gap-2"
              >
                Sign In to {currentRole === "parent" ? "Parent App" : currentRole === "driver" ? "Driver App" : "Operations Desk"} <ArrowRight size={14} />
              </Button>

              {/* Demo Account Box */}
              <div className={`p-3.5 rounded-xl border text-xs text-center space-y-1 ${
                isDark ? "bg-[#141419] border-[#262630]" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="font-bold text-[#F5C542]">Pre-Configured Demo Account</div>
                <p className="text-[11px] text-slate-400">
                  Clicking "Sign In" will immediately load the live {currentRole} interactive dashboard.
                </p>
                <Link
                  to={`/${currentRole}`}
                  className="inline-block text-[11px] font-extrabold text-emerald-400 hover:underline pt-1"
                >
                  Or jump directly to {currentRole} portal →
                </Link>
              </div>

              {/* Mode Switcher */}
              <div className="text-center text-xs text-slate-400 pt-2">
                Don't have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-bold text-[#F5C542] hover:underline"
                >
                  Create an account
                </button>
              </div>
            </form>
          ) : (
            /* 
              ============================================================
              SIGN UP FORM
              ============================================================
            */
            <form onSubmit={handleSignUpSubmit(onSignUp)} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Itumeleng Sithole"
                    {...registerSignUp("name")}
                    className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs outline-hidden transition ${
                      isDark
                        ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                        : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                    }`}
                  />
                </div>
                {signUpErrors.name && (
                  <span className="text-[11px] text-red-400 mt-0.5 block">{signUpErrors.name.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="082 123 4567"
                      {...registerSignUp("phone")}
                      className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs outline-hidden transition ${
                        isDark
                          ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                          : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                      }`}
                    />
                  </div>
                  {signUpErrors.phone && (
                    <span className="text-[11px] text-red-400 mt-0.5 block">{signUpErrors.phone.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Account Role
                  </label>
                  <select
                    {...registerSignUp("role")}
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value as PortalRole)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs outline-hidden transition ${
                      isDark
                        ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                        : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                    }`}
                  >
                    <option value="parent">Parent / Guardian</option>
                    <option value="driver">Certified Driver</option>
                    <option value="admin">Operations Desk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="email"
                    placeholder="parent@domain.co.za"
                    {...registerSignUp("email")}
                    className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs outline-hidden transition ${
                      isDark
                        ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                        : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                    }`}
                  />
                </div>
                {signUpErrors.email && (
                  <span className="text-[11px] text-red-400 mt-0.5 block">{signUpErrors.email.message}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    {...registerSignUp("password")}
                    className={`w-full rounded-xl border pl-10 pr-10 py-2.5 text-xs outline-hidden transition ${
                      isDark
                        ? "bg-[#141419] border-[#262630] text-white focus:border-[#D4AF37]"
                        : "bg-white border-slate-300 text-slate-900 focus:border-[#D4AF37]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {signUpErrors.password && (
                  <span className="text-[11px] text-red-400 mt-0.5 block">{signUpErrors.password.message}</span>
                )}
              </div>

              <div className="text-[10px] text-slate-400">
                By registering, you consent to POPIA-compliant child transport communication via SMS and app alerts.
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] py-3 text-xs font-black text-black hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition flex items-center justify-center gap-2"
              >
                Create Account <UserCheck size={14} />
              </Button>

              <div className="text-center text-xs text-slate-400 pt-2">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-bold text-[#F5C542] hover:underline"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  )
}
