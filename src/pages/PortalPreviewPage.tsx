import { useState } from "react"
import { Link, NavLink, useParams } from "react-router-dom"
import {
  Bus,
  Users,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Sun,
  Moon,
  Plus,
  Phone,
  Bell,
  Download,
  Headphones,
  AlertTriangle,
  Play,
  Clock,
  Wrench,
  FileText,
  MapPin,
  Send,
  Check,
  X,
} from "lucide-react"
import { portalSections, type PortalRole } from "@/content/site.ts"
import { Button } from "@/components/ui/button.tsx"
import { useTheme } from "@/lib/theme.tsx"
import { LiveTransitMap } from "@/components/map/LiveTransitMap.tsx"

// Sample GPS coordinates
const sampleRouteCoords: [number, number][] = [
  [-26.131, 27.978], // Northcliff
  [-26.142, 28.005], // Linden
  [-26.146, 28.032], // Rosebank
  [-26.155, 28.041], // ABC Primary destination
]

const sampleStops = [
  { name: "171 N. Main St (Northcliff)", lat: -26.131, lng: 27.978, time: "07:25 AM", status: "Boarded" },
  { name: "Corner 4th & Linden Ave", lat: -26.142, lng: 28.005, time: "07:38 AM", status: "Boarded" },
  { name: "Rosebank Gate Stop", lat: -26.146, lng: 28.032, time: "07:50 AM", status: "Approaching" },
  { name: "ABC Primary School Main Gate", lat: -26.155, lng: 28.041, time: "08:10 AM", status: "Destination" },
]

const sampleVehicles = [
  { id: "Q04", name: "Quantum #04 (GP-449-SS)", lat: -26.144, lng: 28.025, speed: "38 km/h", driver: "Sipho Mthembu", status: "En Route to Stop #3" },
  { id: "Q09", name: "Quantum #09 (GP-188-SS)", lat: -26.162, lng: 28.045, speed: "42 km/h", driver: "David Khumalo", status: "En Route to School" },
  { id: "Q02", name: "Quantum #02 (GP-903-SS)", lat: -26.212, lng: 27.905, speed: "35 km/h", driver: "Linda Ndlovu", status: "Soweto West Loop" },
  { id: "Q07", name: "Quantum #07 (GP-212-SS)", lat: -26.169, lng: 27.915, speed: "0 km/h", driver: "Bongani Zulu", status: "Standby Depot" },
]

export function PortalPreviewPage({ role }: { role: PortalRole }) {
  const params = useParams()
  const sectionSlug = params["*"] ?? ""
  const sections = portalSections[role]
  const active = sections.find((item) => item.slug === sectionSlug) ?? sections[0]
  const base = `/${role}`
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "black-gold"

  // Driver Interactive State
  const [tripActive, setTripActive] = useState(false)
  const [checkedInLearners, setCheckedInLearners] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  })

  // Settings mock state
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [appAlerts, setAppAlerts] = useState(true)
  const [geoTracking, setGeoTracking] = useState(true)

  // Report filter state
  const [reportPeriod, setReportPeriod] = useState<"today" | "week" | "month">("today")

  // Request form state
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  // Delay form state
  const [delaySubmitted, setDelaySubmitted] = useState(false)

  // Incident form state
  const [incidentSubmitted, setIncidentSubmitted] = useState(false)

  // Interactive Students List state
  const [studentsList, setStudentsList] = useState([
    { name: "Thandiwe Sithole", school: "Grade 6 · ABC Primary", route: "Route 3 (AM)", stop: "171 N. Main St", guardian: "Itumeleng (082 123 4567)", status: "Boarded (07:40 AM)" },
    { name: "Kagiso Dlamini", school: "Grade 5 · ABC Primary", route: "Route 3 (AM)", stop: "Corner Rosebank Gate", guardian: "Busisiwe (083 987 6543)", status: "Boarded (07:45 AM)" },
    { name: "Sibusiso Zulu", school: "Grade 7 · Horizon High", route: "Route 1 (Northcliff)", stop: "Northcliff Water Tower", guardian: "Mandla (084 456 7890)", status: "In Transit" },
    { name: "Nomsa Khumalo", school: "Grade 4 · Parkview Primary", route: "Route 5 (Soweto)", stop: "Horizon Corner", guardian: "Phindile (082 890 1234)", status: "Boarded (07:30 AM)" },
    { name: "Lethabo Mokoena", school: "Grade 6 · Rosebank Catholic", route: "Route 2 (Westbury)", stop: "Westbury Library Curb", guardian: "Tebogo (081 234 5678)", status: "In Transit" },
    { name: "Ayanda Nkosi", school: "Grade 3 · ABC Primary", route: "Route 3 (AM)", stop: "4th Ave & Main St", guardian: "Zanele (083 345 6789)", status: "Boarded (07:42 AM)" },
    { name: "Junior Mthembu", school: "Grade 5 · Horizon Primary", route: "Route 3 (AM)", stop: "Linden Park Gate", guardian: "Gladys (084 567 8901)", status: "Boarded (07:48 AM)" },
  ])

  // Add Student Modal State
  const [showAddStudentModal, setShowAddStudentModal] = useState(false)
  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    school: "Grade 5 · ABC Primary",
    route: "Route 3 (AM)",
    stop: "Rosebank Gate",
    guardian: "",
  })

  // Add Guardian Modal State
  const [showAddGuardianModal, setShowAddGuardianModal] = useState(false)
  const [guardiansList, setGuardiansList] = useState([
    { name: "Itumeleng Sithole", phone: "082 123 4567", email: "itumeleng.s@gmail.com", children: "Thandiwe Sithole (Gr 6)", address: "171 N. Main St, Northcliff", status: "Verified Household" },
    { name: "Busisiwe Dlamini", phone: "083 987 6543", email: "busi.dlamini@yahoo.co.za", children: "Kagiso Dlamini (Gr 5)", address: "44 Oxford Rd, Rosebank", status: "Verified Household" },
    { name: "Mandla Zulu", phone: "084 456 7890", email: "mandla.zulu@outlook.com", children: "Sibusiso Zulu (Gr 7)", address: "12 Water Tower Rd, Northcliff", status: "Verified Household" },
    { name: "Phindile Khumalo", phone: "082 890 1234", email: "p.khumalo@gmail.com", children: "Nomsa Khumalo (Gr 4)", address: "55 Vilakazi St, Soweto", status: "Verified Household" },
    { name: "Tebogo Mokoena", phone: "081 234 5678", email: "tebogo.m@workmail.co.za", children: "Lethabo Mokoena (Gr 6)", address: "88 Portland Ave, Westbury", status: "Verified Household" },
    { name: "Zanele Nkosi", phone: "083 345 6789", email: "zanele.n@gmail.com", children: "Ayanda Nkosi (Gr 3)", address: "19 4th Ave, Linden", status: "Verified Household" },
  ])
  const [newGuardianForm, setNewGuardianForm] = useState({
    name: "",
    phone: "",
    email: "",
    children: "",
    address: "",
  })

  // Broadcast Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false)
  const [broadcastSent, setBroadcastSent] = useState(false)
  const [broadcastForm, setBroadcastForm] = useState({ title: "", recipient: "All Enrolled Guardians", message: "" })

  // Schedule Run Modal State
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [tripsList, setTripsList] = useState([
    { run: "Morning Collection", code: "RT-01", driver: "Sipho Mthembu", van: "Quantum #04", time: "07:15 AM - 08:15 AM", status: "In Transit" },
    { run: "Morning Collection", code: "RT-02", driver: "David Khumalo", van: "Quantum #09", time: "07:20 AM - 08:20 AM", status: "In Transit" },
    { run: "Morning Collection", code: "RT-03", driver: "Linda Ndlovu", van: "Quantum #02", time: "07:00 AM - 08:10 AM", status: "Delayed (+5m)" },
    { run: "Afternoon Return Run", code: "RT-01", driver: "Sipho Mthembu", van: "Quantum #04", time: "14:00 PM - 15:30 PM", status: "Queued" },
    { run: "Afternoon Return Run", code: "RT-02", driver: "David Khumalo", van: "Quantum #09", time: "14:15 PM - 15:45 PM", status: "Queued" },
    { run: "Afternoon Return Run", code: "RT-03", driver: "Linda Ndlovu", van: "Quantum #02", time: "14:00 PM - 15:30 PM", status: "Queued" },
  ])
  const [newTripForm, setNewTripForm] = useState({
    run: "Morning Collection",
    code: "RT-01",
    driver: "Sipho Mthembu",
    van: "Quantum #04",
    time: "07:00 AM - 08:00 AM",
  })

  // Add Route Modal State
  const [showAddRouteModal, setShowAddRouteModal] = useState(false)
  const [routesList, setRoutesList] = useState([
    { id: "RT-01", name: "Northcliff & Linden Corridor", stops: 4, distance: "18.4 km", estTime: "45 mins", school: "ABC Primary School", status: "Active" },
    { id: "RT-02", name: "Rosebank & Greenside Circuit", stops: 5, distance: "14.2 km", estTime: "35 mins", school: "Parkview Primary", status: "Active" },
    { id: "RT-03", name: "Soweto Express Loop", stops: 6, distance: "28.6 km", estTime: "55 mins", school: "Rosebank Catholic High", status: "Active" },
    { id: "RT-04", name: "Roodepoort Florida Line", stops: 4, distance: "21.0 km", estTime: "50 mins", school: "Horizon High School", status: "Active" },
  ])
  const [newRouteForm, setNewRouteForm] = useState({
    id: "RT-05",
    name: "",
    stops: 4,
    distance: "16 km",
    estTime: "40 mins",
    school: "ABC Primary School",
  })

  // Add Stop Modal State
  const [showAddStopModal, setShowAddStopModal] = useState(false)
  const [stopsList, setStopsList] = useState([
    { stop: "Stop 1: 171 N. Main St", zone: "Northcliff", learners: 3, time: "07:25 AM", status: "Clear Curb Area" },
    { stop: "Stop 2: Corner 4th & Linden Ave", zone: "Linden", learners: 4, time: "07:38 AM", status: "Zebra Crossing Zone" },
    { stop: "Stop 3: Rosebank Gate Stop", zone: "Rosebank", learners: 5, time: "07:50 AM", status: "Sheltered Stop" },
    { stop: "Stop 4: ABC Primary School Gate", zone: "Parktown", learners: 16, time: "08:10 AM", status: "Dedicated School Drop Zone" },
  ])
  const [newStopForm, setNewStopForm] = useState({
    stop: "",
    zone: "Rosebank",
    learners: 2,
    time: "07:35 AM",
    status: "Clear Curb Area",
  })

  // Maintenance Schedule Modal
  const [showScheduleServiceModal, setShowScheduleServiceModal] = useState(false)
  const [maintenanceList, setMaintenanceList] = useState([
    { van: "Quantum #04", plate: "GP-449-SS", last: "15 Oct 2026", next: "15 Jan 2027", tire: "85% Remaining (Good)", cert: "DEKRA Valid" },
    { van: "Quantum #09", plate: "GP-188-SS", last: "01 Nov 2026", next: "01 Feb 2027", tire: "90% Remaining (Good)", cert: "DEKRA Valid" },
    { van: "Quantum #02", plate: "GP-903-SS", last: "20 Sep 2026", next: "20 Dec 2026", tire: "70% Remaining (Check)", cert: "DEKRA Valid" },
    { van: "Quantum #07", plate: "GP-212-SS", last: "10 Nov 2026", next: "10 Feb 2027", tire: "95% Remaining (New)", cert: "DEKRA Valid" },
  ])
  const [newServiceForm, setNewServiceForm] = useState({
    van: "Quantum #04",
    plate: "GP-449-SS",
    next: "20 Jan 2027",
    tire: "New OEM Tires Installed",
  })

  // Feedback Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const toggleLearner = (idx: number) => {
    setCheckedInLearners((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? "bg-[#0B0B0E] text-slate-100" : "bg-[#f8fafc] text-slate-800"
    }`}>
      {/* Top Header */}
      <header className={`sticky top-0 z-30 border-b px-6 py-3.5 shadow-md backdrop-blur-md ${
        isDark ? "border-[#262630] bg-[#121216]/95" : "border-slate-200 bg-white/95"
      }`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/logo.png"
                alt="Skhumbuzo Sithole Transport"
                className="h-10 sm:h-11 w-auto object-contain transition group-hover:scale-105"
              />
            </Link>

            <span className={`h-4 w-px hidden sm:block ${isDark ? "bg-[#262630]" : "bg-slate-300"}`} />

            <div className="flex items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold border ${
                isDark
                  ? "bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#F5C542]"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}>
                {role === "admin" ? "Operations Console" : role === "driver" ? "Driver App" : "Parent Guardian Portal"}
              </span>
              <span className="hidden items-center gap-1.5 text-xs text-[#F5C542] font-semibold sm:inline-flex">
                <span className="h-2 w-2 rounded-full bg-[#F5C542] animate-pulse" />
                Live Network Active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Changer */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition shadow-xs ${
                isDark
                  ? "border-[#D4AF37]/40 bg-[#18181F] text-[#F5C542] hover:bg-[#D4AF37]/10"
                  : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isDark ? <Sun size={14} className="text-[#F5C542]" /> : <Moon size={14} className="text-blue-600" />}
              <span className="hidden sm:inline">{isDark ? "Gold" : "Light"}</span>
            </button>

            {/* Quick Switcher */}
            <div className={`flex items-center rounded-xl p-1 text-xs font-medium border ${
              isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-100 border-slate-200"
            }`}>
              <Link
                to="/admin"
                className={`rounded-lg px-3 py-1.5 transition ${
                  role === "admin"
                    ? "bg-gradient-to-r from-[#F5C542] to-[#D4AF37] text-[#0B0B0E] font-bold shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Admin
              </Link>
              <Link
                to="/parent"
                className={`rounded-lg px-3 py-1.5 transition ${
                  role === "parent"
                    ? "bg-gradient-to-r from-[#F5C542] to-[#D4AF37] text-[#0B0B0E] font-bold shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Parents
              </Link>
              <Link
                to="/driver"
                className={`rounded-lg px-3 py-1.5 transition ${
                  role === "driver"
                    ? "bg-gradient-to-r from-[#F5C542] to-[#D4AF37] text-[#0B0B0E] font-bold shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Drivers
              </Link>
            </div>

            <Link
              to="/"
              className={`text-xs font-semibold hidden md:block ${
                isDark ? "text-slate-400 hover:text-[#F5C542]" : "text-slate-500 hover:text-blue-600"
              }`}
            >
              Exit to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:grid md:grid-cols-[240px_1fr]">
        {/* Sidebar Nav */}
        <aside className={`border-b p-4 md:min-h-[calc(100vh-65px)] md:border-r md:border-b-0 ${
          isDark ? "border-[#262630] bg-[#121216]" : "border-slate-200 bg-white"
        }`}>
          <div className="mb-3 hidden text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] md:block">
            {role.toUpperCase()} PORTAL
          </div>
          <nav className="flex flex-row overflow-x-auto gap-1 pb-2 md:flex-col md:overflow-visible md:pb-0">
            {sections.map((item) => (
              <NavLink
                key={item.label}
                to={item.slug ? `${base}/${item.slug}` : base}
                end={item.slug === ""}
                className={({ isActive }) =>
                  `flex shrink-0 items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? isDark
                        ? "bg-[#D4AF37] text-[#0B0B0E] shadow-md shadow-[#D4AF37]/20"
                        : "bg-blue-600 text-white shadow-xs"
                      : isDark
                        ? "text-slate-300 hover:bg-[#18181F] hover:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <span>{item.label}</span>
                <ChevronRight size={14} className="hidden opacity-50 md:block" />
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Dynamic Main Body Content */}
        <main className={`flex-1 p-6 lg:p-8 ${isDark ? "bg-[#0B0B0E]" : "bg-[#f8fafc]"}`}>
          {/* Header Title */}
          <div className={`mb-6 flex flex-wrap items-center justify-between gap-4 border-b pb-5 ${
            isDark ? "border-[#262630]" : "border-slate-200"
          }`}>
            <div>
              <div className="text-xs font-bold text-[#F5C542] uppercase tracking-wider">
                {role} Console · {active.label}
              </div>
              <h1 className={`mt-1 text-2xl font-black sm:text-3xl ${isDark ? "text-white" : "text-slate-900"}`}>
                {active.label}
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-xl">{active.summary}</p>
            </div>
            <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border ${
              isDark ? "bg-[#18181F] border-[#262630] text-[#F5C542]" : "bg-white border-slate-200 text-slate-700"
            }`}>
              School Term 4 · Active
            </span>
          </div>

          {/* 
            ================================================================
            1. LIVE FLEET MAP (/admin/fleet-map, /parent/tracking)
            ================================================================
          */}
          {(sectionSlug === "fleet-map" || sectionSlug === "tracking") && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Live Telemetry Fleet Tracking Radar
                    </h3>
                    <p className="text-xs text-slate-400">All 12 Authorized Toyota Quantum Minibuses Across Johannesburg</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400">11 Active Feeds Online</span>
                  </div>
                </div>

                <LiveTransitMap
                  center={[-26.155, 28.02]}
                  zoom={12}
                  routeCoordinates={sampleRouteCoords}
                  stops={sampleStops}
                  vehicles={sampleVehicles}
                  height="460px"
                />

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400 text-[10px]">Active Van 1:</span>
                    <div className="font-bold text-white">Quantum #04 (GP-449-SS)</div>
                    <div className="text-[#F5C542]">Speed: 38 km/h · On Route</div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400 text-[10px]">Active Van 2:</span>
                    <div className="font-bold text-white">Quantum #09 (GP-188-SS)</div>
                    <div className="text-[#F5C542]">Speed: 42 km/h · On Route</div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400 text-[10px]">Active Van 3:</span>
                    <div className="font-bold text-white">Quantum #02 (GP-903-SS)</div>
                    <div className="text-amber-400">Speed: 35 km/h · +5m Delay</div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400 text-[10px]">Depot Standby:</span>
                    <div className="font-bold text-white">Quantum #07 (GP-212-SS)</div>
                    <div className="text-slate-400">Speed: 0 km/h · Reserved</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            2. STUDENTS / CHILDREN / LEARNER LIST
            ================================================================
          */}
          {(sectionSlug === "students" || sectionSlug === "children" || sectionSlug === "learners") && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      {role === "driver" ? "My Assigned Trip Learners" : "Enrolled Learner Directory"}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {role === "driver" ? "16 Learners Allocated to Morning Route 3" : "Total 358 Enrolled Learners Across Gauteng"}
                    </p>
                  </div>
                  {role === "admin" && (
                    <Button
                      onClick={() => setShowAddStudentModal(true)}
                      size="sm"
                      className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                    >
                      <Plus size={14} className="mr-1" /> Add New Student
                    </Button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-slate-400 ${isDark ? "border-[#262630]" : "border-slate-200"}`}>
                        <th className="pb-3 font-semibold">Student Name</th>
                        <th className="pb-3 font-semibold">Grade & School</th>
                        <th className="pb-3 font-semibold">Assigned Route</th>
                        <th className="pb-3 font-semibold">Pickup Point</th>
                        <th className="pb-3 font-semibold">Guardian Contact</th>
                        <th className="pb-3 font-semibold">Today's Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-[#262630]" : "divide-slate-100"}`}>
                      {studentsList.map((s, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition">
                          <td className={`py-3.5 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{s.name}</td>
                          <td className="py-3.5 text-slate-400">{s.school}</td>
                          <td className="py-3.5 text-[#F5C542] font-semibold">{s.route}</td>
                          <td className="py-3.5 text-slate-300">{s.stop}</td>
                          <td className="py-3.5 text-slate-400">{s.guardian}</td>
                          <td className="py-3.5">
                            <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 font-bold text-[#F5C542]">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            PARENTS DIRECTORY (/admin/parents)
            ================================================================
          */}
          {sectionSlug === "parents" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Registered Guardian Directory
                    </h3>
                    <p className="text-xs text-slate-400">POPIA-verified parent accounts, contact numbers and linked students</p>
                  </div>
                  <Button
                    onClick={() => setShowAddGuardianModal(true)}
                    size="sm"
                    className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <Plus size={14} className="mr-1" /> Add Guardian
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {guardiansList.map((p, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="font-bold text-sm text-white">{p.name}</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">{p.status}</span>
                      </div>
                      <div className="mt-2 space-y-1 text-xs text-slate-400">
                        <div><strong className="text-slate-300">Learner:</strong> <span className="text-[#F5C542]">{p.children}</span></div>
                        <div><strong className="text-slate-300">Phone:</strong> {p.phone}</div>
                        <div><strong className="text-slate-300">Email:</strong> {p.email}</div>
                        <div><strong className="text-slate-300">Address:</strong> {p.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            3. DRIVERS DIRECTORY (/admin/drivers, /parent/driver)
            ================================================================
          */}
          {(sectionSlug === "drivers" || (role === "parent" && sectionSlug === "driver")) && (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Sipho Mthembu", exp: "8 Years Exp", vehicle: "Quantum #04 (GP-449-SS)", prdp: "Valid Dec 2027", phone: "082 555 4912", rating: "5.0 ★", area: "Northcliff & Rosebank" },
                  { name: "David Khumalo", exp: "6 Years Exp", vehicle: "Quantum #09 (GP-188-SS)", prdp: "Valid Oct 2027", phone: "083 444 8923", rating: "4.9 ★", area: "Parkview & Greenside" },
                  { name: "Linda Ndlovu", exp: "10 Years Exp", vehicle: "Quantum #02 (GP-903-SS)", prdp: "Valid Jan 2028", phone: "084 333 1184", rating: "5.0 ★", area: "Soweto West Circuit" },
                  { name: "Bongani Zulu", exp: "5 Years Exp", vehicle: "Quantum #07 (GP-212-SS)", prdp: "Valid Mar 2028", phone: "082 111 6723", rating: "4.8 ★", area: "Roodepoort Florida" },
                  { name: "Mandla Sibiya", exp: "7 Years Exp", vehicle: "Quantum #11 (GP-774-SS)", prdp: "Valid Jun 2027", phone: "083 777 3412", rating: "4.9 ★", area: "Randburg Central" },
                  { name: "Tshepo Radebe", exp: "9 Years Exp", vehicle: "Quantum #14 (GP-331-SS)", prdp: "Valid Nov 2027", phone: "082 999 1234", rating: "5.0 ★", area: "Westbury & Newclare" },
                ].map((d, i) => (
                  <div key={i} className={`rounded-2xl border p-5 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                    <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#F5C542] to-[#D4AF37] text-[#0B0B0E] font-black flex items-center justify-center text-base">
                        {d.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{d.name}</h4>
                        <p className="text-xs text-[#F5C542] font-semibold">{d.exp} · {d.rating}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Assigned Vehicle:</span> <strong className="text-white">{d.vehicle}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Operating Zone:</span> <span className="text-slate-300">{d.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PrDP Certification:</span> <span className="text-emerald-400 font-bold">{d.prdp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Direct Contact:</span> <span className="text-[#F5C542]">{d.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 
            ================================================================
            4. VEHICLES REGISTER
            ================================================================
          */}
          {(sectionSlug === "vehicles" || (role !== "admin" && sectionSlug === "vehicle")) && (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { id: "Quantum #04", plate: "GP-449-SS", driver: "Sipho Mthembu", seats: "16 / 16", status: "Active On Route", odo: "84,200 km", fuel: "85% Full", check: "DEKRA Valid 2027" },
                  { id: "Quantum #09", plate: "GP-188-SS", driver: "David Khumalo", seats: "15 / 16", status: "Active On Route", odo: "72,110 km", fuel: "90% Full", check: "DEKRA Valid 2027" },
                  { id: "Quantum #02", plate: "GP-903-SS", driver: "Linda Ndlovu", seats: "14 / 16", status: "Active (+5m Delay)", odo: "91,450 km", fuel: "75% Full", check: "DEKRA Valid 2027" },
                  { id: "Quantum #07", plate: "GP-212-SS", driver: "Bongani Zulu", seats: "16 / 16", status: "Standby Depot", odo: "65,300 km", fuel: "100% Full", check: "DEKRA Valid 2027" },
                  { id: "Quantum #11", plate: "GP-774-SS", driver: "Mandla Sibiya", seats: "16 / 16", status: "Active On Route", odo: "54,800 km", fuel: "80% Full", check: "DEKRA Valid 2027" },
                  { id: "Quantum #14", plate: "GP-331-SS", driver: "Tshepo Radebe", seats: "16 / 16", status: "Standby Depot", odo: "48,200 km", fuel: "95% Full", check: "DEKRA Valid 2027" },
                ].map((v, i) => (
                  <div key={i} className={`rounded-2xl border p-5 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Bus size={18} className="text-[#F5C542]" />
                        <h4 className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{v.id}</h4>
                      </div>
                      <span className="rounded-full bg-[#D4AF37]/20 px-2 py-0.5 text-[10px] font-bold text-[#F5C542]">
                        {v.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Plate Registration:</span> <strong className="text-white">{v.plate}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver in Charge:</span> <strong className="text-[#F5C542]">{v.driver}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Seating Capacity:</span> <span>{v.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Level:</span> <span className="text-emerald-400 font-bold">{v.fuel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roadworthy Cert:</span> <span className="text-slate-300">{v.check}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 
            ================================================================
            ROUTES (DISTINCT FROM TRIPS) (/admin/routes, /driver/routes)
            ================================================================
          */}
          {sectionSlug === "routes" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Registered Route Corridors & Stops
                    </h3>
                    <p className="text-xs text-slate-400">Fixed transit pathways connecting residential areas to school campuses</p>
                  </div>
                  {role === "admin" && (
                    <Button
                      onClick={() => setShowAddRouteModal(true)}
                      size="sm"
                      className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                    >
                      <Plus size={14} className="mr-1" /> Add New Route
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {routesList.map((r, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-[#D4AF37]/20 text-[#F5C542] px-2 py-0.5 rounded">
                            {r.id}
                          </span>
                          <h4 className="font-bold text-white text-sm">{r.name}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Destination: <strong className="text-slate-200">{r.school}</strong> · {r.stops} Stops · {r.distance} (~{r.estTime})
                        </p>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-3 py-1 text-xs font-bold self-start md:self-center">
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            STOPS (/admin/stops)
            ================================================================
          */}
          {sectionSlug === "stops" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Designated Learner Pickup & Drop-off Stops
                    </h3>
                    <p className="text-xs text-slate-400">Safe, pre-approved roadside curb checkpoints across routes</p>
                  </div>
                  <Button
                    onClick={() => setShowAddStopModal(true)}
                    size="sm"
                    className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <Plus size={14} className="mr-1" /> Add Stop
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {stopsList.map((s, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between ${
                      isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                          <MapPin size={14} className="text-[#F5C542]" />
                          {s.stop}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Zone: {s.zone} · {s.learners} Assigned Learners · Scheduled {s.time}
                        </div>
                      </div>
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold">
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            SCHEDULED TRIPS (DISTINCT FROM ROUTES) (/admin/trips, /driver/trips)
            ================================================================
          */}
          {sectionSlug === "trips" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Daily Trip Run Manifest & Driver Dispatch
                    </h3>
                    <p className="text-xs text-slate-400">Scheduled morning collections and afternoon return journeys</p>
                  </div>
                  {role === "admin" && (
                    <Button
                      onClick={() => setShowScheduleModal(true)}
                      size="sm"
                      className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                    >
                      <Plus size={14} className="mr-1" /> Schedule Run
                    </Button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-slate-400 ${isDark ? "border-[#262630]" : "border-slate-200"}`}>
                        <th className="pb-3 font-semibold">Run Type</th>
                        <th className="pb-3 font-semibold">Route Code</th>
                        <th className="pb-3 font-semibold">Driver in Charge</th>
                        <th className="pb-3 font-semibold">Assigned Quantum</th>
                        <th className="pb-3 font-semibold">Departure Time</th>
                        <th className="pb-3 font-semibold">Trip Status</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-[#262630]" : "divide-slate-100"}`}>
                      {tripsList.map((t, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition">
                          <td className="py-3 font-bold text-white">{t.run}</td>
                          <td className="py-3 text-[#F5C542] font-semibold">{t.code}</td>
                          <td className="py-3 text-slate-300">{t.driver}</td>
                          <td className="py-3 text-slate-400">{t.van}</td>
                          <td className="py-3 text-slate-400">{t.time}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                              t.status === "In Transit"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : t.status.includes("Delayed")
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-slate-700 text-slate-300"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            ACTIVE DRIVER TRIP (/driver/trip)
            ================================================================
          */}
          {sectionSlug === "trip" && role === "driver" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Live Active Trip Execution Desk
                    </h3>
                    <p className="text-xs text-slate-400">Quantum #04 (GP-449-SS) · Morning Collection Run 3A</p>
                  </div>
                  <Button
                    onClick={() => setTripActive(!tripActive)}
                    className={`font-bold text-xs rounded-xl ${
                      tripActive ? "bg-red-600 hover:bg-red-700 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-black"
                    }`}
                  >
                    {tripActive ? "Complete & Close Trip" : "▶ Start Trip GPS Telemetry"}
                  </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Live Trip Map</h4>
                    <LiveTransitMap
                      center={[-26.146, 28.02]}
                      zoom={13}
                      routeCoordinates={sampleRouteCoords}
                      stops={sampleStops}
                      vehicles={sampleVehicles}
                      height="320px"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Passenger Tap-to-Checkin Manifest
                    </h4>
                    <div className="space-y-2">
                      {[
                        { name: "Thandiwe Sithole", stop: "Stop 1: 171 N. Main St" },
                        { name: "Kagiso Dlamini", stop: "Stop 2: Rosebank Gate" },
                        { name: "Ayanda Nkosi", stop: "Stop 2: Rosebank Gate" },
                        { name: "Junior Mthembu", stop: "Stop 3: Linden Park Gate" },
                      ].map((learner, idx) => (
                        <div
                          key={idx}
                          onClick={() => toggleLearner(idx)}
                          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                            checkedInLearners[idx]
                              ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:border-slate-500"
                          }`}
                        >
                          <div>
                            <div className="font-bold text-sm">{learner.name}</div>
                            <div className="text-xs text-slate-400">{learner.stop}</div>
                          </div>
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-1 ${
                            checkedInLearners[idx] ? "bg-emerald-500 text-black" : "bg-slate-700 text-slate-300"
                          }`}>
                            {checkedInLearners[idx] ? <><Check size={12} /> Boarded</> : "Tap to Mark"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            DRIVER DELAY REPORT (/driver/delays)
            ================================================================
          */}
          {sectionSlug === "delays" && role === "driver" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md max-w-xl ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Broadcast Traffic Delay
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Notify dispatch and linked parents immediately of traffic, roadworks, or unforeseen delays.
                </p>

                {delaySubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs">
                    ✓ Delay notification broadcast to 16 linked guardians and desk successfully.
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setDelaySubmitted(true); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Estimated Delay Duration</label>
                      <select className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                        <option>5 - 10 Minutes</option>
                        <option>10 - 20 Minutes</option>
                        <option>20+ Minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Reason for Delay</label>
                      <select className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                        <option>Heavy M1 Highway Congestion</option>
                        <option>Load-shedding Traffic Lights Out</option>
                        <option>Road Construction / Detour</option>
                        <option>Mechanical Standstill Check</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full bg-[#D4AF37] text-black font-bold text-xs rounded-xl">
                      <Send size={14} className="mr-1" /> Send Delay Broadcast
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 
            ================================================================
            DRIVER INCIDENT REPORT (/driver/incidents)
            ================================================================
          */}
          {sectionSlug === "incidents" && role === "driver" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md max-w-xl ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-amber-400" size={20} />
                  <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                    Urgent Incident Log
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Log a safety, mechanical, or passenger concern directly to the operations head.
                </p>

                {incidentSubmitted ? (
                  <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs">
                    ✓ Priority Incident Ticket #INC-892 dispatched to Operations Manager.
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setIncidentSubmitted(true); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Incident Classification</label>
                      <select className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                        <option>Flat Tire / Mechanical Concern</option>
                        <option>Learner Illness / Medical Need</option>
                        <option>Uncollected Learner at Curb</option>
                        <option>Minor Road Scratch / Non-Injury</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Details & Location</label>
                      <textarea
                        rows={3}
                        placeholder="Provide details of location and assistance needed..."
                        className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl">
                      <AlertTriangle size={14} className="mr-1" /> Transmit Priority Alert
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 
            ================================================================
            TRANSPORT REQUESTS (/parent/requests)
            ================================================================
          */}
          {sectionSlug === "requests" && role === "parent" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md max-w-xl ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Submit Transport Request or Route Change
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Request a new seat allocation, update pickup address, or register for holiday school camps.
                </p>

                {requestSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs">
                    ✓ Request #REQ-4421 submitted successfully. Desk review within 24 hours.
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setRequestSubmitted(true); }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Learner Name</label>
                      <input
                        type="text"
                        defaultValue="Thandiwe Sithole"
                        className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Request Type</label>
                      <select className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
                        <option>New Route Enrollment</option>
                        <option>Address Change / Pickup Adjustment</option>
                        <option>Single Day Absence Notice</option>
                        <option>After-School Sport Pickup Request</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Additional Notes</label>
                      <textarea
                        rows={3}
                        placeholder="State any specific timing or special requirements..."
                        className="w-full bg-[#18181F] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#D4AF37] text-black font-bold text-xs rounded-xl">
                      <Send size={14} className="mr-1" /> Submit Request
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* 
            ================================================================
            MAINTENANCE REGISTER (/admin/maintenance)
            ================================================================
          */}
          {sectionSlug === "maintenance" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Fleet Maintenance & Roadworthy Certification
                    </h3>
                    <p className="text-xs text-slate-400">Scheduled Toyota OEM servicing, brake inspections and tire health checks</p>
                  </div>
                  <Button
                    onClick={() => setShowScheduleServiceModal(true)}
                    size="sm"
                    className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <Wrench size={14} className="mr-1" /> Schedule Service
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-slate-400 ${isDark ? "border-[#262630]" : "border-slate-200"}`}>
                        <th className="pb-3 font-semibold">Minibus</th>
                        <th className="pb-3 font-semibold">Registration</th>
                        <th className="pb-3 font-semibold">Last Service</th>
                        <th className="pb-3 font-semibold">Next Due Date</th>
                        <th className="pb-3 font-semibold">Tire Wear Status</th>
                        <th className="pb-3 font-semibold">Safety Certificate</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-[#262630]" : "divide-slate-100"}`}>
                      {maintenanceList.map((m, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition">
                          <td className="py-3 font-bold text-white">{m.van}</td>
                          <td className="py-3 text-[#F5C542]">{m.plate}</td>
                          <td className="py-3 text-slate-400">{m.last}</td>
                          <td className="py-3 text-slate-300">{m.next}</td>
                          <td className="py-3 text-slate-300">{m.tire}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                              {m.cert}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            AUDIT LOGS (/admin/audit)
            ================================================================
          */}
          {sectionSlug === "audit" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      POPIA System Security & Compliance Audit Log
                    </h3>
                    <p className="text-xs text-slate-400">Immutable trail of administrative edits, learner profile views and driver logins</p>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-700 text-xs">
                    <Download size={14} className="mr-1" /> Export Audit Log
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { event: "Driver Auth Token Verified", user: "Sipho Mthembu (Driver App)", time: "07:05:14 AM", ip: "197.185.12.44", status: "Success" },
                    { event: "Student Route Assignment Updated", user: "Admin Desk (Skhumbuzo)", time: "06:45:22 AM", ip: "105.22.48.91", status: "Audit Pass" },
                    { event: "Guardian SMS Broadcast Dispatched", user: "Auto Dispatcher Service", time: "07:15:00 AM", ip: "Internal Job", status: "Delivered (16/16)" },
                    { event: "Vehicle Telemetry Heartbeat Sync", user: "Quantum #04 GPS Tracker", time: "07:44:02 AM", ip: "GPS Cellular APN", status: "Active" },
                  ].map((log, idx) => (
                    <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
                      isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <FileText size={14} className="text-[#F5C542]" />
                          {log.event}
                        </div>
                        <div className="text-slate-400 mt-0.5">
                          Actor: {log.user} · Host: {log.ip}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-emerald-400 font-bold">{log.status}</span>
                        <div className="text-[10px] text-slate-500">{log.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            5. ATTENDANCE (Strictly student boarding & drop-off records)
            ================================================================
          */}
          {sectionSlug === "attendance" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Daily Learner Transit Attendance Manifest
                    </h3>
                    <p className="text-xs text-slate-400">Real-time check-in marks stamped by driver mobile devices</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-lg bg-emerald-500/20 px-3 py-1 font-bold text-emerald-400">
                      342 Present Onboard
                    </span>
                    <span className="rounded-lg bg-amber-500/20 px-3 py-1 font-bold text-amber-400">
                      16 Absent / Excused
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-slate-400 ${isDark ? "border-[#262630]" : "border-slate-200"}`}>
                        <th className="pb-3 font-semibold">Learner Name</th>
                        <th className="pb-3 font-semibold">Route & Van</th>
                        <th className="pb-3 font-semibold">Morning Boarding Mark</th>
                        <th className="pb-3 font-semibold">School Drop-Off Mark</th>
                        <th className="pb-3 font-semibold">Verified By</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-[#262630]" : "divide-slate-100"}`}>
                      {[
                        { name: "Thandiwe Sithole", route: "Route 3 (Quantum #04)", board: "07:40 AM (171 N. Main St)", drop: "08:12 AM (ABC Primary)", verifier: "Driver Sipho M." },
                        { name: "Kagiso Dlamini", route: "Route 3 (Quantum #04)", board: "07:45 AM (Rosebank Gate)", drop: "08:12 AM (ABC Primary)", verifier: "Driver Sipho M." },
                        { name: "Sibusiso Zulu", route: "Route 1 (Quantum #09)", board: "07:35 AM (Northcliff)", drop: "In Transit...", verifier: "Driver David K." },
                        { name: "Nomsa Khumalo", route: "Route 5 (Quantum #02)", board: "07:30 AM (Meadowlands)", drop: "In Transit...", verifier: "Driver Linda N." },
                        { name: "Ayanda Nkosi", route: "Route 3 (Quantum #04)", board: "07:42 AM (4th Ave Main)", drop: "08:12 AM (ABC Primary)", verifier: "Driver Sipho M." },
                      ].map((a, i) => (
                        <tr key={i} className="hover:bg-white/5 transition">
                          <td className={`py-3.5 font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{a.name}</td>
                          <td className="py-3.5 text-slate-300">{a.route}</td>
                          <td className="py-3.5 font-bold text-emerald-400">✓ {a.board}</td>
                          <td className="py-3.5 text-[#F5C542]">{a.drop}</td>
                          <td className="py-3.5 text-slate-400">{a.verifier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            6. NOTIFICATIONS (Strictly messages sent to guardians & desk)
            ================================================================
          */}
          {sectionSlug === "notifications" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      SMS & Push Notification Dispatch Center
                    </h3>
                    <p className="text-xs text-slate-400">Automated alerts broadcast to guardians and drivers</p>
                  </div>
                  {role === "admin" && (
                    <Button
                      onClick={() => setShowBroadcastModal(true)}
                      size="sm"
                      className="bg-[#D4AF37] hover:bg-[#F5C542] text-[#0B0B0E] font-bold text-xs rounded-xl shadow-md transition"
                    >
                      <Bell size={14} className="mr-1" /> Broadcast Message
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Safe School Gate Arrival", recipient: "Itumeleng Sithole (Parent)", time: "08:12 AM", body: "Thandiwe Sithole has safely entered ABC Primary School premises from Quantum #04.", channel: "SMS + App Push" },
                    { title: "Learner Boarding Confirmation", recipient: "Busisiwe Dlamini (Parent)", time: "07:45 AM", body: "Kagiso Dlamini boarded Quantum #04 at Corner Rosebank Gate. Driver: Sipho Mthembu.", channel: "SMS + App Push" },
                    { title: "Traffic Alert: +6 Min Delay", recipient: "Route 5 Soweto Guardians", time: "07:38 AM", body: "Quantum #02 experiencing minor congestion on Soweto Highway. Expected delay: ~6 mins.", channel: "App Push" },
                    { title: "Morning Run Departure", recipient: "Route 3 Parents", time: "07:15 AM", body: "Quantum #04 has departed the depot and commenced morning collections.", channel: "App Push" },
                  ].map((notif, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                      isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <Bell size={14} className="text-[#F5C542]" />
                          <h4 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{notif.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{notif.body}</p>
                        <p className="text-[11px] text-slate-500 mt-1">To: <strong>{notif.recipient}</strong> · Time: {notif.time}</p>
                      </div>
                      <span className="rounded bg-[#D4AF37]/20 text-[#F5C542] px-2.5 py-1 text-[11px] font-bold self-start md:self-center">
                        {notif.channel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            7. REPORTS (Strictly analytics, stats, punctuality graphs)
            ================================================================
          */}
          {sectionSlug === "reports" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Operational Fleet & Punctuality Analytics
                    </h3>
                    <p className="text-xs text-slate-400">Quarterly performance metrics and fleet fuel telemetry</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-xl bg-slate-800 p-1 text-xs">
                      <button
                        onClick={() => setReportPeriod("today")}
                        className={`rounded-lg px-2.5 py-1 font-bold ${reportPeriod === "today" ? "bg-[#D4AF37] text-black" : "text-slate-400"}`}
                      >
                        Today
                      </button>
                      <button
                        onClick={() => setReportPeriod("week")}
                        className={`rounded-lg px-2.5 py-1 font-bold ${reportPeriod === "week" ? "bg-[#D4AF37] text-black" : "text-slate-400"}`}
                      >
                        This Week
                      </button>
                      <button
                        onClick={() => setReportPeriod("month")}
                        className={`rounded-lg px-2.5 py-1 font-bold ${reportPeriod === "month" ? "bg-[#D4AF37] text-black" : "text-slate-400"}`}
                      >
                        Term 4
                      </button>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-700 text-xs">
                      <Download size={14} className="mr-1" /> Export PDF
                    </Button>
                  </div>
                </div>

                {/* Analytical Stat Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xs text-slate-400">On-Time Average</div>
                    <div className="mt-1 text-2xl font-black text-emerald-400">97.4%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">+1.2% from last term</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xs text-slate-400">Total KM Traveled</div>
                    <div className="mt-1 text-2xl font-black text-white">4,812 km</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Across 12 routes</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xs text-slate-400">Fuel Efficiency</div>
                    <div className="mt-1 text-2xl font-black text-[#F5C542]">8.4 L/100km</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Toyota 2.8 Diesel</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <div className="text-xs text-slate-400">Safety Incidents</div>
                    <div className="mt-1 text-2xl font-black text-emerald-400">0</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Zero tolerance compliance</div>
                  </div>
                </div>

                {/* Performance Summary Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-slate-400 ${isDark ? "border-[#262630]" : "border-slate-200"}`}>
                        <th className="pb-3 font-semibold">Route Code</th>
                        <th className="pb-3 font-semibold">Vehicle</th>
                        <th className="pb-3 font-semibold">Trips Logged</th>
                        <th className="pb-3 font-semibold">Punctuality Score</th>
                        <th className="pb-3 font-semibold">Learner Occupancy</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-[#262630]" : "divide-slate-100"}`}>
                      {[
                        { code: "RT-01 (Northern Suburbs)", van: "Quantum #04", trips: 44, score: "99.2%", occ: "100% (16/16)" },
                        { code: "RT-02 (Rosebank Link)", van: "Quantum #09", trips: 42, score: "98.5%", occ: "94% (15/16)" },
                        { code: "RT-03 (Soweto Express)", van: "Quantum #02", trips: 40, score: "95.0%", occ: "88% (14/16)" },
                        { code: "RT-04 (Roodepoort Florida)", van: "Quantum #07", trips: 44, score: "100%", occ: "100% (16/16)" },
                      ].map((r, i) => (
                        <tr key={i} className="hover:bg-white/5 transition">
                          <td className="py-3 font-bold text-white">{r.code}</td>
                          <td className="py-3 text-slate-400">{r.van}</td>
                          <td className="py-3 text-slate-300">{r.trips} Trips</td>
                          <td className="py-3 font-bold text-emerald-400">{r.score}</td>
                          <td className="py-3 text-[#F5C542]">{r.occ}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            8. SETTINGS (/admin/settings)
            ================================================================
          */}
          {sectionSlug === "settings" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Desk System Configuration & Notification Toggles
                </h3>

                <div className="space-y-4 max-w-2xl">
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div>
                      <div className="font-bold text-white text-sm">Automated SMS Boarding Alerts</div>
                      <p className="text-xs text-slate-400">Send instant SMS to parent phones upon student check-in</p>
                    </div>
                    <button
                      onClick={() => setSmsAlerts(!smsAlerts)}
                      className={`h-6 w-11 rounded-full transition p-1 ${smsAlerts ? "bg-[#D4AF37]" : "bg-slate-700"}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-black transition transform ${smsAlerts ? "translate-x-5" : ""}`} />
                    </button>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div>
                      <div className="font-bold text-white text-sm">App Push Notifications</div>
                      <p className="text-xs text-slate-400">Real-time mobile updates when bus is approaching within 5 mins</p>
                    </div>
                    <button
                      onClick={() => setAppAlerts(!appAlerts)}
                      className={`h-6 w-11 rounded-full transition p-1 ${appAlerts ? "bg-[#D4AF37]" : "bg-slate-700"}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-black transition transform ${appAlerts ? "translate-x-5" : ""}`} />
                    </button>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                  }`}>
                    <div>
                      <div className="font-bold text-white text-sm">Live GPS Telemetry Broadcast</div>
                      <p className="text-xs text-slate-400">Transmit real-time Quantum coordinates to guardian portal during active trips</p>
                    </div>
                    <button
                      onClick={() => setGeoTracking(!geoTracking)}
                      className={`h-6 w-11 rounded-full transition p-1 ${geoTracking ? "bg-[#D4AF37]" : "bg-slate-700"}`}
                    >
                      <div className={`h-4 w-4 rounded-full bg-black transition transform ${geoTracking ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            9. TRIP HISTORY (/parent/history, /driver/history)
            ================================================================
          */}
          {(sectionSlug === "history") && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h3 className={`font-bold text-lg mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Completed Historical Journeys
                </h3>
                <div className="space-y-3">
                  {[
                    { date: "Yesterday, 16 Nov 2026", run: "Afternoon Return", route: "ABC Primary ➔ 171 N. Main St", van: "Quantum #04 (Sipho M.)", status: "Completed 15:15 PM" },
                    { date: "Yesterday, 16 Nov 2026", run: "Morning Collection", route: "171 N. Main St ➔ ABC Primary", van: "Quantum #04 (Sipho M.)", status: "Completed 08:10 AM" },
                    { date: "Friday, 13 Nov 2026", run: "Afternoon Return", route: "ABC Primary ➔ 171 N. Main St", van: "Quantum #04 (Sipho M.)", status: "Completed 15:18 PM" },
                    { date: "Friday, 13 Nov 2026", run: "Morning Collection", route: "171 N. Main St ➔ ABC Primary", van: "Quantum #04 (Sipho M.)", status: "Completed 08:08 AM" },
                  ].map((h, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-center justify-between ${
                      isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div>
                        <span className="text-xs font-bold text-[#F5C542]">{h.date} · {h.run}</span>
                        <div className="font-bold text-white text-sm mt-0.5">{h.route}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{h.van}</div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                        {h.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            10. SUPPORT / HELP (/parent/support)
            ================================================================
          */}
          {sectionSlug === "support" && (
            <div className="space-y-6">
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Guardian Help & Support Desk
                </h3>
                <p className="text-xs text-slate-400 mb-6">Need assistance with your learner's schedule, address change or lost property?</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className={`p-5 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <Phone size={24} className="text-[#F5C542] mb-2" />
                    <h4 className="font-bold text-white text-base">Direct Operations Hotline</h4>
                    <p className="text-xs text-slate-400 mt-1">Immediate telephone line to our Johannesburg dispatch desk</p>
                    <a href="tel:08007484653" className="mt-3 inline-block font-extrabold text-[#F5C542] text-sm hover:underline">
                      0800 748 4653 (Toll Free)
                    </a>
                  </div>
                  <div className={`p-5 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <Headphones size={24} className="text-blue-400 mb-2" />
                    <h4 className="font-bold text-white text-base">WhatsApp Dispatch Link</h4>
                    <p className="text-xs text-slate-400 mt-1">Send quick text messages regarding morning delays or absences</p>
                    <span className="mt-3 inline-block font-extrabold text-emerald-400 text-sm">
                      +27 82 555 4912
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 
            ================================================================
            11. DRIVER OVERVIEW (TODAY) (/driver) - DISTINCT FROM ADMIN & PARENT
            ================================================================
          */}
          {(sectionSlug === "" || sectionSlug === "today") && role === "driver" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className={`p-4 rounded-xl border ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="text-xs text-slate-400">Assigned Minibus</div>
                  <div className="text-lg font-black text-white mt-1">Quantum #04</div>
                  <div className="text-xs text-[#F5C542]">GP-449-SS · 16 Seater</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="text-xs text-slate-400">Active Shift</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">Morning Collection</div>
                  <div className="text-xs text-slate-400">Route 3A · 07:15 AM</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="text-xs text-slate-400">Learner Manifest</div>
                  <div className="text-lg font-black text-white mt-1">16 Enrolled</div>
                  <div className="text-xs text-emerald-400">4 Marked Boarded</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="text-xs text-slate-400">Vehicle Fuel & DEKRA</div>
                  <div className="text-lg font-black text-[#F5C542] mt-1">85% Fuel</div>
                  <div className="text-xs text-emerald-400">Roadworthy Valid 2027</div>
                </div>
              </div>

              {/* Start Trip Big Banner */}
              <div className={`p-6 rounded-2xl border ${isDark ? "bg-gradient-to-r from-[#18181F] to-[#121216] border-[#D4AF37]/30" : "bg-white border-slate-200"} flex flex-col sm:flex-row items-center justify-between gap-4`}>
                <div>
                  <h3 className="font-black text-xl text-white">Morning Route 3A Ready to Launch</h3>
                  <p className="text-xs text-slate-400 mt-1">First pickup at 171 N. Main St (Northcliff) at 07:25 AM</p>
                </div>
                <Link
                  to="/driver/trip"
                  className="rounded-xl bg-gradient-to-r from-[#F5C542] to-[#D4AF37] text-black font-extrabold px-6 py-3 text-sm flex items-center gap-2 shadow-lg hover:brightness-105"
                >
                  <Play size={16} fill="currentColor" /> Open Driver Navigation Console
                </Link>
              </div>

              {/* Mini Map */}
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h4 className="font-bold text-white text-base mb-3">Today's Assigned Route Corridors</h4>
                <LiveTransitMap
                  center={[-26.146, 28.02]}
                  zoom={13}
                  routeCoordinates={sampleRouteCoords}
                  stops={sampleStops}
                  vehicles={[sampleVehicles[0]]}
                  height="340px"
                />
              </div>
            </div>
          )}

          {/* 
            ================================================================
            12. PARENT HOME OVERVIEW (/parent) - DISTINCT FROM ADMIN & DRIVER
            ================================================================
          */}
          {(sectionSlug === "" || sectionSlug === "home") && role === "parent" && (
            <div className="space-y-6">
              {/* Child Profile Card */}
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#F5C542] to-[#D4AF37] text-[#0B0B0E] font-black flex items-center justify-center text-xl shadow-md">
                      TS
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-white">Thandiwe Sithole</h3>
                      <p className="text-xs text-slate-400">Grade 6 · ABC Primary School · Household #HH-JHB-9812</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 text-xs font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Transport Active Today
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400">Assigned Minibus:</span>
                    <div className="font-bold text-white text-sm mt-0.5">Toyota Quantum #04</div>
                    <div className="text-[#F5C542]">GP-449-SS · Fully Insured</div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400">Assigned Vetted Driver:</span>
                    <div className="font-bold text-white text-sm mt-0.5">Sipho Mthembu</div>
                    <div className="text-emerald-400">5.0 ★ · PrDP Certified</div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? "bg-[#18181F] border-[#262630]" : "bg-slate-50 border-slate-200"}`}>
                    <span className="text-slate-400">Pickup Curb:</span>
                    <div className="font-bold text-white text-sm mt-0.5">171 N. Main St</div>
                    <div className="text-slate-400">Scheduled 07:25 AM</div>
                  </div>
                </div>
              </div>

              {/* Journey Stepper */}
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <h4 className="font-bold text-white text-base mb-4">Morning Transit Progression</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 size={16} /> 07:15 AM - Departs Depot
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Vehicle Quantum #04 inspected and cleared by desk</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 size={16} /> 07:40 AM - Boarded Safe
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Marked onboard by Driver Sipho Mthembu</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40">
                    <div className="flex items-center gap-2 text-[#F5C542] font-bold text-xs">
                      <Clock size={16} /> ~08:10 AM - Expected School Gate
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">En route to ABC Primary School Main Gate</p>
                  </div>
                </div>
              </div>

              {/* Live Vehicle Tracking Map */}
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-white text-base">Live Bus Location Tracking</h4>
                  <Link to="/parent/tracking" className="text-xs text-[#F5C542] font-bold hover:underline">
                    Expand Radar Map →
                  </Link>
                </div>
                <LiveTransitMap
                  center={[-26.146, 28.02]}
                  zoom={13}
                  routeCoordinates={sampleRouteCoords}
                  stops={sampleStops}
                  vehicles={[sampleVehicles[0]]}
                  height="340px"
                />
              </div>
            </div>
          )}

          {/* 
            ================================================================
            13. ADMIN OVERVIEW (ADMIN ONLY) (/admin)
            ================================================================
          */}
          {(sectionSlug === "" || sectionSlug === "overview") && role === "admin" && (
            <div className="space-y-6">
              {/* 4 Colored KPI Badges */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className={`rounded-2xl border p-4 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 font-bold">
                      <Bus size={22} />
                    </div>
                    <div>
                      <div className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>12</div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase">Total Vehicles</div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 font-bold">
                      <Users size={22} />
                    </div>
                    <div>
                      <div className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>358</div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase">Enrolled Students</div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/30 font-bold">
                      <UserCheck size={22} />
                    </div>
                    <div>
                      <div className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>18</div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase">Certified Drivers</div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl border p-4 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F5C542] to-[#D4AF37] text-[#0B0B0E] font-bold">
                      <CheckCircle2 size={22} />
                    </div>
                    <div>
                      <div className={`text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>11</div>
                      <div className="text-[11px] font-semibold text-[#F5C542] uppercase">Trips On Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Interactive Leaflet Map on Admin Overview */}
              <div className={`rounded-2xl border p-6 shadow-md ${isDark ? "bg-[#141419] border-[#262630]" : "bg-white border-slate-200"}`}>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                      Live Telemetry Fleet Tracking Map
                    </h3>
                    <p className="text-xs text-slate-400">Real-time GPS coordinates of active Toyota Quantum vehicles</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    OpenStreetMap Satellite Active
                  </span>
                </div>

                <LiveTransitMap
                  center={[-26.146, 28.02]}
                  zoom={13}
                  routeCoordinates={sampleRouteCoords}
                  stops={sampleStops}
                  vehicles={sampleVehicles}
                  height="380px"
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5C542] px-5 py-3 font-bold text-black shadow-2xl animate-bounce">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Add New Student
        ================================================================
      */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Enroll New Learner</h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!newStudentForm.name.trim()) return
                setStudentsList((prev) => [
                  {
                    name: newStudentForm.name,
                    school: newStudentForm.school,
                    route: newStudentForm.route,
                    stop: newStudentForm.stop,
                    guardian: newStudentForm.guardian || "Verified Guardian",
                    status: "Registered (Pending 1st Trip)",
                  },
                  ...prev,
                ])
                setShowAddStudentModal(false)
                setNewStudentForm({ name: "", school: "Grade 5 · ABC Primary", route: "Route 3 (AM)", stop: "Rosebank Gate", guardian: "" })
                showToast(`Student "${newStudentForm.name}" successfully enrolled!`)
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Student Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Siphesihle Sithole"
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">School & Grade</label>
                <input
                  type="text"
                  value={newStudentForm.school}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, school: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Assigned Route</label>
                  <select
                    value={newStudentForm.route}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, route: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  >
                    <option>Route 1 (Northcliff)</option>
                    <option>Route 2 (Westbury)</option>
                    <option>Route 3 (AM)</option>
                    <option>Route 5 (Soweto)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Pickup Stop</label>
                  <input
                    type="text"
                    value={newStudentForm.stop}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, stop: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Guardian Name & Phone</label>
                <input
                  type="text"
                  placeholder="e.g. Sindi Sithole (082 555 1234)"
                  value={newStudentForm.guardian}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, guardian: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddStudentModal(false)}
                  className="border-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                >
                  Save Learner
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Add Guardian
        ================================================================
      */}
      {showAddGuardianModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Add Verified Guardian</h3>
              <button
                onClick={() => setShowAddGuardianModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!newGuardianForm.name.trim()) return
                setGuardiansList((prev) => [
                  {
                    name: newGuardianForm.name,
                    phone: newGuardianForm.phone || "082 000 0000",
                    email: newGuardianForm.email || "guardian@domain.co.za",
                    children: newGuardianForm.children || "Learner Linked",
                    address: newGuardianForm.address || "Johannesburg",
                    status: "Verified Household",
                  },
                  ...prev,
                ])
                setShowAddGuardianModal(false)
                setNewGuardianForm({ name: "", phone: "", email: "", children: "", address: "" })
                showToast(`Guardian "${newGuardianForm.name}" registered!`)
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Guardian Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Nompumelelo Sithole"
                  value={newGuardianForm.name}
                  onChange={(e) => setNewGuardianForm({ ...newGuardianForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Mobile Contact *</label>
                  <input
                    required
                    type="text"
                    placeholder="082 123 4567"
                    value={newGuardianForm.phone}
                    onChange={(e) => setNewGuardianForm({ ...newGuardianForm, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="parent@gmail.com"
                    value={newGuardianForm.email}
                    onChange={(e) => setNewGuardianForm({ ...newGuardianForm, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Linked Learner(s)</label>
                <input
                  type="text"
                  placeholder="e.g. Thandiwe Sithole (Gr 6)"
                  value={newGuardianForm.children}
                  onChange={(e) => setNewGuardianForm({ ...newGuardianForm, children: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="e.g. 171 N. Main St, Northcliff"
                  value={newGuardianForm.address}
                  onChange={(e) => setNewGuardianForm({ ...newGuardianForm, address: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddGuardianModal(false)}
                  className="border-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                >
                  Add Guardian
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Broadcast Message
        ================================================================
      */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Broadcast SMS / App Notification</h3>
              <button
                onClick={() => { setShowBroadcastModal(false); setBroadcastSent(false); }}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            {broadcastSent ? (
              <div className="py-6 text-center space-y-2">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check size={24} />
                </div>
                <h4 className="font-bold text-white text-sm">Dispatched Successfully!</h4>
                <p className="text-xs text-slate-400">Message sent via SMS and push notifications to all selected recipients.</p>
                <Button
                  onClick={() => { setShowBroadcastModal(false); setBroadcastSent(false); }}
                  className="mt-4 bg-[#D4AF37] text-black font-bold text-xs rounded-xl"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setBroadcastSent(true)
                  showToast("Broadcast alert sent to all guardians!")
                }}
                className="mt-4 space-y-3 text-xs"
              >
                <div>
                  <label className="block font-semibold mb-1">Target Audience</label>
                  <select
                    value={broadcastForm.recipient}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, recipient: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  >
                    <option>All Enrolled Guardians (358)</option>
                    <option>Route 3 (Northcliff & Rosebank)</option>
                    <option>Route 5 (Soweto Express)</option>
                    <option>All Certified Drivers (18)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Subject / Headline</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Heavy Rain Traffic Warning"
                    value={broadcastForm.title}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Message Body</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Type the message to be sent via SMS and Push..."
                    value={broadcastForm.message}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBroadcastModal(false)}
                    className="border-slate-700 text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                  >
                    Transmit Now
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Schedule Run
        ================================================================
      */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Schedule New Trip Run</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setTripsList((prev) => [
                  {
                    run: newTripForm.run,
                    code: newTripForm.code,
                    driver: newTripForm.driver,
                    van: newTripForm.van,
                    time: newTripForm.time,
                    status: "Queued",
                  },
                  ...prev,
                ])
                setShowScheduleModal(false)
                showToast(`Trip ${newTripForm.code} scheduled!`)
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Run Type</label>
                  <select
                    value={newTripForm.run}
                    onChange={(e) => setNewTripForm({ ...newTripForm, run: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  >
                    <option>Morning Collection</option>
                    <option>Afternoon Return Run</option>
                    <option>Special Camp Excursion</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Route Corridor</label>
                  <select
                    value={newTripForm.code}
                    onChange={(e) => setNewTripForm({ ...newTripForm, code: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  >
                    <option>RT-01 (Northcliff)</option>
                    <option>RT-02 (Rosebank)</option>
                    <option>RT-03 (Soweto)</option>
                    <option>RT-04 (Roodepoort)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Assigned Driver</label>
                  <select
                    value={newTripForm.driver}
                    onChange={(e) => setNewTripForm({ ...newTripForm, driver: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  >
                    <option>Sipho Mthembu</option>
                    <option>David Khumalo</option>
                    <option>Linda Ndlovu</option>
                    <option>Bongani Zulu</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Quantum Minibus</label>
                  <select
                    value={newTripForm.van}
                    onChange={(e) => setNewTripForm({ ...newTripForm, van: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  >
                    <option>Quantum #04 (GP-449-SS)</option>
                    <option>Quantum #09 (GP-188-SS)</option>
                    <option>Quantum #02 (GP-903-SS)</option>
                    <option>Quantum #07 (GP-212-SS)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Scheduled Time Range</label>
                <input
                  type="text"
                  value={newTripForm.time}
                  onChange={(e) => setNewTripForm({ ...newTripForm, time: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleModal(false)}
                  className="border-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                >
                  Confirm Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Add Route
        ================================================================
      */}
      {showAddRouteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Create New Transit Corridor</h3>
              <button
                onClick={() => setShowAddRouteModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!newRouteForm.name.trim()) return
                setRoutesList((prev) => [
                  {
                    id: newRouteForm.id,
                    name: newRouteForm.name,
                    stops: Number(newRouteForm.stops),
                    distance: newRouteForm.distance,
                    estTime: newRouteForm.estTime,
                    school: newRouteForm.school,
                    status: "Active",
                  },
                  ...prev,
                ])
                setShowAddRouteModal(false)
                setNewRouteForm({ id: "RT-06", name: "", stops: 4, distance: "16 km", estTime: "40 mins", school: "ABC Primary School" })
                showToast(`Route ${newRouteForm.id} registered!`)
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Route ID</label>
                  <input
                    type="text"
                    value={newRouteForm.id}
                    onChange={(e) => setNewRouteForm({ ...newRouteForm, id: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Corridor Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sandton & Morningside Link"
                    value={newRouteForm.name}
                    onChange={(e) => setNewRouteForm({ ...newRouteForm, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Destination School</label>
                <input
                  type="text"
                  value={newRouteForm.school}
                  onChange={(e) => setNewRouteForm({ ...newRouteForm, school: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Approx Distance</label>
                  <input
                    type="text"
                    value={newRouteForm.distance}
                    onChange={(e) => setNewRouteForm({ ...newRouteForm, distance: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Travel Time</label>
                  <input
                    type="text"
                    value={newRouteForm.estTime}
                    onChange={(e) => setNewRouteForm({ ...newRouteForm, estTime: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddRouteModal(false)}
                  className="border-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                >
                  Save Route
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Add Stop
        ================================================================
      */}
      {showAddStopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Add Roadside Stop Checkpoint</h3>
              <button
                onClick={() => setShowAddStopModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!newStopForm.stop.trim()) return
                setStopsList((prev) => [
                  {
                    stop: newStopForm.stop,
                    zone: newStopForm.zone,
                    learners: Number(newStopForm.learners),
                    time: newStopForm.time,
                    status: newStopForm.status,
                  },
                  ...prev,
                ])
                setShowAddStopModal(false)
                setNewStopForm({ stop: "", zone: "Rosebank", learners: 2, time: "07:35 AM", status: "Clear Curb Area" })
                showToast(`Stop point registered!`)
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Stop Label / Intersection *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Stop 5: Corner Jan Smuts & 7th Ave"
                  value={newStopForm.stop}
                  onChange={(e) => setNewStopForm({ ...newStopForm, stop: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Suburban Zone</label>
                  <input
                    type="text"
                    value={newStopForm.zone}
                    onChange={(e) => setNewStopForm({ ...newStopForm, zone: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Pickup Time</label>
                  <input
                    type="text"
                    value={newStopForm.time}
                    onChange={(e) => setNewStopForm({ ...newStopForm, time: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddStopModal(false)}
                  className="border-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                >
                  Add Stop
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
        ================================================================
        MODAL: Schedule Service
        ================================================================
      */}
      {showScheduleServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${
            isDark ? "bg-[#141419] border-[#262630] text-white" : "bg-white border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Schedule Toyota OEM Maintenance</h3>
              <button
                onClick={() => setShowScheduleServiceModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setMaintenanceList((prev) => [
                  {
                    van: newServiceForm.van,
                    plate: newServiceForm.plate,
                    last: "Today (Booked)",
                    next: newServiceForm.next,
                    tire: newServiceForm.tire,
                    cert: "DEKRA Valid",
                  },
                  ...prev,
                ])
                setShowScheduleServiceModal(false)
                showToast(`Service scheduled for ${newServiceForm.van}!`)
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold mb-1">Select Minibus</label>
                <select
                  value={newServiceForm.van}
                  onChange={(e) => {
                    const van = e.target.value
                    const plate = van.includes("#04") ? "GP-449-SS" : van.includes("#09") ? "GP-188-SS" : "GP-903-SS"
                    setNewServiceForm({ ...newServiceForm, van, plate })
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                >
                  <option>Quantum #04 (GP-449-SS)</option>
                  <option>Quantum #09 (GP-188-SS)</option>
                  <option>Quantum #02 (GP-903-SS)</option>
                  <option>Quantum #07 (GP-212-SS)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Target Service Date</label>
                <input
                  type="text"
                  value={newServiceForm.next}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, next: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Service Work Items</label>
                <input
                  type="text"
                  value={newServiceForm.tire}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, tire: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-[#18181F] px-3 py-2 text-white outline-hidden focus:border-[#D4AF37]"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScheduleServiceModal(false)}
                  className="border-slate-700 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#F5C542] text-black font-bold text-xs rounded-xl"
                >
                  Book Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
