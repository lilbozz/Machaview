"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [location, setLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Browser ไม่รองรับ GPS")
      return
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setError(null)
      },
      (err) => {
        setError("ไม่สามารถดึงตำแหน่งได้")
        console.error(err)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    )

    return () => navigator.geolocation.clearWatch(watcher)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Machaview Live GPS</h1>

      {error && <p className="text-red-400">{error}</p>}

      {!location && !error && <p>กำลังโหลดตำแหน่ง...</p>}

      {location && (
        <div className="space-y-2 text-lg">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}
    </div>
  )
}