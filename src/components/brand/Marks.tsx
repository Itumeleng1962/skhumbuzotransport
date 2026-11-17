import { Shield, MapPin, Bell, Radio, Bus, CheckCircle2 } from "lucide-react"

/**
 * Brand Logo matching the banner from the reference image:
 * Features the yellow Quantum minibus illustration on a badge with swooshes,
 * and bold "Skhumbuzo Sithole Transport" typography with the tagline.
 */
export function BrandLogo({
  className = "",
  size = "md",
  light = false,
}: {
  className?: string
  size?: "sm" | "md" | "lg"
  light?: boolean
}) {
  const iconSizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Yellow Bus Emblem with road swoosh */}
      <div
        className={`${iconSizes[size]} relative flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-1.5 shadow-md shadow-amber-500/20`}
      >
        <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
          {/* Stylized Quantum minibus silhouette */}
          <rect x="6" y="10" width="36" height="24" rx="5" fill="#0c1e38" />
          <path d="M7 22H41" stroke="#FDB813" strokeWidth="2.5" />
          {/* Windshield & Windows */}
          <rect x="10" y="13" width="7" height="6" rx="1.5" fill="#FFFFFF" />
          <rect x="19" y="13" width="7" height="6" rx="1.5" fill="#FFFFFF" />
          <rect x="28" y="13" width="11" height="6" rx="1.5" fill="#FFFFFF" />
          {/* Headlights */}
          <circle cx="9" cy="27" r="2" fill="#FDB813" />
          <circle cx="39" cy="27" r="2" fill="#FDB813" />
          {/* Wheels */}
          <circle cx="14" cy="34" r="5" fill="#0A1931" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="34" cy="34" r="5" fill="#0A1931" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="14" cy="34" r="2" fill="#FDB813" />
          <circle cx="34" cy="34" r="2" fill="#FDB813" />
          {/* Dynamic Road Swoosh */}
          <path
            d="M2 42C12 40 24 43 46 39"
            stroke="#FDB813"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M6 45C16 43 28 46 44 43"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      <div className="leading-tight">
        <div
          className={`font-black tracking-tight ${
            light ? "text-white" : "text-navy"
          } ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}
        >
          Skhumbuzo Sithole
        </div>
        <div
          className={`font-bold italic tracking-wide text-amber-500 ${
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm sm:text-base" : "text-xs sm:text-sm"
          }`}
        >
          Transport
        </div>
      </div>
    </div>
  )
}

/** Monogram icon for compact contexts */
export function Monogram({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <div
      className={`${className} relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy via-navy to-slate-900 p-1.5 shadow-inner`}
    >
      <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0D2240" />
        <path d="M6 10H26V24H6Z" rx="4" fill="#FDB813" />
        <rect x="9" y="13" width="5" height="4" rx="1" fill="#0D2240" />
        <rect x="16" y="13" width="7" height="4" rx="1" fill="#0D2240" />
        <circle cx="11" cy="24" r="3" fill="#0D2240" />
        <circle cx="21" cy="24" r="3" fill="#0D2240" />
        <path d="M4 29C10 27 20 29 28 27" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/** South African Flag Ribbon Banner Component */
export function SouthAfricanRibbon({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md ${className}`}>
      {/* SVG SA Flag mini swoosh */}
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-xs overflow-hidden shadow-xs">
        <rect width="24" height="16" fill="#007A3D" />
        <path d="M0 0H24V8H0Z" fill="#E03C31" />
        <path d="M0 8H24V16H0Z" fill="#002395" />
        <path d="M0 0L10 8L0 16Z" fill="#000000" />
        <path d="M0 0L10 8L0 16" stroke="#FFB612" strokeWidth="2.5" />
        <path d="M8 8H24" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
      <span>Smart School Transport for a Safer South Africa</span>
    </div>
  )
}

/** Bottom Value Pillar Badge matching the image footer */
export function ValuePillars({ className = "" }: { className?: string }) {
  const pillars = [
    {
      icon: Shield,
      title: "Real-Time Tracking",
      desc: "Live GPS updates every step of the route",
    },
    {
      icon: Bus,
      title: "Safe School Transport",
      desc: "Verified Quantum fleet & vetted drivers",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      desc: "Instant SMS & app alerts on pick-up and drop-off",
    },
    {
      icon: MapPin,
      title: "Complete Visibility",
      desc: "Peace of mind for parents and school desks",
    },
  ]

  return (
    <div
      className={`grid grid-cols-2 gap-4 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-navy via-[#0c1f3a] to-navy p-6 shadow-2xl md:grid-cols-4 ${className}`}
    >
      {pillars.map((item, idx) => {
        const Icon = item.icon
        return (
          <div key={idx} className="flex items-start gap-3 border-l-2 border-amber-400 pl-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <Icon size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="mt-0.5 text-xs text-slate-300">{item.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function QuantumIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-navy to-navy p-6 text-white ${className}`}>
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
      
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-400/30">
            <Radio size={14} className="animate-pulse" /> South African High-Roof Quantum
          </span>
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={14} /> Roadworthy Certified
          </span>
        </div>

        <div className="my-8 flex justify-center">
          <svg viewBox="0 0 600 240" className="w-full max-w-lg drop-shadow-[0_15px_25px_rgba(253,184,19,0.25)]">
            {/* Soft Shadow */}
            <ellipse cx="300" cy="215" rx="240" ry="12" fill="#000000" opacity="0.4" />
            
            {/* Bus Body High Roof */}
            <path
              d="M80 160 V95 C80 75 95 62 120 58 L190 48 C210 44 235 42 270 42 H490 C530 42 555 64 560 98 L565 160 Z"
              fill="#FDB813"
              stroke="#0D2240"
              strokeWidth="4"
            />
            {/* Lower Skirt Stripe */}
            <path d="M80 160 H565 V175 C565 180 560 185 555 185 H90 C85 185 80 180 80 175 Z" fill="#0D2240" />

            {/* Front & Side Windows */}
            <path d="M125 64 L185 56 C200 54 210 54 225 54 V108 H115 C115 90 120 75 125 64 Z" fill="#0D2240" />
            <rect x="235" y="54" width="95" height="54" rx="4" fill="#0D2240" />
            <rect x="340" y="54" width="95" height="54" rx="4" fill="#0D2240" />
            <rect x="445" y="54" width="105" height="54" rx="4" fill="#0D2240" />
            
            {/* Window Glass Highlights */}
            <path d="M135 68 L175 62 V100 H125 Z" fill="#1e3a5f" opacity="0.6" />
            <rect x="242" y="60" width="80" height="42" rx="2" fill="#1e3a5f" opacity="0.6" />
            <rect x="347" y="60" width="80" height="42" rx="2" fill="#1e3a5f" opacity="0.6" />
            <rect x="452" y="60" width="90" height="42" rx="2" fill="#1e3a5f" opacity="0.6" />

            {/* Side Branding Vinyl Stripe */}
            <path d="M90 125 H555" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            <path d="M90 135 H555" stroke="#007A3D" strokeWidth="4" strokeLinecap="round" />

            {/* School Transport Decal */}
            <rect x="250" y="142" width="220" height="18" rx="4" fill="#0D2240" />
            <text x="360" y="155" fill="#FDB813" fontSize="10" fontWeight="900" textAnchor="middle" letterSpacing="2">
              SKHUMBUZO SITHOLE TRANSPORT
            </text>

            {/* Lights */}
            <rect x="80" y="130" width="12" height="18" rx="4" fill="#FFFFFF" stroke="#0D2240" strokeWidth="2" />
            <circle cx="86" cy="139" r="4" fill="#FEF08A" />
            <rect x="555" y="130" width="10" height="18" rx="3" fill="#DC2626" />

            {/* Wheels & Rims */}
            {/* Front Wheel */}
            <circle cx="170" cy="185" r="32" fill="#111827" stroke="#374151" strokeWidth="4" />
            <circle cx="170" cy="185" r="18" fill="#D1D5DB" />
            <circle cx="170" cy="185" r="6" fill="#FDB813" />
            
            {/* Rear Wheel */}
            <circle cx="475" cy="185" r="32" fill="#111827" stroke="#374151" strokeWidth="4" />
            <circle cx="475" cy="185" r="18" fill="#D1D5DB" />
            <circle cx="475" cy="185" r="6" fill="#FDB813" />
          </svg>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-300">
          <span>Standard 16-Seater Spec</span>
          <span className="font-semibold text-amber-400">“...Safe Journeys, Brighter Futures”</span>
          <span>Johannesburg & Regional Routes</span>
        </div>
      </div>
    </div>
  )
}
