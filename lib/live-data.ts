// Real-time NASA data simulation service
// In production, this would connect to NASA GIBS, LANCE, and weather APIs

export interface LiveConditions {
  location: string
  timestamp: string
  soilMoisture: number // 0-1 scale
  ndvi: number // 0-1 scale
  temperature: number // Celsius
  humidity: number // percentage
  precipitation: number // mm
  evapotranspiration: number // mm/day
  status: "excellent" | "good" | "warning" | "critical"
  alerts: string[]
}

export interface WeatherForecast {
  date: string
  temperature: { min: number; max: number }
  precipitation: number
  humidity: number
  condition: string
  icon: string
}

export interface DailyChallenge {
  id: string
  title: string
  description: string
  scenario: string
  options: {
    id: string
    text: string
    waterCost: number
    budgetCost: number
    isCorrect: boolean
    feedback: string
  }[]
  xpReward: number
  generatedFrom: string
}

// Simulate real-time NASA data with realistic variations
export function getLiveConditions(): LiveConditions {
  const now = new Date()
  const hour = now.getHours()

  // Simulate daily and seasonal patterns
  const baseTemp = 28 + Math.sin((hour / 24) * Math.PI * 2) * 5
  const baseMoisture = 0.35 + Math.sin((now.getDate() / 30) * Math.PI) * 0.15
  const baseNDVI = 0.72 + Math.cos((now.getDate() / 30) * Math.PI) * 0.08

  const soilMoisture = Math.max(0.1, Math.min(0.9, baseMoisture + (Math.random() - 0.5) * 0.05))
  const ndvi = Math.max(0.3, Math.min(0.95, baseNDVI + (Math.random() - 0.5) * 0.03))
  const temperature = baseTemp + (Math.random() - 0.5) * 2
  const humidity = 65 + Math.sin((hour / 24) * Math.PI * 2) * 15 + (Math.random() - 0.5) * 5
  const precipitation = Math.random() < 0.15 ? Math.random() * 10 : 0
  const evapotranspiration = 4.5 + (temperature - 28) * 0.2

  // Determine status and alerts
  let status: LiveConditions["status"] = "good"
  const alerts: string[] = []

  if (soilMoisture < 0.25) {
    status = "critical"
    alerts.push("Critical: Soil moisture below 25% - immediate irrigation recommended")
  } else if (soilMoisture < 0.35) {
    status = "warning"
    alerts.push("Warning: Low soil moisture detected - plan irrigation within 24 hours")
  }

  if (ndvi < 0.5) {
    status = status === "critical" ? "critical" : "warning"
    alerts.push("Warning: NDVI indicates potential crop stress - investigate field conditions")
  }

  if (temperature > 35) {
    alerts.push("High temperature alert - monitor for heat stress")
  }

  if (alerts.length === 0) {
    status = soilMoisture > 0.5 && ndvi > 0.7 ? "excellent" : "good"
  }

  return {
    location: "Thanjavur District, Tamil Nadu",
    timestamp: now.toISOString(),
    soilMoisture,
    ndvi,
    temperature,
    humidity,
    precipitation,
    evapotranspiration,
    status,
    alerts,
  }
}

export function getWeatherForecast(): WeatherForecast[] {
  const forecast: WeatherForecast[] = []
  const now = new Date()

  for (let i = 0; i < 7; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() + i)

    const baseTemp = 28 + Math.sin((i / 7) * Math.PI) * 4
    const rainChance = Math.random()

    forecast.push({
      date: date.toISOString().split("T")[0],
      temperature: {
        min: Math.round(baseTemp - 3 + Math.random() * 2),
        max: Math.round(baseTemp + 5 + Math.random() * 2),
      },
      precipitation: rainChance > 0.7 ? Math.round(Math.random() * 20) : 0,
      humidity: Math.round(60 + Math.random() * 20),
      condition: rainChance > 0.7 ? "Rainy" : rainChance > 0.4 ? "Cloudy" : "Sunny",
      icon: rainChance > 0.7 ? "🌧️" : rainChance > 0.4 ? "☁️" : "☀️",
    })
  }

  return forecast
}

export function generateDailyChallenge(liveData: LiveConditions, forecast: WeatherForecast[]): DailyChallenge {
  const challenges: DailyChallenge[] = []

  // Challenge 1: Low soil moisture + no rain forecast
  if (liveData.soilMoisture < 0.35 && forecast.slice(0, 3).every((f) => f.precipitation === 0)) {
    challenges.push({
      id: `challenge-${Date.now()}-1`,
      title: "Critical Irrigation Decision",
      description: "Low soil moisture detected with no rain forecast for 3 days",
      scenario: `Current SMAP data shows soil moisture at ${Math.round(liveData.soilMoisture * 100)}% in your rice fields. The 3-day forecast shows no precipitation. Your crops are entering a critical growth phase.`,
      options: [
        {
          id: "opt1",
          text: "Flood irrigate all fields immediately (traditional method)",
          waterCost: 100,
          budgetCost: 50,
          isCorrect: false,
          feedback:
            "While this ensures water reaches all areas, flood irrigation wastes significant water. SMAP data can help you target specific zones.",
        },
        {
          id: "opt2",
          text: "Use SMAP data to identify driest zones and apply targeted drip irrigation",
          waterCost: 40,
          budgetCost: 30,
          isCorrect: true,
          feedback:
            "Excellent! Using satellite data for precision irrigation saves 60% water while maintaining crop health. This is sustainable farming!",
        },
        {
          id: "opt3",
          text: "Wait another day to see if conditions improve",
          waterCost: 0,
          budgetCost: 0,
          isCorrect: false,
          feedback:
            "Delaying irrigation when SMAP shows critical moisture levels risks permanent crop damage. Act on the data!",
        },
      ],
      xpReward: 150,
      generatedFrom: "Low soil moisture + no rain forecast",
    })
  }

  // Challenge 2: NDVI drop detected
  if (liveData.ndvi < 0.6) {
    challenges.push({
      id: `challenge-${Date.now()}-2`,
      title: "Crop Health Alert",
      description: "NDVI analysis shows declining plant health in one field",
      scenario: `Latest Landsat NDVI data shows a drop to ${Math.round(liveData.ndvi * 100)}% in Field B, while surrounding fields remain healthy at 75-80%. This isolated decline needs investigation.`,
      options: [
        {
          id: "opt1",
          text: "Apply fertilizer to all fields as preventive measure",
          waterCost: 20,
          budgetCost: 80,
          isCorrect: false,
          feedback:
            "Blanket treatment is expensive and unnecessary. NDVI data shows the issue is localized - investigate the specific field first.",
        },
        {
          id: "opt2",
          text: "Physically inspect Field B for pests, disease, or drainage issues",
          waterCost: 0,
          budgetCost: 10,
          isCorrect: true,
          feedback:
            "Perfect! NDVI identified the problem area. Ground-truthing the satellite data helps you find the root cause efficiently.",
        },
        {
          id: "opt3",
          text: "Ignore it - NDVI fluctuations are normal",
          waterCost: 0,
          budgetCost: 0,
          isCorrect: false,
          feedback:
            "An isolated NDVI drop is a red flag. Early detection via satellite data is your advantage - use it to prevent larger problems!",
        },
      ],
      xpReward: 150,
      generatedFrom: "Low NDVI detected",
    })
  }

  // Challenge 3: High evapotranspiration
  if (liveData.evapotranspiration > 5.5 && liveData.temperature > 32) {
    challenges.push({
      id: `challenge-${Date.now()}-3`,
      title: "Heat Stress Management",
      description: "ECOSTRESS shows high evapotranspiration rates",
      scenario: `ECOSTRESS thermal data indicates evapotranspiration at ${liveData.evapotranspiration.toFixed(1)} mm/day with temperatures at ${Math.round(liveData.temperature)}°C. Your crops are losing water faster than normal.`,
      options: [
        {
          id: "opt1",
          text: "Increase irrigation frequency to compensate for water loss",
          waterCost: 80,
          budgetCost: 40,
          isCorrect: false,
          feedback:
            "More water helps but doesn't address heat stress. Consider timing and methods that reduce evaporation.",
        },
        {
          id: "opt2",
          text: "Schedule irrigation for early morning when evapotranspiration is lowest",
          waterCost: 50,
          budgetCost: 25,
          isCorrect: true,
          feedback:
            "Excellent use of ECOSTRESS data! Morning irrigation minimizes evaporation losses and maximizes water efficiency.",
        },
        {
          id: "opt3",
          text: "Reduce irrigation to conserve water during heat wave",
          waterCost: 20,
          budgetCost: 10,
          isCorrect: false,
          feedback:
            "Reducing water during high evapotranspiration will stress crops. Use the thermal data to optimize timing instead.",
        },
      ],
      xpReward: 150,
      generatedFrom: "High evapotranspiration + high temperature",
    })
  }

  // Default challenge if no specific conditions met
  if (challenges.length === 0) {
    challenges.push({
      id: `challenge-${Date.now()}-default`,
      title: "Optimal Conditions Monitoring",
      description: "Conditions are good - practice preventive management",
      scenario: `Current conditions are favorable: soil moisture at ${Math.round(liveData.soilMoisture * 100)}%, NDVI at ${Math.round(liveData.ndvi * 100)}%. This is the perfect time for preventive monitoring.`,
      options: [
        {
          id: "opt1",
          text: "Continue current irrigation schedule without changes",
          waterCost: 50,
          budgetCost: 25,
          isCorrect: false,
          feedback:
            "Good conditions allow you to optimize. Check if you can reduce water use while maintaining crop health.",
        },
        {
          id: "opt2",
          text: "Use this time to analyze historical SMAP data and optimize future irrigation",
          waterCost: 0,
          budgetCost: 5,
          isCorrect: true,
          feedback:
            "Excellent! Using good conditions to learn from data helps you prepare for future challenges. This is proactive farming!",
        },
        {
          id: "opt3",
          text: "Increase irrigation to build up soil moisture reserves",
          waterCost: 80,
          budgetCost: 40,
          isCorrect: false,
          feedback:
            "Over-irrigation wastes water and can harm crops. Trust the satellite data - current levels are optimal.",
        },
      ],
      xpReward: 100,
      generatedFrom: "Optimal conditions",
    })
  }

  return challenges[0]
}

// Get historical data for time-slider visualization
export function getHistoricalData(
  year: number,
  month: number,
): {
  date: string
  soilMoisture: number
  ndvi: number
  temperature: number
}[] {
  const data = []
  const daysInMonth = new Date(year, month, 0).getDate()

  // Simulate 2018 drought pattern for historical module
  const isDrought = year === 2018 && month >= 6 && month <= 9

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 86400000)

    let soilMoisture = 0.45 + Math.sin((dayOfYear / 365) * Math.PI * 2) * 0.15
    let ndvi = 0.75 + Math.cos((dayOfYear / 365) * Math.PI * 2) * 0.1

    if (isDrought) {
      // Simulate drought conditions
      const droughtSeverity = (month - 6) / 4 // Increases from June to September
      soilMoisture = Math.max(0.15, soilMoisture - droughtSeverity * 0.25)
      ndvi = Math.max(0.35, ndvi - droughtSeverity * 0.2)
    }

    data.push({
      date: date.toISOString().split("T")[0],
      soilMoisture: Math.round(soilMoisture * 100) / 100,
      ndvi: Math.round(ndvi * 100) / 100,
      temperature: 28 + Math.sin((dayOfYear / 365) * Math.PI * 2) * 6 + (isDrought ? 3 : 0),
    })
  }

  return data
}
