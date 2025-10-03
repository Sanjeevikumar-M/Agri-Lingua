// Local storage utilities for user data

import type { UserProfile, LeaderboardEntry } from "./types"

const STORAGE_KEYS = {
  USER_PROFILE: "agri_lingua_user",
  LEADERBOARD: "agri_lingua_leaderboard",
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile))
    updateLeaderboard(profile)
  }
}

export function getUserProfile(): UserProfile | null {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    return data ? JSON.parse(data) : null
  }
  return null
}

export function createNewProfile(username: string): UserProfile {
  return {
    username,
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: new Date().toISOString().split("T")[0],
    badges: [],
    completedModules: [],
    currentModule: 1,
    createdAt: new Date().toISOString(),
  }
}

export function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toISOString().split("T")[0]
  const lastActive = profile.lastActiveDate

  const lastDate = new Date(lastActive)
  const todayDate = new Date(today)
  const diffTime = todayDate.getTime() - lastDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    // Same day, no change
    return profile
  } else if (diffDays === 1) {
    // Consecutive day, increment streak
    profile.currentStreak += 1
    profile.longestStreak = Math.max(profile.longestStreak, profile.currentStreak)
  } else {
    // Streak broken
    profile.currentStreak = 1
  }

  profile.lastActiveDate = today
  return profile
}

function updateLeaderboard(profile: UserProfile): void {
  const leaderboardData = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
  let leaderboard: LeaderboardEntry[] = leaderboardData ? JSON.parse(leaderboardData) : []

  // Remove old entry for this user
  leaderboard = leaderboard.filter((entry) => entry.username !== profile.username)

  // Add updated entry
  leaderboard.push({
    username: profile.username,
    totalXP: profile.totalXP,
    badges: profile.badges.length,
    streak: profile.currentStreak,
  })

  // Sort by XP
  leaderboard.sort((a, b) => b.totalXP - a.totalXP)

  // Keep top 100
  leaderboard = leaderboard.slice(0, 100)

  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard))
}

export function getLeaderboard(): LeaderboardEntry[] {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
    return data ? JSON.parse(data) : []
  }
  return []
}

export function clearUserData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE)
  }
}
