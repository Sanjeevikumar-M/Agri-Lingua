"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { getUserProfile } from "@/lib/storage"
import type { UserProfile } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Camera, Info } from "lucide-react"

export default function ARViewerPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [arMode, setArMode] = useState<"satellite" | "field" | "data">("satellite")
  const [showInfo, setShowInfo] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

    // Check if user has completed at least one module
    if (userProfile.completedModules.length === 0) {
      router.push("/dashboard")
      return
    }

    setProfile(userProfile)
    setIsLoading(false)
  }, [router])

  useEffect(() => {
    // Simple canvas animation for AR visualization
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame: number

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw AR visualization based on mode
      if (arMode === "satellite") {
        drawSatelliteView(ctx, canvas)
      } else if (arMode === "field") {
        drawFieldView(ctx, canvas)
      } else {
        drawDataView(ctx, canvas)
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [arMode])

  const drawSatelliteView = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw orbiting satellite
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const time = Date.now() / 1000

    // Earth
    ctx.fillStyle = "#4ade80"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 80, 0, Math.PI * 2)
    ctx.fill()

    // Satellite orbit
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])

    // Satellite
    const satX = centerX + Math.cos(time) * 150
    const satY = centerY + Math.sin(time) * 150
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(satX - 10, satY - 10, 20, 20)

    // Signal lines
    ctx.strokeStyle = "#60a5fa"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(satX, satY)
    ctx.lineTo(centerX, centerY)
    ctx.stroke()

    // Label
    ctx.fillStyle = "#1e293b"
    ctx.font = "16px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("NASA SMAP Satellite", centerX, centerY + 120)
  }

  const drawFieldView = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw field with moisture zones
    const zones = [
      { x: 50, y: 100, width: 150, height: 100, moisture: 0.8, label: "High" },
      { x: 220, y: 100, width: 150, height: 100, moisture: 0.5, label: "Medium" },
      { x: 390, y: 100, width: 150, height: 100, moisture: 0.3, label: "Low" },
    ]

    zones.forEach((zone) => {
      // Draw zone
      const alpha = zone.moisture
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`
      ctx.fillRect(zone.x, zone.y, zone.width, zone.height)

      // Border
      ctx.strokeStyle = "#1e40af"
      ctx.lineWidth = 2
      ctx.strokeRect(zone.x, zone.y, zone.width, zone.height)

      // Label
      ctx.fillStyle = "#1e293b"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${zone.label} Moisture`, zone.x + zone.width / 2, zone.y + zone.height / 2)
      ctx.fillText(`${Math.round(zone.moisture * 100)}%`, zone.x + zone.width / 2, zone.y + zone.height / 2 + 20)
    })

    // Title
    ctx.fillStyle = "#1e293b"
    ctx.font = "18px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("AR Field Moisture Map", canvas.width / 2, 50)
  }

  const drawDataView = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw live data visualization
    const time = Date.now() / 1000

    // Background grid
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Data points
    const dataPoints = [
      { label: "Soil Moisture", value: 0.65 + Math.sin(time) * 0.1, color: "#3b82f6", y: 100 },
      { label: "NDVI", value: 0.75 + Math.cos(time * 1.5) * 0.08, color: "#22c55e", y: 180 },
      { label: "Temperature", value: 0.55 + Math.sin(time * 0.8) * 0.12, color: "#ef4444", y: 260 },
    ]

    dataPoints.forEach((point) => {
      // Label
      ctx.fillStyle = "#1e293b"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(point.label, 50, point.y)

      // Bar
      const barWidth = point.value * 400
      ctx.fillStyle = point.color
      ctx.fillRect(180, point.y - 15, barWidth, 20)

      // Value
      ctx.fillStyle = "#1e293b"
      ctx.textAlign = "right"
      ctx.fillText(`${Math.round(point.value * 100)}%`, canvas.width - 50, point.y)
    })

    // Title
    ctx.fillStyle = "#1e293b"
    ctx.font = "18px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Live NASA Data Feed", canvas.width / 2, 50)
  }

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowInfo(!showInfo)}>
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header Section */}
        <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <div className="flex items-center gap-4">
            <Camera className="h-12 w-12 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold mb-1">AR Data Viewer</h1>
              <p className="text-muted-foreground">Visualize NASA data in augmented reality</p>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        {showInfo && (
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">About AR Viewer</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This AR feature lets you visualize NASA satellite data in an interactive way. In a full mobile app,
                  this would use your device's camera to overlay data on real fields.
                </p>
                <p className="text-sm text-muted-foreground">
                  Unlock this feature by completing modules and earning badges!
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* AR Viewer */}
        <Card className="p-6">
          <div className="space-y-4">
            {/* Mode Selector */}
            <div className="flex gap-2 justify-center">
              <Button
                variant={arMode === "satellite" ? "default" : "outline"}
                onClick={() => setArMode("satellite")}
                size="sm"
              >
                Satellite View
              </Button>
              <Button variant={arMode === "field" ? "default" : "outline"} onClick={() => setArMode("field")} size="sm">
                Field Map
              </Button>
              <Button variant={arMode === "data" ? "default" : "outline"} onClick={() => setArMode("data")} size="sm">
                Live Data
              </Button>
            </div>

            {/* Canvas */}
            <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-lg border-2 border-border overflow-hidden">
              <canvas ref={canvasRef} width={600} height={400} className="w-full h-auto" />
            </div>

            {/* Description */}
            <div className="text-center text-sm text-muted-foreground">
              {arMode === "satellite" && (
                <p>Watch the NASA SMAP satellite orbit Earth and collect soil moisture data</p>
              )}
              {arMode === "field" && <p>View moisture levels across different zones of your field</p>}
              {arMode === "data" && <p>Monitor real-time NASA data feeds for your location</p>}
            </div>
          </div>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="font-semibold mb-1">Real-Time Data</h3>
            <p className="text-xs text-muted-foreground">Live satellite feeds</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">🗺️</div>
            <h3 className="font-semibold mb-1">Field Overlay</h3>
            <p className="text-xs text-muted-foreground">AR data on your crops</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">Data Analysis</h3>
            <p className="text-xs text-muted-foreground">Interpret NASA datasets</p>
          </Card>
        </div>

        {/* Unlock More */}
        {profile.completedModules.length < 5 && (
          <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
            <div className="text-center space-y-3">
              <div className="text-4xl">🔓</div>
              <h3 className="text-xl font-bold">Unlock More AR Features</h3>
              <p className="text-muted-foreground">
                Complete all modules to unlock advanced AR visualizations including 3D terrain models and historical
                data playback!
              </p>
              <Button onClick={() => router.push("/dashboard")}>Continue Learning</Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
