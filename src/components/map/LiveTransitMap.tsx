import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useLocationTracking } from "@/lib/location.tsx"

interface StopPoint {
  name: string
  lat: number
  lng: number
  time?: string
  status?: string
}

interface VehicleMarker {
  id: string
  name: string
  lat: number
  lng: number
  speed: string
  driver: string
  status: string
}

export function LiveTransitMap({
  center = [-26.15, 28.02], // Johannesburg coordinates
  zoom = 12,
  vehicles = [],
  stops = [],
  routeCoordinates = [],
  height = "360px",
  interactive = true,
  showUserMarker = true,
}: {
  center?: [number, number]
  zoom?: number
  vehicles?: VehicleMarker[]
  stops?: StopPoint[]
  routeCoordinates?: [number, number][]
  height?: string
  interactive?: boolean
  showUserMarker?: boolean
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const { location, isTracking } = useLocationTracking()

  const mapCenter: [number, number] = location && isTracking ? [location.lat, location.lng] : center

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Clean up if instance already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom,
      zoomControl: interactive,
      dragging: interactive,
      scrollWheelZoom: false,
    })

    mapInstanceRef.current = map

    // OpenStreetMap high contrast / clean tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    // Route polyline with gold styling
    if (routeCoordinates.length > 0) {
      // Glow background line
      L.polyline(routeCoordinates, {
        color: "#F5C542",
        weight: 6,
        opacity: 0.8,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map)

      // Solid central route line
      L.polyline(routeCoordinates, {
        color: "#152544",
        weight: 3,
        opacity: 0.9,
      }).addTo(map)
    }

    // Add Stop Markers (Numbered clean badges)
    stops.forEach((stop, index) => {
      const stopIcon = L.divIcon({
        className: "custom-stop-marker",
        html: `
          <div style="
            background: #18181F;
            color: #F5C542;
            border: 2px solid #D4AF37;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          ">
            ${index + 1}
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      })

      const marker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(map)
      marker.bindPopup(`
        <div style="font-family: inherit; padding: 2px;">
          <strong style="color: #152544; font-size: 13px;">Stop ${index + 1}: ${stop.name}</strong>
          ${stop.time ? `<div style="color: #64748b; font-size: 11px;">Scheduled: ${stop.time}</div>` : ""}
          ${stop.status ? `<div style="color: #10b981; font-weight: bold; font-size: 11px;">● ${stop.status}</div>` : ""}
        </div>
      `)
    })

    // Add Vehicle Markers (Custom pulsing minibus icon)
    vehicles.forEach((v) => {
      const busIcon = L.divIcon({
        className: "custom-bus-marker",
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="
              background: linear-gradient(135deg, #F5C542, #D4AF37);
              color: #0B0B0E;
              width: 38px;
              height: 38px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 3px solid #0B0B0E;
              box-shadow: 0 0 20px rgba(212,175,55,0.8);
              animation: bounce 1.8s infinite;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
              </svg>
            </div>
            <div style="
              background: #0B0B0E;
              color: #F5C542;
              border: 1px solid #D4AF37;
              border-radius: 6px;
              padding: 2px 6px;
              font-size: 9px;
              font-weight: 800;
              white-space: nowrap;
              margin-top: 3px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            ">
              ${v.name} · ${v.speed}
            </div>
          </div>
        `,
        iconSize: [40, 60],
        iconAnchor: [20, 30],
      })

      const marker = L.marker([v.lat, v.lng], { icon: busIcon }).addTo(map)
      marker.bindPopup(`
        <div style="font-family: inherit; padding: 4px;">
          <strong style="color: #0B0B0E; font-size: 13px;">${v.name}</strong>
          <div style="font-size: 11px; color: #475569; margin-top: 2px;">Driver: <b>${v.driver}</b></div>
          <div style="font-size: 11px; color: #475569;">Telemetry Speed: <b>${v.speed}</b></div>
          <div style="font-size: 11px; color: #10B981; font-weight: bold; margin-top: 2px;">● ${v.status}</div>
        </div>
      `)
    })

    // If live user location is available and tracking is on, place real live pulse marker
    if (showUserMarker && location && isTracking) {
      const userMarkerIcon = L.divIcon({
        className: "custom-user-gps-marker",
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
            <div style="
              width: 22px;
              height: 22px;
              background: #2563EB;
              border: 3px solid #FFFFFF;
              border-radius: 50%;
              box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.35);
              animation: pulse 1.8s infinite;
            "></div>
            <div style="
              background: #1E293B;
              color: #FFFFFF;
              border-radius: 4px;
              padding: 2px 5px;
              font-size: 8px;
              font-weight: 800;
              white-space: nowrap;
              margin-top: 2px;
            ">
              You (Live)
            </div>
          </div>
        `,
        iconSize: [24, 40],
        iconAnchor: [12, 12],
      })

      const userMarker = L.marker([location.lat, location.lng], { icon: userMarkerIcon }).addTo(map)
      userMarker.bindPopup(`
        <div style="font-family: inherit; padding: 2px;">
          <strong style="color: #2563EB; font-size: 12px;">Your Live GPS Location</strong>
          <div style="color: #64748B; font-size: 10px; margin-top: 2px;">Accuracy: ~${Math.round(location.accuracy || 15)}m</div>
          <div style="color: #10B981; font-size: 10px; font-weight: bold;">● Telemetry Active</div>
        </div>
      `)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [mapCenter, zoom, vehicles, stops, routeCoordinates, interactive, location, isTracking, showUserMarker])

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: "100%" }}
      className="rounded-xl overflow-hidden shadow-inner z-0"
    />
  )
}
