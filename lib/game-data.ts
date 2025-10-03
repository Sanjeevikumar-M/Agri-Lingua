// Game content and module data for Agri-Lingua

import type { Module, Badge } from "./types"

export const BADGES: Record<string, Badge> = {
  FIRST_STEPS: {
    id: "first_steps",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🌱",
    earnedAt: "",
  },
  SOIL_MASTER: {
    id: "soil_master",
    name: "Soil Moisture Master",
    description: "Complete Module 1",
    icon: "💧",
    earnedAt: "",
  },
  PLANT_DOCTOR: {
    id: "plant_doctor",
    name: "Plant Health Doctor",
    description: "Complete Module 2",
    icon: "🌾",
    earnedAt: "",
  },
  WATER_WIZARD: {
    id: "water_wizard",
    name: "Water Management Wizard",
    description: "Complete Module 3",
    icon: "🚰",
    earnedAt: "",
  },
  RADAR_EXPERT: {
    id: "radar_expert",
    name: "Radar Expert",
    description: "Complete Module 4",
    icon: "📡",
    earnedAt: "",
  },
  DROUGHT_HERO: {
    id: "drought_hero",
    name: "Drought Hero",
    description: "Complete Module 5",
    icon: "🏆",
    earnedAt: "",
  },
  STREAK_WARRIOR: {
    id: "streak_warrior",
    name: "Streak Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    earnedAt: "",
  },
  PERFECT_SCORE: {
    id: "perfect_score",
    name: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: "⭐",
    earnedAt: "",
  },
}

export const MODULES: Module[] = [
  {
    id: 1,
    title: "Soil Moisture Basics",
    description: "Learn to read SMAP data and understand soil moisture for rice farming",
    icon: "💧",
    xpReward: 100,
    isLocked: false,
    lessons: [
      {
        id: "mod1-lesson1",
        moduleId: 1,
        title: "What is Soil Moisture?",
        type: "tutorial",
        xpReward: 20,
        completed: false,
        content: {
          introduction:
            "Soil moisture is the water stored in the soil. For rice farming in Thanjavur, maintaining proper soil moisture is crucial for healthy crop growth.",
          dataVisualization: {
            type: "map",
            title: "SMAP Soil Moisture Map - Thanjavur Region",
            description:
              "This map shows soil moisture levels across the Thanjavur district. Blue areas have high moisture, while red areas are dry.",
            imageUrl: "/satellite-soil-moisture-map-of-agricultural-region.jpg",
            dataSource: "NASA SMAP",
            citation: "Data: NASA Soil Moisture Active Passive (SMAP) Mission",
          },
        },
      },
      {
        id: "mod1-lesson2",
        moduleId: 1,
        title: "Reading SMAP Data",
        type: "quiz",
        xpReward: 30,
        completed: false,
        content: {
          questions: [
            {
              id: "q1",
              question: "What does a blue zone on a SMAP soil moisture map indicate?",
              options: ["Dry soil", "High soil moisture", "No data available", "Rocky terrain"],
              correctAnswer: 1,
              explanation: "Blue zones indicate high soil moisture content, which is ideal for rice cultivation.",
              xp: 10,
            },
            {
              id: "q2",
              question: "When should you irrigate your rice field based on SMAP data?",
              options: [
                "When the map shows blue",
                "When the map shows red/orange",
                "Only during monsoon",
                "Never use satellite data",
              ],
              correctAnswer: 1,
              explanation: "Red or orange zones indicate low soil moisture, signaling the need for irrigation.",
              xp: 10,
            },
            {
              id: "q3",
              question: "How often does SMAP update its soil moisture data?",
              options: ["Every hour", "Every 2-3 days", "Once a month", "Once a year"],
              correctAnswer: 1,
              explanation: "SMAP provides global soil moisture data every 2-3 days, allowing regular monitoring.",
              xp: 10,
            },
          ],
        },
      },
      {
        id: "mod1-lesson3",
        moduleId: 1,
        title: "Irrigation Decision",
        type: "scenario",
        xpReward: 50,
        completed: false,
        content: {
          scenario: {
            context: "You are Ravi, a rice farmer in Thanjavur. It's the middle of the growing season.",
            situation:
              "You check the SMAP data and see that your field shows orange-red coloring (low moisture). However, the weather forecast predicts heavy rain in 2 days. What do you do?",
            choices: [
              {
                text: "Irrigate immediately to prevent crop stress",
                outcome:
                  "Good choice! While rain is coming, 2 days of low moisture could stress your rice plants. Light irrigation now prevents damage.",
                isCorrect: true,
                xp: 50,
              },
              {
                text: "Wait for the rain to save water and money",
                outcome:
                  "Risky decision. Two days of moisture stress during the growing season can reduce your yield by 15-20%. The cost of irrigation is less than the lost harvest.",
                isCorrect: false,
                xp: 10,
              },
              {
                text: "Irrigate heavily to store water in the soil",
                outcome:
                  "Not ideal. Over-irrigation before heavy rain can lead to waterlogging and root damage. Light irrigation would be better.",
                isCorrect: false,
                xp: 20,
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 2,
    title: "Plant Health Monitoring",
    description: "Use Landsat and ECOSTRESS data to monitor crop health and stress",
    icon: "🌾",
    xpReward: 150,
    isLocked: true,
    lessons: [
      {
        id: "mod2-lesson1",
        moduleId: 2,
        title: "Understanding NDVI",
        type: "tutorial",
        xpReward: 25,
        completed: false,
        content: {
          introduction:
            "NDVI (Normalized Difference Vegetation Index) helps us see how healthy plants are from space. Healthy rice plants appear bright green on NDVI maps.",
          dataVisualization: {
            type: "comparison",
            title: "Healthy vs Stressed Rice Fields",
            description: "Compare NDVI values: Healthy fields (0.6-0.9) vs stressed fields (0.2-0.4)",
            imageUrl: "/split-comparison-of-healthy-green-crops-versus-str.jpg",
            dataSource: "Landsat 8/9",
            citation: "Data: USGS Landsat 8/9 OLI",
          },
        },
      },
      {
        id: "mod2-lesson2",
        moduleId: 2,
        title: "NDVI Quiz",
        type: "quiz",
        xpReward: 35,
        completed: false,
        content: {
          questions: [
            {
              id: "q4",
              question: "What NDVI value range indicates healthy rice crops?",
              options: ["0.0 - 0.2", "0.2 - 0.4", "0.6 - 0.9", "1.0 - 1.5"],
              correctAnswer: 2,
              explanation: "Healthy, dense vegetation typically shows NDVI values between 0.6 and 0.9.",
              xp: 12,
            },
            {
              id: "q5",
              question: "If your field shows declining NDVI over two weeks, what might be wrong?",
              options: [
                "Plants are growing normally",
                "Possible pest damage or water stress",
                "Soil is too fertile",
                "Nothing, NDVI always decreases",
              ],
              correctAnswer: 1,
              explanation: "Declining NDVI indicates plant stress from pests, disease, or inadequate water.",
              xp: 12,
            },
            {
              id: "q6",
              question: "Which satellite provides NDVI data for free?",
              options: [
                "Only commercial satellites",
                "Landsat (USGS)",
                "No satellites provide this",
                "You must buy drones",
              ],
              correctAnswer: 1,
              explanation: "Landsat satellites provide free, open-access NDVI data for the entire world.",
              xp: 11,
            },
          ],
        },
      },
      {
        id: "mod2-lesson3",
        moduleId: 2,
        title: "Thermal Stress Detection",
        type: "tutorial",
        xpReward: 40,
        completed: false,
        content: {
          introduction:
            "ECOSTRESS measures plant temperature from space. When plants are water-stressed, they heat up because they can't cool themselves through transpiration.",
          dataVisualization: {
            type: "map",
            title: "ECOSTRESS Thermal Map",
            description: "Hot spots (red) indicate water-stressed plants. Cool areas (blue) show well-watered crops.",
            imageUrl: "/thermal-infrared-satellite-map-showing-temperature.jpg",
            dataSource: "NASA ECOSTRESS",
            citation: "Data: NASA ECOSTRESS on ISS",
          },
        },
      },
      {
        id: "mod2-lesson4",
        moduleId: 2,
        title: "Crop Health Challenge",
        type: "scenario",
        xpReward: 50,
        completed: false,
        content: {
          scenario: {
            context: "You notice a section of your rice field showing lower NDVI values than the rest.",
            situation: "The ECOSTRESS data shows this area is also warmer. What is the most likely cause and solution?",
            choices: [
              {
                text: "Irrigation system malfunction - check and repair irrigation in that zone",
                outcome:
                  "Excellent diagnosis! Lower NDVI + higher temperature = water stress. Fixing irrigation will restore plant health.",
                isCorrect: true,
                xp: 50,
              },
              {
                text: "Too much fertilizer - stop fertilizing",
                outcome:
                  "Unlikely. Excess fertilizer doesn't typically cause both low NDVI and high temperature together.",
                isCorrect: false,
                xp: 10,
              },
              {
                text: "Normal variation - do nothing",
                outcome:
                  "Ignoring the signs could lead to significant yield loss in that section. Early intervention is key.",
                isCorrect: false,
                xp: 5,
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 3,
    title: "Water Management",
    description: "Optimize irrigation using satellite data and weather forecasts",
    icon: "🚰",
    xpReward: 150,
    isLocked: true,
    lessons: [
      {
        id: "mod3-lesson1",
        moduleId: 3,
        title: "Irrigation Scheduling",
        type: "tutorial",
        xpReward: 30,
        completed: false,
        content: {
          introduction:
            "Smart irrigation scheduling combines SMAP soil moisture data with weather forecasts to optimize water use and maximize crop yields.",
          dataVisualization: {
            type: "chart",
            title: "Optimal Irrigation Schedule",
            description: "This chart shows when to irrigate based on soil moisture levels and weather predictions.",
            imageUrl: "/irrigation-schedule-chart-with-soil-moisture-and-r.jpg",
            dataSource: "SMAP + Weather Data",
            citation: "Data: NASA SMAP + NOAA Weather Forecasts",
          },
        },
      },
      {
        id: "mod3-lesson2",
        moduleId: 3,
        title: "Water Conservation",
        type: "scenario",
        xpReward: 50,
        completed: false,
        content: {
          scenario: {
            context: "Water is scarce this season, and you need to conserve while maintaining crop health.",
            situation:
              "SMAP shows moderate soil moisture (50%), but the forecast predicts no rain for 10 days. Your rice is in the critical flowering stage. What's your strategy?",
            choices: [
              {
                text: "Irrigate every 3 days with reduced water amounts",
                outcome:
                  "Excellent! Frequent light irrigation during flowering maintains moisture without waste. Your yield stays high while using 30% less water.",
                isCorrect: true,
                xp: 50,
              },
              {
                text: "Wait until soil moisture drops to 30% before irrigating",
                outcome:
                  "Risky during flowering. The stress period reduced your yield by 25%. Earlier intervention would have been better.",
                isCorrect: false,
                xp: 15,
              },
              {
                text: "Flood irrigate once to saturate the soil",
                outcome:
                  "Wasteful approach. Much water was lost to runoff and deep percolation. Your yield is good but water use was inefficient.",
                isCorrect: false,
                xp: 20,
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 4,
    title: "SAR Data Mastery",
    description: "Use radar data to monitor fields in any weather condition",
    icon: "📡",
    xpReward: 200,
    isLocked: true,
    lessons: [
      {
        id: "mod4-lesson1",
        moduleId: 4,
        title: "Understanding SAR",
        type: "tutorial",
        xpReward: 40,
        completed: false,
        content: {
          introduction:
            "Synthetic Aperture Radar (SAR) uses radio waves to see through clouds and darkness. Unlike optical satellites, SAR works in any weather, making it perfect for monsoon season monitoring.",
          dataVisualization: {
            type: "comparison",
            title: "Optical vs SAR Imaging",
            description:
              "Left: Optical satellite blocked by clouds. Right: SAR penetrates clouds to show field conditions.",
            imageUrl: "/split-comparison-optical-satellite-cloudy-versus-s.jpg",
            dataSource: "Sentinel-1 SAR",
            citation: "Data: ESA Sentinel-1 SAR",
          },
        },
      },
    ],
  },
  {
    id: 5,
    title: "Historical Drought Analysis",
    description: "Learn from the 2016 Thanjavur drought using real NASA data",
    icon: "🏆",
    xpReward: 250,
    isLocked: true,
    lessons: [
      {
        id: "mod5-lesson1",
        moduleId: 5,
        title: "The 2016 Drought",
        type: "tutorial",
        xpReward: 50,
        completed: false,
        content: {
          introduction:
            "In 2016, Thanjavur district faced severe drought. By analyzing historical NASA data, we can learn how early warning signs appeared months before the crisis.",
          dataVisualization: {
            type: "chart",
            title: "Thanjavur Soil Moisture 2016",
            description:
              "SMAP data showing declining soil moisture from January to June 2016, indicating drought conditions.",
            imageUrl: "/line-chart-showing-declining-soil-moisture-over-ti.jpg",
            dataSource: "NASA SMAP Historical",
            citation: "Data: NASA SMAP Mission Archive 2016",
          },
        },
      },
      {
        id: "mod5-lesson2",
        moduleId: 5,
        title: "Drought Response Challenge",
        type: "scenario",
        xpReward: 100,
        completed: false,
        content: {
          scenario: {
            context: "It's March 2016. You notice SMAP data showing declining soil moisture for 6 weeks.",
            situation:
              "Historical weather data shows this pattern led to severe drought. Your rice is planted. What do you do?",
            choices: [
              {
                text: "Switch to drought-resistant rice varieties for next season and conserve water now",
                outcome:
                  "Wise decision! You minimized losses this season and prepared for the future. Your farm survived the drought better than neighbors.",
                isCorrect: true,
                xp: 100,
              },
              {
                text: "Continue normal irrigation and hope for rain",
                outcome:
                  "The drought worsened. By June, water sources dried up and your crop failed. Early action could have saved the harvest.",
                isCorrect: false,
                xp: 20,
              },
              {
                text: "Harvest early to salvage what you can",
                outcome:
                  "Practical but not optimal. You saved some crop but yield was only 40% of normal. Better water management could have improved this.",
                isCorrect: false,
                xp: 50,
              },
            ],
          },
        },
      },
    ],
  },
]
