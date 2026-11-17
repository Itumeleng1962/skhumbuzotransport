import { useState } from "react"
import {
  Bus,
  Users,
  UserCheck,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"

export function InteractiveSystemMockup() {
  const [activeTab, setActiveTab] = useState<"admin" | "parent" | "driver">("admin")

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      {/* Switcher bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-2 backdrop-blur-xl">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("admin")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
              activeTab === "admin"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Navigation size={16} />
            <span>Admin Live Fleet Desk</span>
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
              activeTab === "parent"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <ShieldCheck size={16} />
            <span>Parent Mobile Tracker</span>
          </button>
          <button
            onClick={() => setActiveTab("driver")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
              activeTab === "driver"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Bus size={16} />
            <span>Driver On-Duty App</span>
          </button>
        </div>

        <Link
          to={`/${activeTab}`}
          className="flex items-center gap-1.5 px-3 text-xs font-semibold text-amber-400 hover:underline"
        >
          <span>Open Full Interactive Portal</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Frame Container */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-b from-[#0e213b] to-[#081527] p-4 shadow-2xl sm:p-8">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {activeTab === "admin" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Left Main Dashboard View */}
            <div className="space-y-6">
              {/* Header inside mockup */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    Dashboard Overview
                  </h3>
                  <p className="text-xs text-slate-400">
                    Real-time school transit telemetry · Greater Johannesburg Zone
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                    11 Trips In Transit
                  </span>
                </div>
              </div>

              {/* 4 Colored Stat Badges matching the image */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {/* 1: Total Vehicles */}
                <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-md">
                      <Bus size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">12</div>
                      <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wide">
                        Total Vehicles
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2: Students */}
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                      <Users size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">358</div>
                      <div className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wide">
                        Students
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3: Drivers */}
                <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-white shadow-md">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">18</div>
                      <div className="text-[11px] font-semibold text-purple-200 uppercase tracking-wide">
                        Drivers
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4: Active Trips */}
                <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-md">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">11</div>
                      <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wide">
                        Active Trips
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Map Display */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Live Fleet Map</span>
                    <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase">
                      GPS Online
                    </span>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold cursor-pointer hover:underline">
                    View Full Screen →
                  </span>
                </div>

                {/* Styled Map Graphic */}
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-[#1b2b40] border border-slate-800">
                  {/* City Grid Road Lines */}
                  <svg className="absolute inset-0 h-full w-full opacity-60">
                    <path
                      d="M20 180 Q 140 160 220 120 T 420 80 T 600 90"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="5"
                      strokeDasharray="6 4"
                    />
                    <path
                      d="M100 220 Q 220 180 340 140 T 520 190"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="4"
                    />
                    <path
                      d="M220 30 V 220"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    <path
                      d="M40 90 H 580"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* City Label Pins */}
                  <div className="absolute top-10 left-12 flex items-center gap-1 rounded bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    <MapPin size={10} className="text-amber-400" /> Roodepoort
                  </div>
                  <div className="absolute top-14 left-1/2 flex items-center gap-1 rounded bg-slate-900/80 px-2.5 py-1 text-xs font-black text-amber-400 shadow">
                    <MapPin size={12} className="text-amber-400" /> Johannesburg Central
                  </div>
                  <div className="absolute bottom-8 left-16 flex items-center gap-1 rounded bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    <MapPin size={10} className="text-amber-400" /> Soweto
                  </div>
                  <div className="absolute bottom-12 right-16 flex items-center gap-1 rounded bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                    <MapPin size={10} className="text-emerald-400" /> Sandton
                  </div>

                  {/* Pulsing Quantum Bus Markers */}
                  <div className="absolute top-24 left-1/3 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/50 ring-4 ring-amber-400/30 animate-bounce">
                      <Bus size={16} />
                    </span>
                    <span className="mt-1 rounded bg-slate-950/90 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                      Van #04 · Route A
                    </span>
                  </div>

                  <div className="absolute top-16 right-1/4 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400 text-slate-950 font-black shadow-lg shadow-sky-400/50 ring-4 ring-sky-400/30">
                      <Bus size={16} />
                    </span>
                    <span className="mt-1 rounded bg-slate-950/90 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                      Van #09 · Rosebank
                    </span>
                  </div>

                  <div className="absolute bottom-14 left-1/4 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/50 ring-4 ring-amber-400/30">
                      <Bus size={16} />
                    </span>
                    <span className="mt-1 rounded bg-slate-950/90 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                      Van #02 · Soweto Run
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Status Column: Gauge & Recent Activity */}
            <div className="space-y-6">
              {/* Circular Gauge Card matching image */}
              <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-5 text-center">
                <h4 className="text-sm font-bold text-slate-200">Trip Punctuality</h4>
                
                <div className="relative my-4 flex items-center justify-center">
                  {/* SVG Gauge */}
                  <svg className="h-32 w-32 -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#1e293b"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="52"
                      stroke="#10B981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray="326"
                      strokeDashoffset="88"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-white">73%</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">On Time</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left text-xs">
                  <div className="rounded-xl bg-slate-900 p-2.5 border border-emerald-500/20">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      On Time
                    </div>
                    <div className="mt-1 text-sm font-black text-white">8 / 11 Trips</div>
                  </div>
                  <div className="rounded-xl bg-slate-900 p-2.5 border border-amber-500/20">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Delayed
                    </div>
                    <div className="mt-1 text-sm font-black text-white">3 / 11 Trips</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between pb-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                    Recent Live Events
                  </h4>
                  <span className="text-[10px] text-amber-400">Live Feed</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 rounded-xl bg-slate-900/90 p-2.5 text-xs">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Learner Picked Up · Route A</p>
                      <p className="text-[11px] text-slate-400">08:15 AM · Stop #3 Northcliff</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl bg-slate-900/90 p-2.5 text-xs">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-sky-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Approaching Destination</p>
                      <p className="text-[11px] text-slate-400">08:20 AM · Rosebank Primary Gate</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 rounded-xl bg-slate-900/90 p-2.5 text-xs">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Traffic Congestion Note</p>
                      <p className="text-[11px] text-slate-400">08:22 AM · M1 South +6 min delay</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "parent" && (
          <div className="mx-auto max-w-sm rounded-3xl border-4 border-slate-700 bg-slate-950 p-4 shadow-2xl text-white">
            {/* Top Phone Header */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400">9:41</span>
              <span className="text-xs font-extrabold text-amber-400">Parent Guardian App</span>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Child Profile Card */}
            <div className="mb-4 rounded-2xl bg-gradient-to-r from-blue-900/50 to-indigo-900/40 p-4 border border-blue-500/20">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                My Children
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-black text-lg">
                  TS
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base">Thandiwe Sithole</h4>
                  <p className="text-xs text-slate-300">Grade 6 · ABC Primary School</p>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Transport Active
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Mini Tracking */}
            <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 p-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Tracking
                </span>
                <span className="rounded bg-amber-400 px-2 py-0.5 text-[10px] font-black text-slate-950">
                  Arriving in 5 min
                </span>
              </div>
              <div className="relative h-28 w-full rounded-xl bg-slate-800 overflow-hidden border border-slate-700">
                <svg className="h-full w-full opacity-60">
                  <path d="M10 80 Q 90 20 180 50 T 300 30" fill="none" stroke="#FDB813" strokeWidth="4" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-slate-950 font-black text-xs shadow-lg">
                  <Bus size={14} /> Quantum #04
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-2.5 rounded-2xl bg-slate-900/80 p-3.5 border border-slate-800">
              <div className="flex items-center gap-3 text-xs">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-white">Vehicle Departed</span>
                  <span className="block text-[10px] text-slate-400">07:25 AM</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Clock size={16} className="text-sky-400 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-white">On Route to Destination</span>
                  <span className="block text-[10px] text-slate-400">07:40 AM</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <MapPin size={16} className="text-amber-400 shrink-0" />
                <div className="flex-1">
                  <span className="font-semibold text-white">Arriving Soon at School Gate</span>
                  <span className="block text-[10px] text-amber-300">08:10 AM (Estimated)</span>
                </div>
              </div>
            </div>

            <Button asChild className="mt-4 w-full bg-blue-600 hover:bg-blue-500 font-bold text-white rounded-xl">
              <Link to="/parent">View Full Map & Camera Feed</Link>
            </Button>
          </div>
        )}

        {activeTab === "driver" && (
          <div className="mx-auto max-w-sm rounded-3xl border-4 border-slate-700 bg-slate-950 p-4 shadow-2xl text-white">
            {/* Driver Profile */}
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-slate-800 border-2 border-amber-400 flex items-center justify-center font-black text-amber-400 text-lg">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-white">Sipho Mthembu</h4>
                  <p className="text-xs text-slate-400">Senior Verified Driver</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-400 flex items-center gap-1 border border-emerald-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> On Duty
              </span>
            </div>

            {/* Big Action Button */}
            <Button asChild className="mb-4 h-14 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg rounded-2xl shadow-xl shadow-amber-400/20">
              <Link to="/driver">▶ Start Morning Trip</Link>
            </Button>

            {/* Quick Touch Tiles */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/driver"
                className="flex flex-col items-center justify-center rounded-2xl bg-slate-900 p-4 text-center border border-slate-800 hover:border-amber-400 transition"
              >
                <MapPin className="text-amber-400" size={24} />
                <span className="mt-2 text-xs font-bold text-white">My Routes</span>
                <span className="text-[10px] text-slate-400">2 Routes Assigned</span>
              </Link>
              <Link
                to="/driver"
                className="flex flex-col items-center justify-center rounded-2xl bg-slate-900 p-4 text-center border border-slate-800 hover:border-amber-400 transition"
              >
                <Users className="text-emerald-400" size={24} />
                <span className="mt-2 text-xs font-bold text-white">Student List</span>
                <span className="text-[10px] text-slate-400">16 Learners Onboard</span>
              </Link>
              <Link
                to="/driver"
                className="flex flex-col items-center justify-center rounded-2xl bg-slate-900 p-4 text-center border border-slate-800 hover:border-amber-400 transition"
              >
                <Clock className="text-sky-400" size={24} />
                <span className="mt-2 text-xs font-bold text-white">Trip History</span>
                <span className="text-[10px] text-slate-400">142 Completed</span>
              </Link>
              <Link
                to="/driver"
                className="flex flex-col items-center justify-center rounded-2xl bg-slate-900 p-4 text-center border border-slate-800 hover:border-amber-400 transition"
              >
                <UserCheck className="text-purple-400" size={24} />
                <span className="mt-2 text-xs font-bold text-white">Driver Profile</span>
                <span className="text-[10px] text-slate-400">PrDP Valid 2027</span>
              </Link>
            </div>

            {/* Vehicle spec footer */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-900/90 px-3 py-2 text-[11px] text-slate-300 border border-slate-800">
              <span>Assigned: <strong>Toyota Quantum GL</strong></span>
              <span className="text-amber-400 font-bold">Registration: GP-449-SS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
