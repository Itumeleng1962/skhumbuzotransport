import { Shield, Lock, UserCheck, Phone, Eye, Bell } from "lucide-react"
import { useTheme } from "@/lib/theme.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"

const safetyPillars = [
  {
    icon: UserCheck,
    title: "1. 100% Vetted Drivers & PrDP Certification",
    desc: "Every driver undergoes comprehensive background screening, fingerprint criminal clearance, and holds a verified Professional Driving Permit (PrDP). We conduct routine alcohol screening and annual defensive driver refresher courses.",
  },
  {
    icon: Lock,
    title: "2. POPIA-Compliant Data Privacy & Child Protection",
    desc: "A child's identity, photo, school, and live location are strictly protected under the Protection of Personal Information Act (POPIA). Guardian accounts are verified prior to student linking; location broadcasts terminate automatically when the trip ends.",
  },
  {
    icon: Eye,
    title: "3. Real-Time Telemetry & Speed Capping",
    desc: "All Quantum minibuses are fitted with calibrated GPS telemetry units governed to strict school transit limits (maximum 80 km/h on highways, 40 km/h in suburban school zones). Instant alerts trigger on harsh braking or rapid acceleration.",
  },
  {
    icon: Bell,
    title: "4. Dual-Notification Check-In System",
    desc: "Drivers tap to verify learners on entry and exit. Parents receive automated SMS and app notifications at the precise moment their child boards and safely enters the school premises.",
  },
  {
    icon: Shield,
    title: "5. Comprehensive Passenger Liability Cover",
    desc: "Our vehicles carry full commercial passenger liability insurance through leading South African underwriters, ensuring complete protection for all 16 learners aboard every single trip.",
  },
  {
    icon: Phone,
    title: "6. Dedicated 24/7 Dispatch Desk Helpline",
    desc: "Our Johannesburg operations desk monitors every live run from 06:00 to 18:00 on school days with direct radio contact to emergency services, road assistance, and school principles.",
  },
]

export function SafetyPage() {
  const { theme } = useTheme()
  const isDark = theme === "black-gold"

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0B0B0E] text-white" : "bg-[#f8fafc] text-slate-800"}`}>
      {/* Hero Banner with Picture */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-8 border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/images/sa-children-happy.jpg"
            alt="Protected South African learners"
            className="w-full h-full object-cover object-top"
          />
          <div className={`absolute inset-0 ${isDark ? "bg-[#0B0B0E]/95" : "bg-[#152544]/95"}`} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-bold text-[#F5C542]">
            <Shield size={14} className="text-[#F5C542]" />
            <span>Zero-Compromise Safety Standards</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Safety Above Everything. <br />
            <span className="bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#FDE08B] bg-clip-text text-transparent">
              Every Child, Every Journey.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
            Transporting South Africa's learners is a sacred responsibility. Discover the protocols, checks, and technologies that keep your children safe every school morning and afternoon.
          </p>
        </div>
      </section>

      {/* Safety Pillars Section */}
      <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {safetyPillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border transition hover:-translate-y-1 shadow-lg ${
                  isDark ? "bg-[#141419] border-[#262630] hover:border-[#D4AF37]" : "bg-white border-slate-200 hover:border-blue-500"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 mb-6 font-bold">
                  <Icon size={24} />
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Emergency Protocols Callout Banner */}
        <div className={`mt-16 p-8 sm:p-12 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? "bg-[#18181F] border-[#D4AF37]/40" : "bg-white border-blue-200"
        }`}>
          <div>
            <span className="text-xs font-bold text-[#F5C542] uppercase tracking-wider">
              24-Hour Emergency Dispatch Protocol
            </span>
            <h3 className={`text-2xl font-black mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              Need immediate operational assistance or lost item help?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Our dispatch desk coordinates directly with vehicle drivers via live radio. Reach us at <strong>0800 748 4653</strong>.
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] text-[#0B0B0E] font-bold rounded-full px-8 shrink-0">
            <Link to="/contact">Contact Operations Desk</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
