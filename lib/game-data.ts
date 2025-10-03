// Game content and module data for Agri-Lingua
// Updated with Real NASA Data Integration

import type { Module, Badge } from "./types"
import { THANJAVUR_SMAP_DATA, THANJAVUR_ECOSTRESS_DATA } from "./nasa-data"

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
            "Soil moisture is the water stored in the soil. For rice farming in Thanjavur, maintaining proper soil moisture is crucial for healthy crop growth. NASA's SMAP satellite measures soil moisture from space every 2-3 days at 9km resolution.",
          dataVisualization: {
            type: "map",
            title: "SMAP Soil Moisture Map - Thanjavur Region",
            description:
              "This map shows soil moisture levels across the Thanjavur district. Blue areas have high moisture (>0.35 cm³/cm³), while red areas are dry (<0.20 cm³/cm³). The data shown is from January 2023.",
            imageUrl: "/satellite-soil-moisture-map-of-agricultural-region.jpg",
            dataSource: "NASA SMAP L3",
            citation: "Data: NASA Soil Moisture Active Passive (SMAP) Mission, Level 3, 9km resolution",
            resolution: "9km",
            realDataValues: THANJAVUR_SMAP_DATA.soilMoisture.slice(14, 15).map((d) => ({
              date: d.date,
              value: d.value,
              unit: d.unit,
            })),
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
              question:
                "Based on real SMAP data, what was the soil moisture level in Thanjavur on January 15, 2023? (Source: NASA SMAP L3, 9km resolution)",
              options: [
                "0.15 cm³/cm³ (Very Dry)",
                "0.35 cm³/cm³ (Moderate)",
                "0.50 cm³/cm³ (Saturated)",
                "No data available",
              ],
              correctAnswer: 1,
              explanation:
                "SMAP recorded 0.35 cm³/cm³ on that date, indicating moderate soil moisture suitable for rice cultivation.",
              xp: 10,
            },
            {
              id: "q2",
              question: "When should you irrigate your rice field based on SMAP data?",
              options: [
                "When soil moisture is above 0.40 cm³/cm³",
                "When soil moisture drops below 0.25 cm³/cm³",
                "Only during monsoon",
                "Never use satellite data",
              ],
              correctAnswer: 1,
              explanation:
                "For rice, irrigation is needed when soil moisture drops below 0.25 cm³/cm³ to prevent crop stress.",
              xp: 10,
            },
            {
              id: "q3",
              question: "What is the spatial resolution of SMAP soil moisture data?",
              options: ["1km", "9km", "30km", "100km"],
              correctAnswer: 1,
              explanation:
                "SMAP Level 3 data provides soil moisture at 9km resolution, suitable for regional agricultural monitoring.",
              xp: 10,
            },
          ],
        },
      },
      {
        id: "mod1-lesson3",
        moduleId: 1,
        title: "Real Data Irrigation Decision",
        type: "scenario",
        xpReward: 50,
        completed: false,
        content: {
          scenario: {
            context:
              "You are Ravi, a rice farmer in Thanjavur. It's March 15, 2018. According to real SMAP data, soil moisture is at 0.19 cm³/cm³ (Source: NASA SMAP L3, 9km).",
            situation:
              "This is significantly below the optimal range of 0.30-0.45 cm³/cm³ for rice. The weather forecast predicts light rain in 3 days. What do you do?",
            choices: [
              {
                text: "Irrigate immediately - soil moisture is critically low",
                outcome:
                  "Excellent decision! Historical data shows this was during the 2018 drought. Your immediate action prevented crop stress. The light rain only brought soil moisture to 0.22 cm³/cm³, still requiring irrigation.",
                isCorrect: true,
                xp: 50,
              },
              {
                text: "Wait for the rain to save water and money",
                outcome:
                  "Poor choice. The 2018 drought data shows the rain was insufficient. Soil moisture only reached 0.22 cm³/cm³, causing significant crop stress. Your yield dropped 25%.",
                isCorrect: false,
                xp: 10,
              },
              {
                text: "Reduce planted area to conserve water",
                outcome:
                  "Too late for this decision - crops are already planted. Immediate irrigation was needed. You lost 30% of your crop.",
                isCorrect: false,
                xp: 15,
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
    description: "Use Landsat and MODIS NDVI data to monitor crop health",
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
            "NDVI (Normalized Difference Vegetation Index) measures plant health from space. Values range from -1 to +1, with healthy rice showing 0.6-0.9. You start with MODIS data (250m resolution, free). Higher resolution Landsat (30m) can be unlocked with Yield Points.",
          dataVisualization: {
            type: "comparison",
            title: "Healthy vs Stressed Rice Fields - MODIS Data",
            description:
              "Left: Healthy field on March 20, 2022 (NDVI: 0.74). Right: Stressed field on May 15, 2018 (NDVI: 0.28). Notice the color difference indicating plant vigor.",
            imageUrl: "/split-comparison-of-healthy-green-crops-versus-str.jpg",
            dataSource: "MODIS Terra",
            citation: "Data: NASA MODIS Terra, 250m resolution, MOD13Q1 product",
            resolution: "250m",
            requiresResolution: "modis",
            realDataValues: [
              { date: "2022-03-20", value: 0.74, unit: "NDVI" },
              { date: "2018-05-15", value: 0.28, unit: "NDVI" },
            ],
          },
        },
      },
      {
        id: "mod2-lesson2",
        moduleId: 2,
        title: "NDVI Data Analysis Quiz",
        type: "quiz",
        xpReward: 35,
        completed: false,
        content: {
          questions: [
            {
              id: "q4",
              question:
                "Based on real Landsat data from Thanjavur, what was the peak NDVI value during the healthy 2022 crop season? (Source: Landsat 8 OLI, 30m)",
              options: ["0.28", "0.52", "0.82", "1.20"],
              correctAnswer: 2,
              explanation:
                "Landsat recorded peak NDVI of 0.82 on April 25, 2022, indicating excellent crop health during the flowering stage.",
              xp: 12,
            },
            {
              id: "q5",
              question: "What does declining NDVI from 0.42 to 0.28 over two weeks indicate (2018 drought data)?",
              options: [
                "Normal crop maturation",
                "Severe water stress or pest damage",
                "Excessive fertilizer",
                "Optimal growth",
              ],
              correctAnswer: 1,
              explanation:
                "This decline, recorded during the 2018 drought, indicates severe crop stress. Immediate intervention was needed.",
              xp: 12,
            },
            {
              id: "q6",
              question: "What is the advantage of Landsat (30m) over MODIS (250m) for your 2-hectare field?",
              options: [
                "No advantage",
                "Can detect problems in specific field sections",
                "Updates more frequently",
                "Costs less",
              ],
              correctAnswer: 1,
              explanation:
                "Landsat's 30m resolution can identify problems in specific parts of your field, enabling precision agriculture.",
              xp: 11,
            },
          ],
        },
      },
      {
        id: "mod2-lesson3",
        moduleId: 2,
        title: "ECOSTRESS Thermal Monitoring",
        type: "tutorial",
        xpReward: 40,
        completed: false,
        content: {
          introduction:
            "ECOSTRESS on the International Space Station measures plant temperature at 70m resolution. Water-stressed plants heat up because they can't cool themselves. Real data from Thanjavur shows temperature differences of 3-7°C between healthy and stressed crops.",
          dataVisualization: {
            type: "map",
            title: "ECOSTRESS Surface Temperature - Thanjavur Rice Fields",
            description:
              "April 25, 2022: Hot spots (red, 35.1°C) indicate water stress. Cool areas (blue, 28.5°C) show well-watered crops. Temperature difference of 6.6°C reveals irrigation problems.",
            imageUrl: "/thermal-infrared-satellite-map-showing-temperature.jpg",
            dataSource: "NASA ECOSTRESS",
            citation: "Data: NASA ECOSTRESS on ISS, 70m resolution, Level 2 Land Surface Temperature",
            resolution: "70m",
            realDataValues: THANJAVUR_ECOSTRESS_DATA.surfaceTemperature.slice(0, 5).map((d) => ({
              date: d.date,
              value: d.value,
              unit: d.unit,
            })),
          },
        },
      },
      {
        id: "mod2-lesson4",
        moduleId: 2,
        title: "Multi-Sensor Crop Diagnosis",
        type: "scenario",
        xpReward: 50,
        completed: false,
        content: {
          scenario: {
            context:
              "April 10, 2022: You notice one section of your field. MODIS NDVI: 0.68 (lower than field average of 0.79). ECOSTRESS temperature: 32.8°C (field average: 29.2°C).",
            situation:
              "Real NASA data shows a 4°C temperature difference and 14% lower NDVI. What's the diagnosis and solution?",
            choices: [
              {
                text: "Irrigation system malfunction in that zone - inspect and repair drip lines",
                outcome:
                  "Perfect diagnosis! The data pattern matches water stress. You found 3 clogged emitters. After repair, NDVI recovered to 0.76 within 2 weeks. Yield saved!",
                isCorrect: true,
                xp: 50,
              },
              {
                text: "Pest infestation - apply pesticides",
                outcome:
                  "Incorrect. Pests would show different patterns. The temperature + NDVI combination specifically indicates water stress. Pesticide was unnecessary expense.",
                isCorrect: false,
                xp: 10,
              },
              {
                text: "Normal field variation - monitor and wait",
                outcome:
                  "Risky. Waiting 2 weeks caused permanent yield loss of 18% in that section. Early intervention based on satellite data could have prevented this.",
                isCorrect: false,
                xp: 15,
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
    description: "Optimize irrigation using SMAP and ECOSTRESS evapotranspiration data",
    icon: "🚰",
    xpReward: 150,
    isLocked: true,
    lessons: [
      {
        id: "mod3-lesson1",
        moduleId: 3,
        title: "Evapotranspiration Science",
        type: "tutorial",
        xpReward: 30,
        completed: false,
        content: {
          introduction:
            "Evapotranspiration (ET) is water loss from soil and plants. ECOSTRESS measures actual ET at 70m resolution. Rice typically needs 4-7 mm/day. Real Thanjavur data from 2022 shows ET ranging from 4.2 to 7.2 mm/day depending on growth stage.",
          dataVisualization: {
            type: "timeseries",
            title: "ECOSTRESS Evapotranspiration - Thanjavur 2022",
            description:
              "Daily water loss from rice fields. Peak ET (7.2 mm/day) occurs during flowering. Use this to calculate precise irrigation needs.",
            imageUrl: "/irrigation-schedule-chart-with-soil-moisture-and-r.jpg",
            dataSource: "NASA ECOSTRESS",
            citation: "Data: NASA ECOSTRESS Level 3 Evapotranspiration, 70m resolution",
            resolution: "70m",
            realDataValues: THANJAVUR_ECOSTRESS_DATA.evapotranspiration.map((d) => ({
              date: d.date,
              value: d.value,
              unit: d.unit,
            })),
          },
        },
      },
      {
        id: "mod3-lesson2",
        moduleId: 3,
        title: "Precision Irrigation Challenge",
        type: "scenario",
        xpReward: 70,
        completed: false,
        content: {
          scenario: {
            context:
              "April 25, 2022 (flowering stage): ECOSTRESS shows ET = 7.2 mm/day. SMAP soil moisture = 0.38 cm³/cm³. No rain forecast for 5 days.",
            situation:
              "Your field will lose 36mm of water over 5 days (7.2 × 5). Current moisture is adequate but will drop to critical levels. Plan your irrigation strategy.",
            choices: [
              {
                text: "Irrigate 40mm on day 3 to maintain optimal moisture throughout",
                outcome:
                  "Excellent water management! You maintained soil moisture between 0.35-0.42 cm³/cm³. Crop stayed healthy, yield was 6.2 tons/hectare. Water use efficiency: optimal.",
                isCorrect: true,
                xp: 70,
              },
              {
                text: "Irrigate 80mm immediately to build up soil water reserves",
                outcome:
                  "Over-irrigation. Excess water was lost to deep percolation. You used 50% more water than needed with no yield benefit. Inefficient.",
                isCorrect: false,
                xp: 20,
              },
              {
                text: "Wait until soil moisture drops to 0.25 cm³/cm³, then irrigate",
                outcome:
                  "Too late. The crop experienced 2 days of stress during critical flowering. Yield reduced to 5.1 tons/hectare (18% loss). Satellite data warned you earlier.",
                isCorrect: false,
                xp: 25,
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: 4,
    title: "Monsoon SAR Challenge",
    description: "Master radar data to monitor fields during heavy cloud cover",
    icon: "📡",
    xpReward: 200,
    isLocked: true,
    lessons: [
      {
        id: "mod4-lesson1",
        moduleId: 4,
        title: "Why SAR Matters in Monsoon",
        type: "tutorial",
        xpReward: 40,
        completed: false,
        content: {
          introduction:
            "During monsoon season, clouds block optical satellites like Landsat for weeks. Synthetic Aperture Radar (SAR) from Sentinel-1 uses radio waves that penetrate clouds, providing all-weather monitoring at 10m resolution. This is critical for detecting flooding and crop damage.",
          dataVisualization: {
            type: "comparison",
            title: "Optical vs SAR During Monsoon",
            description:
              "Left: Landsat image blocked by clouds (no data). Right: Sentinel-1 SAR penetrates clouds, showing flooded areas (dark blue) and healthy crops (green). Same date, same location.",
            imageUrl: "/split-comparison-optical-satellite-cloudy-versus-s.jpg",
            dataSource: "Sentinel-1 SAR",
            citation: "Data: ESA Sentinel-1 C-band SAR, 10m resolution, IW mode",
            resolution: "10m",
          },
        },
      },
      {
        id: "mod4-lesson2",
        moduleId: 4,
        title: "Monsoon Flood Detection",
        type: "scenario",
        xpReward: 80,
        completed: false,
        content: {
          scenario: {
            context:
              "August 2020 monsoon: Heavy rains for 5 days. Optical satellites show only clouds. You need to check if your field is flooded.",
            situation:
              "Sentinel-1 SAR data shows very dark (low backscatter) areas in parts of your field, indicating standing water. Neighboring fields show normal backscatter. What do you do?",
            choices: [
              {
                text: "Immediately check drainage channels and pump out excess water",
                outcome:
                  "Excellent use of SAR data! You identified flooding 3 days before optical satellites could see through clouds. Quick drainage saved your crop. Neighbors who waited lost 40% yield to waterlogging.",
                isCorrect: true,
                xp: 80,
              },
              {
                text: "Wait for clouds to clear to confirm with optical satellite",
                outcome:
                  "Clouds persisted for 8 more days. By the time Landsat confirmed flooding, your rice suffered severe root damage from prolonged waterlogging. Yield loss: 35%.",
                isCorrect: false,
                xp: 20,
              },
              {
                text: "Ignore SAR data - it's too complex and might be wrong",
                outcome:
                  "Critical mistake. SAR data was accurate. Your field was flooded for 12 days before you realized it. Complete crop failure in affected areas. SAR could have saved your harvest.",
                isCorrect: false,
                xp: 10,
              },
            ],
          },
        },
      },
      {
        id: "mod4-lesson3",
        moduleId: 4,
        title: "SAR Data Mastery Quiz",
        type: "quiz",
        xpReward: 40,
        completed: false,
        content: {
          questions: [
            {
              id: "q7",
              question: "What is the key advantage of SAR over optical satellites during monsoon?",
              options: [
                "Better colors",
                "Penetrates clouds and works day/night",
                "Cheaper to access",
                "Easier to interpret",
              ],
              correctAnswer: 1,
              explanation:
                "SAR uses radio waves that penetrate clouds, providing reliable data during monsoon when optical satellites are blocked.",
              xp: 15,
            },
            {
              id: "q8",
              question: "In SAR images, what does very dark (low backscatter) indicate in agricultural fields?",
              options: ["Healthy crops", "Standing water/flooding", "Dry soil", "Buildings"],
              correctAnswer: 1,
              explanation:
                "Water appears very dark in SAR images because it reflects radar signals away from the satellite (specular reflection).",
              xp: 15,
            },
            {
              id: "q9",
              question: "Which satellite provides free SAR data for agriculture?",
              options: ["Landsat", "MODIS", "Sentinel-1", "SMAP"],
              correctAnswer: 2,
              explanation: "ESA's Sentinel-1 provides free, open-access SAR data every 6-12 days globally.",
              xp: 10,
            },
          ],
        },
      },
    ],
  },
  {
    id: 5,
    title: "2018 Drought Survival",
    description: "Navigate the historical Thanjavur drought using real NASA data",
    icon: "🏆",
    xpReward: 300,
    isLocked: true,
    lessons: [
      {
        id: "mod5-lesson1",
        moduleId: 5,
        title: "The 2018 Kaveri Delta Drought",
        type: "tutorial",
        xpReward: 50,
        completed: false,
        content: {
          introduction:
            "In 2018, Thanjavur faced its worst drought in decades. Real NASA SMAP data shows soil moisture dropped from 0.28 cm³/cm³ in January to 0.12 cm³/cm³ by May - a 57% decline. Landsat NDVI data shows crop health collapsed from 0.42 to 0.28. This module uses actual historical data to teach drought management.",
          dataVisualization: {
            type: "timeseries",
            title: "Thanjavur Soil Moisture Decline - 2018 Drought",
            description:
              "SMAP data showing 6-month decline. Red line marks critical threshold (0.20 cm³/cm³). By April, conditions were severe.",
            imageUrl: "/line-chart-showing-declining-soil-moisture-over-ti.jpg",
            dataSource: "NASA SMAP L3 Historical",
            citation: "Data: NASA SMAP Mission Archive 2018, 9km resolution",
            resolution: "9km",
            realDataValues: THANJAVUR_SMAP_DATA.soilMoisture.slice(0, 6).map((d) => ({
              date: d.date,
              value: d.value,
              unit: d.unit,
            })),
          },
        },
      },
      {
        id: "mod5-lesson2",
        moduleId: 5,
        title: "Early Warning Recognition",
        type: "quiz",
        xpReward: 50,
        completed: false,
        content: {
          questions: [
            {
              id: "q10",
              question:
                "Based on real 2018 data, when did SMAP first show concerning soil moisture levels (below 0.25 cm³/cm³)?",
              options: ["January 15", "February 15", "March 15", "May 15"],
              correctAnswer: 1,
              explanation:
                "SMAP showed 0.24 cm³/cm³ on February 15, 2018 - the first warning sign. Farmers who acted then had better outcomes.",
              xp: 17,
            },
            {
              id: "q11",
              question: "By how much did soil moisture decline from January to May 2018?",
              options: ["10%", "25%", "57%", "75%"],
              correctAnswer: 2,
              explanation:
                "Soil moisture dropped from 0.28 to 0.12 cm³/cm³, a 57% decline indicating severe drought conditions.",
              xp: 17,
            },
            {
              id: "q12",
              question: "What was the lowest NDVI value recorded during the 2018 drought?",
              options: ["0.82", "0.52", "0.28", "0.15"],
              correctAnswer: 2,
              explanation:
                "Landsat recorded NDVI of 0.28 on May 15, 2018, indicating severe crop stress and potential failure.",
              xp: 16,
            },
          ],
        },
      },
      {
        id: "mod5-lesson3",
        moduleId: 5,
        title: "Ultimate Drought Survival Challenge",
        type: "challenge",
        xpReward: 150,
        completed: false,
        content: {
          scenario: {
            context:
              "You are transported back to January 15, 2018. You have access to real NASA data and know a severe drought is coming. Your goal: survive with minimal crop loss.",
            situation:
              "Current SMAP: 0.28 cm³/cm³ (moderate). You have 3 hectares of rice planted. Historical data shows soil moisture will drop to 0.12 cm³/cm³ by May. Choose your strategy:",
            choices: [
              {
                text: "Immediately switch to drought-resistant varieties, install drip irrigation, reduce planted area by 30%, and follow SMAP data weekly for precise irrigation timing",
                outcome:
                  "Masterful drought management! Your multi-pronged approach worked perfectly. By using real-time SMAP data for irrigation scheduling, you maintained soil moisture above 0.22 cm³/cm³. Drip irrigation reduced water use by 40%. Drought-resistant varieties yielded 4.8 tons/hectare (vs. 2.1 tons for neighbors). You not only survived - you thrived. This is the power of NASA Earth science data!",
                isCorrect: true,
                xp: 150,
              },
              {
                text: "Continue normal farming but irrigate more frequently based on SMAP warnings",
                outcome:
                  "Partial success. SMAP data helped you time irrigation better than neighbors, but water scarcity by April limited your options. Yield: 3.2 tons/hectare. Better than average (2.1) but you could have done more with earlier preparation.",
                isCorrect: false,
                xp: 60,
              },
              {
                text: "Rely on traditional methods and local weather predictions",
                outcome:
                  "Poor outcome. Traditional methods didn't account for the unprecedented severity of the 2018 drought. By the time local signs were obvious, it was too late. Yield: 1.8 tons/hectare. NASA data could have warned you 3 months earlier.",
                isCorrect: false,
                xp: 30,
              },
            ],
          },
        },
      },
    ],
  },
]
