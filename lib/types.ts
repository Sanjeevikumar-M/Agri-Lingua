// Core game types for Agri-Lingua

export interface UserProfile {
  username: string
  totalXP: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  badges: Badge[]
  completedModules: number[]
  currentModule: number
  createdAt: string
  yieldPoints: YieldPoints
  unlockedResolutions: DataResolutionUnlock[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

export interface Module {
  id: number
  title: string
  description: string
  icon: string
  xpReward: number
  lessons: Lesson[]
  isLocked: boolean
}

export interface Lesson {
  id: string
  moduleId: number
  title: string
  type: "tutorial" | "quiz" | "scenario" | "challenge"
  content: LessonContent
  xpReward: number
  completed: boolean
}

export interface LessonContent {
  introduction?: string
  dataVisualization?: DataVisualization
  questions?: Question[]
  scenario?: Scenario
}

export interface DataVisualization {
  type: "map" | "chart" | "comparison" | "timeseries"
  title: string
  description: string
  imageUrl: string
  dataSource: string
  citation: string
  resolution?: string
  realDataValues?: { date: string; value: number; unit: string }[]
  requiresResolution?: string // ID of required resolution unlock
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  xp: number
}

export interface Scenario {
  context: string
  situation: string
  choices: Choice[]
}

export interface Choice {
  text: string
  outcome: string
  isCorrect: boolean
  xp: number
}

export interface LeaderboardEntry {
  username: string
  totalXP: number
  badges: number
  streak: number
}

export interface DataResolutionUnlock {
  resolutionId: string
  unlockedAt: string
}

export interface YieldPoints {
  total: number
  spent: number
  available: number
}
