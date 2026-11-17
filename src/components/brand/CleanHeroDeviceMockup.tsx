import { Bus } from "lucide-react"

export function CleanHeroDeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Luxury gold ambient glow behind devices */}
      <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#D4AF37]/20 via-[#F5C542]/15 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Floating Live Telemetry Badge Pill Top Left */}
      <div className="absolute -top-4 -left-3 sm:-left-6 z-20 flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#141419]/90 px-3.5 py-1.5 shadow-xl backdrop-blur-md animate-float">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-bold text-white">Quantum #04: <span className="text-[#F5C542]">38 km/h</span></span>
      </div>

      {/* Floating Guardian Check-in Badge Bottom Left */}
      <div className="absolute -bottom-5 left-4 sm:left-8 z-20 flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-[#121216]/95 px-3.5 py-2 shadow-2xl backdrop-blur-md">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          ✓
        </div>
        <div>
          <div className="text-[11px] font-extrabold text-white">Thandiwe Sithole</div>
          <div className="text-[9px] text-emerald-400 font-semibold">Boarded Safely · 07:40 AM</div>
        </div>
      </div>

      {/* Subtle '+' deco marks in metallic gold */}
      <div className="absolute -top-8 right-12 text-[#D4AF37]/60 text-2xl font-light select-none">
        +
      </div>
      <div className="absolute -bottom-8 right-24 text-[#D4AF37]/40 text-2xl font-light select-none">
        +
      </div>

      <div className="relative flex items-center justify-center">
        {/* Main Tablet / Desktop Window in Sleek Obsidian Black & Gold */}
        <div className="w-[90%] sm:w-[86%] overflow-hidden rounded-2xl bg-[#121216] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9)] border border-[#262630] ring-1 ring-[#D4AF37]/30">
          {/* Window Title bar */}
          <div className="flex h-9 items-center justify-between border-b border-[#262630] bg-[#18181F] px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3F3F4E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#3F3F4E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#3F3F4E]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-16 rounded bg-[#262630]" />
              <div className="h-2 w-10 rounded bg-[#262630]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-[#D4AF37]/30" />
            </div>
          </div>

          {/* Window Body: Map & Sidebar */}
          <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[170px_1fr] h-[280px] sm:h-[320px]">
            {/* Manifest Sidebar */}
            <div className="border-r border-[#262630] bg-[#141419] p-3 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-white">Route 3 (AM Run)</div>
                <div className="text-[10px] text-[#D4AF37]">Driver: Sipho M.</div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-300 bg-[#1A1A22] p-1.5 rounded border border-[#262630]">
                    <span className="h-2 w-2 rounded-full bg-[#F5C542]" />
                    <span className="truncate font-medium">171 N. Main St</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-300 bg-[#1A1A22] p-1.5 rounded border border-[#262630]">
                    <span className="h-2 w-2 rounded-full bg-[#F5C542]" />
                    <span className="truncate font-medium">Rosebank Gate</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-300 bg-[#1A1A22] p-1.5 rounded border border-[#262630]">
                    <span className="h-2 w-2 rounded-full bg-[#F5C542]" />
                    <span className="truncate font-medium">Northcliff View</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-300 bg-[#1A1A22] p-1.5 rounded border border-[#262630]">
                    <span className="h-2 w-2 rounded-full bg-[#F5C542]" />
                    <span className="truncate font-medium">Horizon Crest</span>
                  </div>
                </div>
              </div>

              <div className="rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-1.5 text-center text-[10px] font-bold text-[#F5C542]">
                16 / 16 Boarded
              </div>
            </div>

            {/* Vector Dark Map with Gold Route & Stop Pin Clusters */}
            <div className="relative bg-[#0E0E12] overflow-hidden p-3">
              <svg className="absolute inset-0 h-full w-full">
                {/* Secondary Grid Lines */}
                <path d="M0 60 H400 M0 140 H400 M0 220 H400" stroke="#1F1F27" strokeWidth="1.5" />
                <path d="M80 0 V320 M180 0 V320 M280 0 V320" stroke="#1F1F27" strokeWidth="1.5" />
                {/* Gold Route Line with Glow */}
                <path
                  d="M40 260 C 90 220, 140 180, 160 140 S 210 90, 260 50"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M160 140 C 200 170, 240 200, 290 210"
                  fill="none"
                  stroke="#5A4A1C"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Numbered Gold Stop Badges */}
              <div className="absolute bottom-16 left-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#18181F] border-2 border-[#D4AF37] text-[9px] font-bold text-[#F5C542] shadow-xs">
                1
              </div>
              <div className="absolute bottom-28 left-24 flex h-5 w-5 items-center justify-center rounded-full bg-[#18181F] border-2 border-[#D4AF37] text-[9px] font-bold text-[#F5C542] shadow-xs">
                2
              </div>
              <div className="absolute top-28 left-36 flex h-5 w-5 items-center justify-center rounded-full bg-[#18181F] border-2 border-[#D4AF37] text-[9px] font-bold text-[#F5C542] shadow-xs">
                3
              </div>
              <div className="absolute top-16 right-20 flex h-5 w-5 items-center justify-center rounded-full bg-[#18181F] border-2 border-[#D4AF37] text-[9px] font-bold text-[#F5C542] shadow-xs">
                4
              </div>

              {/* Moving Bus Pin in Gold */}
              <div className="absolute top-24 left-32 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#F5C542] to-[#AA820A] text-[#0B0B0E] shadow-[0_0_15px_rgba(212,175,55,0.6)] ring-2 ring-[#0E0E12]">
                  <Bus size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Mobile Phone in Black & Gold */}
        <div className="absolute -right-2 sm:-right-4 bottom-2 sm:-bottom-4 w-[165px] sm:w-[195px] overflow-hidden rounded-[28px] border-[5px] border-[#262630] bg-[#121216] shadow-[0_30px_70px_rgba(0,0,0,0.9)] ring-1 ring-[#D4AF37]/40 animate-float" style={{ animationDelay: "1.5s" }}>
          {/* Phone Speaker Notch */}
          <div className="flex h-5 items-center justify-center bg-[#18181F]">
            <div className="h-1 w-10 rounded-full bg-[#3F3F4E]" />
          </div>

          {/* App Header */}
          <div className="border-b border-[#262630] p-2.5 text-center bg-[#141419]">
            <div className="text-[10px] font-bold text-white">Route 3 Live</div>
            <div className="text-[8px] text-[#D4AF37]">Quantum #04 · On Duty</div>
          </div>

          {/* Card List in phone */}
          <div className="p-2 space-y-2 bg-[#0E0E12]">
            <div className="rounded-lg bg-[#18181F] p-2 border border-[#262630]">
              <div className="text-[9px] font-bold text-white">Morning 1</div>
              <div className="text-[8px] text-slate-400">16 Learners · 07:15 AM</div>
              <div className="mt-1 flex items-center justify-between">
                <span className="rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-1.5 py-0.5 text-[7px] font-bold text-[#F5C542]">
                  On Route
                </span>
                <span className="text-[8px] font-bold text-[#F5C542]">Track →</span>
              </div>
            </div>

            <div className="rounded-lg bg-[#18181F] p-2 border border-[#262630]">
              <div className="text-[9px] font-bold text-white">Afternoon 1</div>
              <div className="text-[8px] text-slate-400">16 Learners · 14:00 PM</div>
              <div className="mt-1 flex items-center justify-between">
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[7px] font-bold text-slate-400">
                  Scheduled
                </span>
              </div>
            </div>
          </div>

          <div className="p-2 border-t border-[#262630] bg-[#141419]">
            <div className="w-full rounded-md bg-gradient-to-r from-[#F5C542] to-[#D4AF37] py-1.5 text-center text-[9px] font-bold text-[#0B0B0E] shadow-sm">
              View Map
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
