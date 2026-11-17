export const brand = {
  name: "Skhumbuzo Sithole Transport Solutions",
  short: "Skhumbuzo Sithole",
  tagline: "Safe Journeys. Brighter Futures.",
} as const

export const publicNav = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Fleet" },
  { to: "/safety", label: "Safety" },
  { to: "/contact", label: "Contact" },
] as const

export const photoCredit = {
  src: "/images/quantum-freeway.jpg",
  alt: "White Toyota Quantum minibuses travelling a South African highway at dusk.",
  caption:
    "Toyota Quantum minibuses on the road toward Nelspruit. Reference photograph by Mjepa, CC BY-SA 4.0. This is not a photograph of our fleet.",
  fileUrl: "https://commons.wikimedia.org/wiki/File:Quantum_taxi.jpg",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
} as const

export const services = [
  {
    title: "The school-day run",
    text: "Morning collection and the afternoon return, on a route a family can recognise from one week to the next.",
  },
  {
    title: "A named collection point",
    text: "Stops agreed with the household, so a learner is not left waiting on a different corner every day.",
  },
  {
    title: "One list for the vehicle",
    text: "The driver works from the learners assigned to that trip. The vehicle and the list belong together.",
  },
  {
    title: "A record of the journey",
    text: "Who travelled, which vehicle, and when the trip opened and closed. That record is part of the platform still to be connected.",
  },
] as const

export const principles = [
  {
    title: "A vehicle families already know",
    text: "The Toyota Quantum is the high-roof minibus used across South Africa. The service is shaped around that vehicle, not a foreign school bus.",
  },
  {
    title: "Guardians first",
    text: "A learner is linked to the guardians who are allowed to see them. Unrelated households do not receive that child's details or location.",
  },
  {
    title: "Three clear roles",
    text: "Parents, drivers and the operations desk each have their own door into the same journey, and only the part that belongs to them.",
  },
  {
    title: "Plain about what is live",
    text: "This release is the public website. Sign-in, live tracking and records are the next build, and the site does not pretend they are already running.",
  },
] as const

export type PortalRole = "admin" | "parent" | "driver"

export const portalLogins: Record<
  PortalRole,
  { title: string; path: string; outline: string; intro: string }
> = {
  parent: {
    title: "Parent portal",
    path: "/parent/login",
    outline: "/parent",
    intro:
      "For guardians. Child profiles, transport requests and trip updates will live here once accounts are open.",
  },
  driver: {
    title: "Driver portal",
    path: "/driver/login",
    outline: "/driver",
    intro:
      "For the person at the wheel. Assigned trips, the learner list and trip actions will live here, built for a phone in the hand.",
  },
  admin: {
    title: "Admin portal",
    path: "/admin/login",
    outline: "/admin",
    intro:
      "For the operations desk. Learners, households, drivers, vehicles, routes and the record of the day.",
  },
}

export const portalSections: Record<
  PortalRole,
  { slug: string; label: string; summary: string }[]
> = {
  admin: [
    { slug: "", label: "Overview", summary: "The morning picture: trips due, vehicles out, and items that need a person." },
    { slug: "fleet-map", label: "Live fleet map", summary: "Where authorised vehicles are during an open trip. Not connected in this release." },
    { slug: "students", label: "Students", summary: "Learner records, school and the guardians linked to each child." },
    { slug: "parents", label: "Parents", summary: "Households, verification and who may see which learner." },
    { slug: "drivers", label: "Drivers", summary: "Driver profiles and the vehicles and routes assigned to them." },
    { slug: "vehicles", label: "Vehicles", summary: "The Quantum register: capacity, status and who is using it today." },
    { slug: "routes", label: "Routes", summary: "School routes, direction and the trips that run on them." },
    { slug: "stops", label: "Stops", summary: "Collection and drop-off points along a route." },
    { slug: "trips", label: "Trip scheduling", summary: "Which run happens, with which driver, vehicle and learner list." },
    { slug: "attendance", label: "Attendance", summary: "Pickup and drop-off marks for learners on a trip." },
    { slug: "notifications", label: "Notifications", summary: "Messages the desk sends to guardians and drivers." },
    { slug: "reports", label: "Reports", summary: "Trip, attendance and fleet summaries for a period you choose." },
    { slug: "maintenance", label: "Maintenance", summary: "Service notes and vehicles that should not go out." },
    { slug: "audit", label: "Audit logs", summary: "Who changed a sensitive record, and when." },
    { slug: "settings", label: "Settings", summary: "Desk preferences. Privilege is never self-assigned from a public form." },
  ],
  parent: [
    { slug: "", label: "Home", summary: "Your children, today's arrangement, and anything that needs you." },
    { slug: "children", label: "Children", summary: "Profiles for the learners linked to your verified household." },
    { slug: "requests", label: "Transport requests", summary: "Ask for a place on a school run and follow that request." },
    { slug: "driver", label: "Assigned driver", summary: "The driver linked to your child's trip." },
    { slug: "vehicle", label: "Assigned vehicle", summary: "The vehicle your child is assigned to travel in." },
    { slug: "tracking", label: "Live trip", summary: "The vehicle position during an authorised trip, with the time of the last update." },
    { slug: "notifications", label: "Notifications", summary: "Pickup, drop-off and delay notes for your own children." },
    { slug: "history", label: "Trip history", summary: "Past journeys for the learners linked to you." },
    { slug: "support", label: "Support", summary: "A place to ask the desk a question about your own arrangement." },
  ],
  driver: [
    { slug: "", label: "Today", summary: "The trip in front of you, the vehicle, and the next action." },
    { slug: "vehicle", label: "Vehicle", summary: "The Quantum assigned to you." },
    { slug: "routes", label: "Routes", summary: "The routes on your name." },
    { slug: "trips", label: "Scheduled trips", summary: "Runs still to start, and the one that is open." },
    { slug: "learners", label: "Learner list", summary: "Only the learners assigned to your trip." },
    { slug: "trip", label: "Active trip", summary: "Start, pickup, drop-off and complete. Location is shared only while the trip is open." },
    { slug: "delays", label: "Delay", summary: "Tell the desk and the affected households that the run is running late." },
    { slug: "incidents", label: "Incident", summary: "Record something the desk must see before the day moves on." },
    { slug: "history", label: "History", summary: "Trips you have already closed." },
  ],
}
