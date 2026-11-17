import { useState } from "react"
import { ShieldCheck, Bus, CheckCircle2 } from "lucide-react"
import { useTheme } from "@/lib/theme.tsx"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"

const fleetData = [
  {
    id: "Quantum #01",
    model: "Toyota Quantum 2.8 LWB GL 16-Seater",
    plate: "GP-449-SS",
    driver: "Sipho Mthembu",
    area: "Johannesburg North & Central",
    status: "Active · On School Run",
    safetyScore: "99.4%",
    capacity: "16 Students",
    fuel: "Diesel Common Rail",
    transmission: "6-Speed Manual",
    co2: "Low Emission Euro-4",
    lastService: "12 Oct 2026",
    nextService: "12 Jan 2027",
    features: ["Dual Airbags", "ABS + Brake Assist", "Vehicle Stability Control (VSC)", "3-Point Inertia Reel Seatbelts", "Dual Emergency Exits"],
  },
  {
    id: "Quantum #02",
    model: "Toyota Quantum 2.8 High-Roof 16-Seater",
    plate: "GP-188-SS",
    driver: "David Khumalo",
    area: "Rosebank, Parktown & Saxonwold",
    status: "Active · On School Run",
    safetyScore: "98.9%",
    capacity: "16 Students",
    fuel: "Diesel Common Rail",
    transmission: "6-Speed Automatic",
    co2: "Low Emission Euro-4",
    lastService: "28 Sep 2026",
    nextService: "28 Dec 2026",
    features: ["GPS Telemetry Unit", "Rear Camera Assist", "Anti-Lock Braking", "Speed Governor (Capped 80km/h)", "Child-Proof Door Locks"],
  },
  {
    id: "Quantum #03",
    model: "Toyota Quantum 2.8 High-Roof 16-Seater",
    plate: "GP-903-SS",
    driver: "Linda Ndlovu",
    area: "Soweto to Horizon Primary Link",
    status: "Active · On School Run",
    safetyScore: "99.1%",
    capacity: "16 Students",
    fuel: "Diesel Common Rail",
    transmission: "6-Speed Manual",
    co2: "Low Emission Euro-4",
    lastService: "04 Nov 2026",
    nextService: "04 Feb 2027",
    features: ["Satellite Tracking Beacon", "First Aid Kit Level 3", "2x Dry Powder Fire Extinguishers", "3-Point Seatbelts", "Emergency Glass Breaker"],
  },
  {
    id: "Quantum #04",
    model: "Toyota Quantum 2.8 LWB GL 16-Seater",
    plate: "GP-212-SS",
    driver: "Bongani Zulu",
    area: "Roodepoort West & Florida",
    status: "Standby Depot Reserved",
    safetyScore: "100%",
    capacity: "16 Students",
    fuel: "Diesel Common Rail",
    transmission: "6-Speed Automatic",
    co2: "Low Emission Euro-4",
    lastService: "10 Nov 2026",
    nextService: "10 Feb 2027",
    features: ["Dual Airbags", "Full Air-Conditioning", "Emergency Exits", "Electronic Brake Force Distribution", "Onboard Sanitizer Station"],
  },
]

export function FleetPage() {
  const { theme } = useTheme()
  const isDark = theme === "black-gold"
  const [selectedVehicle, setSelectedVehicle] = useState(fleetData[0])

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0B0B0E] text-white" : "bg-[#f8fafc] text-slate-800"}`}>
      {/* Hero Header with Background Image and Gold Accents */}
      <section className="relative overflow-hidden py-20 px-6 sm:px-8 border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/hero-quantum-bg.jpg"
            alt="Skhumbuzo Sithole Toyota Quantum fleet"
            className="w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 ${isDark ? "bg-[#0B0B0E]/90" : "bg-[#152544]/90"}`} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-4 py-1.5 text-xs font-bold text-[#F5C542]">
            <Bus size={14} className="text-[#F5C542]" />
            <span>100% Certified Toyota Quantum Minibuses</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Engineered for Safety. <br />
            <span className="bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#FDE08B] bg-clip-text text-transparent">
              Built for South African Roads.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
            Our fleet consists strictly of high-roof Toyota Quantum passenger models, rigorously inspected every 10,000 km with roadworthy certifications and active live GPS telemetry.
          </p>
        </div>
      </section>

      {/* Interactive Vehicle Showcase Grid */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start">
          
          {/* Left Column: Vehicle Selector Cards */}
          <div className="space-y-4">
            <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              Active Fleet Register
            </h3>

            {fleetData.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedVehicle.id === v.id
                    ? isDark
                      ? "bg-[#18181F] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-[1.02]"
                      : "bg-white border-blue-600 shadow-lg scale-[1.02]"
                    : isDark
                      ? "bg-[#141419] border-[#262630] hover:border-slate-600"
                      : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#F5C542] uppercase">{v.id}</span>
                    <h4 className={`text-base font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {v.plate}
                    </h4>
                  </div>
                  <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 text-xs font-bold text-[#F5C542]">
                    {v.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Driver: <strong className={isDark ? "text-white" : "text-slate-700"}>{v.driver}</strong></span>
                  <span className="text-emerald-400 font-bold">● {v.safetyScore} Safety Rating</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Specification View */}
          <div className={`p-8 rounded-3xl border shadow-xl ${
            isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"
          }`}>
            {/* Header info */}
            <div className="border-b border-white/10 pb-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  Vehicle Specifications
                </span>
                <span className="rounded-md bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  DEKRA Tested 2026
                </span>
              </div>
              <h2 className={`mt-2 text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>
                {selectedVehicle.model}
              </h2>
              <p className="mt-1 text-xs text-slate-400">Registration: <strong>{selectedVehicle.plate}</strong> · Assigned: {selectedVehicle.area}</p>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              <div className={`p-3.5 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                <div className="text-[11px] text-slate-400">Capacity</div>
                <div className="mt-1 text-sm font-bold text-[#F5C542]">{selectedVehicle.capacity}</div>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                <div className="text-[11px] text-slate-400">Fuel & Engine</div>
                <div className="mt-1 text-sm font-bold text-[#F5C542]">2.8L Turbo Diesel</div>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                <div className="text-[11px] text-slate-400">Speed Governor</div>
                <div className="mt-1 text-sm font-bold text-emerald-400">Capped 80 km/h</div>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                <div className="text-[11px] text-slate-400">Next Service</div>
                <div className="mt-1 text-sm font-bold text-slate-300">{selectedVehicle.nextService}</div>
              </div>
            </div>

            {/* Safety & Compliance Checklist */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#F5C542]" /> Standard Onboard Safety Equipment
              </h4>
              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                {selectedVehicle.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Want this vehicle assigned to your learner's school route?
              </div>
              <Button asChild className="bg-gradient-to-r from-[#F5C542] via-[#D4AF37] to-[#AA820A] text-[#0B0B0E] font-bold rounded-full text-xs">
                <Link to="/contact">Request Route Placement</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
