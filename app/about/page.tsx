"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Hero Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
          <div className="text-6xl mb-4">🛰️🌾</div>
          <h1 className="text-4xl font-bold mb-3">About Agri-Lingua</h1>
          <p className="text-xl text-muted-foreground">Duolingo for Sustainable Farming</p>
        </Card>

        {/* Mission */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Agri-Lingua makes NASA Earth science data accessible to farmers, students, and agricultural enthusiasts
            worldwide. Through gamified learning, we teach how to interpret and apply satellite data for sustainable
            farming practices.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our focus is on smallholder rice farmers in regions like Thanjavur, Tamil Nadu, India, where understanding
            soil moisture, plant health, and water management can significantly improve yields and sustainability.
          </p>
        </Card>

        {/* NASA Data Sources */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">NASA Data Sources</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💧</span>
              <div>
                <h3 className="font-bold">SMAP (Soil Moisture Active Passive)</h3>
                <p className="text-sm text-muted-foreground">
                  Provides global soil moisture data every 2-3 days, helping farmers optimize irrigation timing.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🌾</span>
              <div>
                <h3 className="font-bold">Landsat 8/9</h3>
                <p className="text-sm text-muted-foreground">
                  Offers NDVI data for monitoring plant health and detecting crop stress early.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🌡️</span>
              <div>
                <h3 className="font-bold">ECOSTRESS</h3>
                <p className="text-sm text-muted-foreground">
                  Measures plant temperature from the ISS to identify water-stressed crops.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">📡</span>
              <div>
                <h3 className="font-bold">SAR (Synthetic Aperture Radar)</h3>
                <p className="text-sm text-muted-foreground">
                  Enables field monitoring in any weather condition, including through clouds.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold">Module-Based Learning</h3>
                <p className="text-sm text-muted-foreground">Progressive curriculum from basics to advanced topics</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🎮</span>
              <div>
                <h3 className="font-semibold">Gamification</h3>
                <p className="text-sm text-muted-foreground">XP, badges, streaks, and leaderboards</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🗺️</span>
              <div>
                <h3 className="font-semibold">Real NASA Data</h3>
                <p className="text-sm text-muted-foreground">Learn with actual satellite imagery and datasets</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold">Practical Scenarios</h3>
                <p className="text-sm text-muted-foreground">Decision-making challenges based on real situations</p>
              </div>
            </div>
          </div>
        </Card>

        {/* NASA Space Apps Challenge */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🚀</span>
            <div>
              <h3 className="font-bold text-lg mb-2">NASA Space Apps Challenge 2025</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Agri-Lingua was created for the NASA Space Apps Challenge 2025, addressing the challenge of making Earth
                science data accessible and actionable for agricultural communities.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://www.spaceappschallenge.org" target="_blank" rel="noopener noreferrer">
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Credits */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Data Citations</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• NASA Soil Moisture Active Passive (SMAP) Mission</p>
            <p>• USGS Landsat 8/9 Operational Land Imager (OLI)</p>
            <p>• NASA ECOSTRESS on the International Space Station</p>
            <p>• NASA Synthetic Aperture Radar (SAR) Data</p>
          </div>
        </Card>
      </main>
    </div>
  )
}
