import { ShieldCheck, Bus, Users, CheckCircle2, ChevronRight, Radio, PhoneCall } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { CleanHeroDeviceMockup } from "@/components/brand/CleanHeroDeviceMockup.tsx"
import { brand, services } from "@/content/site.ts"
import { useTheme } from "@/lib/theme.tsx"

export function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  useEffect(() => {
    document.title = `${brand.name} | Safe & Smart School Bus Management`
  }, [])

  return (
    <div className={isDark ? "bg-[#0B0B0E] text-white" : "bg-white text-slate-800"}>
      {/* 
        HERO SECTION: With South African Toyota Quantum Minibus Background Image & Overlay
      */}
      <section className="relative overflow-hidden pt-12 pb-36 sm:pb-44 border-b border-black/10">
        {/* Background Image of South African Toyota Quantum Minibus */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-quantum-bg.jpg"
            alt="Skhumbuzo Sithole Transport Luxury Black & Gold Quantum Minibus"
            className="h-full w-full object-cover object-right md:object-center"
          />
          {/* Gradient Tint Overlay for contrast and readability */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-r from-[#0B0B0E]/95 via-[#0B0B0E]/80 to-[#0B0B0E]/40"
                : "bg-gradient-to-r from-[#152544]/95 via-[#152544]/80 to-[#152544]/45"
            }`}
          />
        </div>

        {/* Ambient Gold Glow */}
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none z-1" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10 text-white">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Left: Device Mockup (Mac Tablet Window + Mobile Phone) */}
            <div className="order-2 lg:order-1">
              <CleanHeroDeviceMockup />
            </div>

            {/* Right: Headline & CTA */}
            <div className="order-1 lg:order-2 space-y-6 max-w-xl">
              {/* Animated Live Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#18181F]/90 to-[#121216]/90 px-4 py-1.5 text-xs font-bold text-[#F5C542] shadow-lg backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5C542] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
                </span>
                <Radio size={13} className="text-[#F5C542] animate-pulse" />
                <span>Live Johannesburg School Transit Active · 11 Trips Online</span>
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-[1.12]">
                Track. Monitor. <br />
                <span className="bg-gradient-to-r from-[#FDE08B] via-[#F5C542] to-[#D4AF37] bg-clip-text text-transparent">
                  Stay Informed.
                </span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-slate-200">
                Safe journeys and brighter futures for learners across South Africa. Equipped with verified <strong className="text-white">Toyota Quantum fleets</strong>, vetted drivers, and real-time guardian tracking.
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/parent"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] px-8 py-4 text-base font-extrabold text-[#0B0B0E] shadow-[0_0_35px_rgba(212,175,55,0.5)] transition transform hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Experience Parent Tracker <ChevronRight size={18} className="transition group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition group-hover:animate-beam" />
                </Link>

                <Link
                  to="/admin"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 px-7 py-3.5 text-base font-bold text-white transition backdrop-blur-sm"
                >
                  Open Operations Desk
                </Link>

                <a
                  href="tel:08007484653"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#F5C542] hover:underline"
                >
                  <PhoneCall size={14} /> 0800 748 4653
                </a>
              </div>

              {/* Live Metric Stats Bar in Hero */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/15">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xs">
                  <div className="text-xl sm:text-2xl font-black text-[#F5C542]">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Vetted Drivers</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xs">
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">97.4%</div>
                  <div className="text-[11px] text-slate-300 font-medium">On-Time Rate</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 backdrop-blur-xs">
                  <div className="text-xl sm:text-2xl font-black text-white">358+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Safe Learners</div>
                </div>
              </div>

              {/* Sub-features list */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-200 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#F5C542]" /> Real-Time Telemetry
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#F5C542]" /> POPIA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-[#F5C542]" /> Toyota 2.8 Diesel Quantum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Curving Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
          <svg
            className={`relative block w-full h-16 sm:h-24 md:h-32 transition-colors ${
              isDark ? "text-[#121216]" : "text-white"
            }`}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,90 800,120 1200,40 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* 
        PHOTO SHOWCASE: SOUTH AFRICAN SCHOOL CHILDREN & QUANTUM FLEET
        "Generated Many Pictures For Them"
      */}
      <section className={`py-16 sm:py-20 transition-colors ${isDark ? "bg-[#121216]" : "bg-white"}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Built For Our Future
            </span>
            <h2 className={`mt-2 text-3xl font-extrabold sm:text-4xl ${isDark ? "text-white" : "text-[#152544]"}`}>
              Because Every Child's Journey Matters
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Safe, respectful, and punctual transit for learners across Johannesburg, Soweto, and surrounding Gauteng schools.
            </p>
          </div>

          {/* Picture Grid with Real South African Children & Quantum Images */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Image 1: Boarding School Children */}
            <div className={`overflow-hidden rounded-2xl border transition hover:-translate-y-1 shadow-lg ${
              isDark ? "border-[#262630] bg-[#18181F]" : "border-slate-200 bg-white"
            }`}>
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/sa-school-children-quantum.jpg"
                  alt="South African school children boarding a Toyota Quantum minibus"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#0B0B0E]/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#F5C542]">
                  Morning Collection
                </span>
              </div>
              <div className="p-5">
                <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-[#152544]"}`}>
                  Dignified & Safe Boarding
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Every child is greeted by name at designated neighborhood collection points, ensuring no child is left behind.
                </p>
              </div>
            </div>

            {/* Image 2: Happy Primary School Children */}
            <div className={`overflow-hidden rounded-2xl border transition hover:-translate-y-1 shadow-lg ${
              isDark ? "border-[#262630] bg-[#18181F]" : "border-slate-200 bg-white"
            }`}>
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/sa-children-happy.jpg"
                  alt="Happy South African primary school children smiling with backpacks"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#0B0B0E]/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#F5C542]">
                  Guardian Peace of Mind
                </span>
              </div>
              <div className="p-5">
                <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-[#152544]"}`}>
                  Arriving Ready to Learn
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Parents receive live notifications the second their child safely steps through the school gates each morning.
                </p>
              </div>
            </div>

            {/* Image 3: Professional Verified Driver */}
            <div className={`overflow-hidden rounded-2xl border transition hover:-translate-y-1 shadow-lg ${
              isDark ? "border-[#262630] bg-[#18181F]" : "border-slate-200 bg-white"
            }`}>
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/sa-driver-portrait.jpg"
                  alt="Professional South African transport driver Sipho Mthembu smiling by vehicle"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#0B0B0E]/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#F5C542]">
                  Verified PrDP Drivers
                </span>
              </div>
              <div className="p-5">
                <h3 className={`font-bold text-base ${isDark ? "text-white" : "text-[#152544]"}`}>
                  Vetted Operators You Know
                </h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  Background checked, certified drivers with valid Professional Driving Permits dedicated to familiar routes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        3 AUDIENCE CARDS: Administrators, Parents, Bus Operators 
      */}
      <section className={`py-16 sm:py-20 transition-colors ${isDark ? "bg-[#0B0B0E]" : "bg-slate-50"}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: Administrators */}
            <div className={`group rounded-2xl p-8 shadow-xl border transition hover:-translate-y-1 ${
              isDark
                ? "bg-[#18181F] border-[#262630] hover:border-[#D4AF37]"
                : "bg-white border-slate-200 hover:border-blue-500"
            }`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 mb-6 font-bold">
                <Users size={24} />
              </div>
              <h3 className={`text-xl font-bold transition ${isDark ? "text-white group-hover:text-[#F5C542]" : "text-[#152544] group-hover:text-blue-600"}`}>
                Administrators
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Complete route builder, real-time fleet map, driver logs, and comprehensive school attendance reporting.
              </p>
              <Link
                to="/admin"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F5C542] hover:underline"
              >
                <span>Open Operations Console</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Card 2: Parents */}
            <div className={`group rounded-2xl p-8 shadow-xl border transition hover:-translate-y-1 ${
              isDark
                ? "bg-[#18181F] border-[#262630] hover:border-[#D4AF37]"
                : "bg-white border-slate-200 hover:border-blue-500"
            }`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 mb-6 font-bold">
                <ShieldCheck size={24} />
              </div>
              <h3 className={`text-xl font-bold transition ${isDark ? "text-white group-hover:text-[#F5C542]" : "text-[#152544] group-hover:text-blue-600"}`}>
                Parents & Guardians
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Live child GPS tracking, instant boarding & arrival push notifications, and verified driver contact numbers.
              </p>
              <Link
                to="/parent"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F5C542] hover:underline"
              >
                <span>View Parent Portal</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            {/* Card 3: Bus Operators */}
            <div className={`group rounded-2xl p-8 shadow-xl border transition hover:-translate-y-1 ${
              isDark
                ? "bg-[#18181F] border-[#262630] hover:border-[#D4AF37]"
                : "bg-white border-slate-200 hover:border-blue-500"
            }`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 mb-6 font-bold">
                <Bus size={24} />
              </div>
              <h3 className={`text-xl font-bold transition ${isDark ? "text-white group-hover:text-[#F5C542]" : "text-[#152544] group-hover:text-blue-600"}`}>
                Bus Operators & Drivers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Turn-by-turn route navigation, one-tap student boarding checks, and direct two-way dispatch messaging.
              </p>
              <Link
                to="/driver"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F5C542] hover:underline"
              >
                <span>Launch Driver App</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        FEATURE SECTION: Clean Grid with Services
      */}
      <section className={`py-20 border-t ${isDark ? "bg-[#121216] border-[#262630]" : "bg-white border-slate-200"}`}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="max-w-2xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Why Choose Our Platform
            </h2>
            <h3 className={`mt-2 text-3xl font-extrabold sm:text-4xl ${isDark ? "text-white" : "text-[#152544]"}`}>
              Modern school transit, built around trust.
            </h3>
            <p className="mt-4 text-base text-slate-400">
              We replaced disconnected phone calls and uncertainty with clean, real-time coordination between schools, families, and Quantum drivers.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item, idx) => (
              <div key={idx} className={`rounded-xl p-6 border shadow-md transition ${
                isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="text-xs font-bold text-[#F5C542]">0{idx + 1}</div>
                <h4 className={`mt-3 text-lg font-bold ${isDark ? "text-white" : "text-[#152544]"}`}>{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
