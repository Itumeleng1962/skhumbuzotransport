import React, { createContext, useContext, useEffect, useState } from "react"

export interface UserLocation {
  lat: number
  lng: number
  accuracy?: number
  timestamp?: number
  address?: string
}

interface LocationContextType {
  location: UserLocation | null
  isTracking: boolean
  permissionStatus: "prompt" | "granted" | "denied" | "unsupported"
  requestLiveLocation: () => Promise<UserLocation | null>
  toggleTracking: () => void
  error: string | null
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

// Default South Africa fallback if permission is pending or denied
const DEFAULT_JHB_LOCATION: UserLocation = {
  lat: -26.155,
  lng: 28.02,
  address: "Johannesburg Central Zone, Gauteng",
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<UserLocation | null>(() => {
    const saved = localStorage.getItem("sst_user_location")
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return DEFAULT_JHB_LOCATION
      }
    }
    return DEFAULT_JHB_LOCATION
  })

  const [isTracking, setIsTracking] = useState<boolean>(() => {
    return localStorage.getItem("sst_is_tracking") === "true"
  })

  const [permissionStatus, setPermissionStatus] = useState<"prompt" | "granted" | "denied" | "unsupported">("prompt")
  const [error, setError] = useState<string | null>(null)

  // Check initial browser permission status if supported
  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionStatus("unsupported")
      return
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" as PermissionName })
        .then((result) => {
          setPermissionStatus(result.state)
          result.onchange = () => {
            setPermissionStatus(result.state)
          }
        })
        .catch(() => {
          // Fallback
        })
    }
  }, [])

  // Watch position when continuous live tracking is enabled
  useEffect(() => {
    if (!isTracking || !navigator.geolocation) return

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newLoc: UserLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
          address: "Your Real-Time GPS Location",
        }
        setLocation(newLoc)
        localStorage.setItem("sst_user_location", JSON.stringify(newLoc))
        setError(null)
      },
      (err) => {
        setError(err.message)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 15000,
      }
    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [isTracking])

  const requestLiveLocation = async (): Promise<UserLocation | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setPermissionStatus("unsupported")
        setError("Geolocation is not supported by your browser.")
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLoc: UserLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: pos.timestamp,
            address: "Your Verified Real-Time Location",
          }
          setLocation(newLoc)
          setPermissionStatus("granted")
          setIsTracking(true)
          localStorage.setItem("sst_user_location", JSON.stringify(newLoc))
          localStorage.setItem("sst_is_tracking", "true")
          setError(null)
          resolve(newLoc)
        },
        (err) => {
          console.warn("Location permission not granted:", err.message)
          setPermissionStatus("denied")
          setError(err.message)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    })
  }

  const toggleTracking = () => {
    const next = !isTracking
    setIsTracking(next)
    localStorage.setItem("sst_is_tracking", next ? "true" : "false")
    if (next && (!location || permissionStatus !== "granted")) {
      requestLiveLocation()
    }
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        isTracking,
        permissionStatus,
        requestLiveLocation,
        toggleTracking,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocationTracking() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocationTracking must be used within a LocationProvider")
  }
  return context
}
