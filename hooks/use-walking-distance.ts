"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const STORAGE_KEY = "machaview-walking-distance"
const EARTH_RADIUS_KM = 6371

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_KM * c
}

interface WalkingDistanceState {
  totalDistance: number
  displayDistance: number
  isTracking: boolean
  error: string | null
  currentPosition: { lat: number; lng: number } | null
}

export function useWalkingDistance() {
  const [state, setState] = useState<WalkingDistanceState>({
    totalDistance: 0,
    displayDistance: 0,
    isTracking: false,
    error: null,
    currentPosition: null,
  })

  const prevPositionRef = useRef<{ lat: number; lng: number } | null>(null)
  const totalDistanceRef = useRef(0)
  const displayRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)
  const watchIdRef = useRef<number | null>(null)

  // Restore distance from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = parseFloat(stored)
        if (!isNaN(parsed) && parsed >= 0) {
          totalDistanceRef.current = parsed
          displayRef.current = parsed
          setState((s) => ({
            ...s,
            totalDistance: parsed,
            displayDistance: parsed,
          }))
        }
      }
    } catch {}
  }, [])

  // Smooth animated counter
  useEffect(() => {
    let running = true

    function animate() {
      if (!running) return
      const target = totalDistanceRef.current
      const current = displayRef.current
      const diff = target - current

      if (Math.abs(diff) > 0.0001) {
        // Ease toward target
        displayRef.current += diff * 0.08
        setState((s) => ({
          ...s,
          displayDistance: displayRef.current,
        }))
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  // Start geolocation tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported" }))
      return
    }

    setState((s) => ({ ...s, isTracking: true }))

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const newPos = { lat: latitude, lng: longitude }

        setState((s) => ({ ...s, currentPosition: newPos, error: null }))

        const prev = prevPositionRef.current
        if (prev) {
          const dist = haversineDistance(prev.lat, prev.lng, newPos.lat, newPos.lng)
          // Only add if movement > 2m (noise filter) and < 500m (teleport filter)
          if (dist > 0.002 && dist < 0.5) {
            totalDistanceRef.current += dist
            setState((s) => ({
              ...s,
              totalDistance: totalDistanceRef.current,
            }))
            try {
              localStorage.setItem(
                STORAGE_KEY,
                totalDistanceRef.current.toString()
              )
            } catch {}
          }
        }

        prevPositionRef.current = newPos
      },
      (err) => {
        setState((s) => ({
          ...s,
          error: err.code === 1 ? "Location permission denied" : "Unable to get location",
          isTracking: false,
        }))
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    )

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [])

  const resetDistance = useCallback(() => {
    totalDistanceRef.current = 0
    displayRef.current = 0
    prevPositionRef.current = null
    setState((s) => ({
      ...s,
      totalDistance: 0,
      displayDistance: 0,
    }))
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [])

  return {
    ...state,
    resetDistance,
  }
}
