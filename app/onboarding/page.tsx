"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createNewProfile, saveUserProfile } from "@/lib/storage"

export default function OnboardingPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters")
      return
    }

    if (username.trim().length > 20) {
      setError("Username must be less than 20 characters")
      return
    }

    // Create new profile
    const profile = createNewProfile(username.trim())
    saveUserProfile(profile)

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 via-emerald-50 to-blue-50">
      <Card className="max-w-md w-full p-8 space-y-6 shadow-lg">
        <div className="text-center space-y-2">
          <div className="text-6xl mb-4">👨‍🌾</div>
          <h1 className="text-3xl font-bold">Create Your Profile</h1>
          <p className="text-muted-foreground">Choose a username to start your farming journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              maxLength={20}
              className="text-lg"
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full">
            Start Learning
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>Your progress will be saved locally on this device</p>
        </div>
      </Card>
    </div>
  )
}
