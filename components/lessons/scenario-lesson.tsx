"use client"
import { useState } from "react"
import type { Lesson } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"

interface ScenarioLessonProps {
  lesson: Lesson
  onComplete: (xpEarned: number) => void
}

export default function ScenarioLesson({ lesson, onComplete }: ScenarioLessonProps) {
  const scenario = lesson.content.scenario
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)

  if (!scenario) return null

  const handleChoiceSelect = (choiceIndex: number) => {
    if (showOutcome) return
    setSelectedChoice(choiceIndex)
  }

  const handleSubmitChoice = () => {
    if (selectedChoice === null) return
    setShowOutcome(true)
  }

  const handleComplete = () => {
    if (selectedChoice === null) return
    const choice = scenario.choices[selectedChoice]
    onComplete(choice.xp)
  }

  return (
    <div className="space-y-6">
      {/* Context */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h3 className="text-lg font-bold mb-2">Context</h3>
        <p className="text-muted-foreground">{scenario.context}</p>
      </Card>

      {/* Situation */}
      <div className="prose max-w-none">
        <h3 className="text-xl font-bold mb-3">Situation</h3>
        <p className="text-lg leading-relaxed">{scenario.situation}</p>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold">What do you do?</h3>

        {scenario.choices.map((choice, index) => {
          const isSelected = selectedChoice === index
          const showCorrectness = showOutcome

          return (
            <button
              key={index}
              onClick={() => handleChoiceSelect(index)}
              disabled={showOutcome}
              className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                isSelected && !showCorrectness
                  ? "border-primary bg-primary/10"
                  : showCorrectness && isSelected && choice.isCorrect
                    ? "border-green-500 bg-green-50"
                    : showCorrectness && isSelected && !choice.isCorrect
                      ? "border-amber-500 bg-amber-50"
                      : "border-border bg-white hover:border-primary/50"
              } ${showOutcome ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-medium flex-1">{choice.text}</span>
                {showCorrectness && isSelected && choice.isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
                {showCorrectness && isSelected && !choice.isCorrect && (
                  <XCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Outcome */}
      {showOutcome && selectedChoice !== null && (
        <Card
          className={`p-6 ${
            scenario.choices[selectedChoice].isCorrect ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-start gap-3">
            {scenario.choices[selectedChoice].isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            ) : (
              <XCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            )}
            <div>
              <h4 className="font-bold mb-2">Outcome</h4>
              <p className="text-muted-foreground mb-2">{scenario.choices[selectedChoice].outcome}</p>
              <p className="text-sm font-semibold text-primary">+{scenario.choices[selectedChoice].xp} XP</p>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showOutcome ? (
          <Button onClick={handleSubmitChoice} disabled={selectedChoice === null} size="lg">
            Submit Decision
          </Button>
        ) : (
          <Button onClick={handleComplete} size="lg">
            Complete Lesson (+{selectedChoice !== null ? scenario.choices[selectedChoice].xp : 0} XP)
          </Button>
        )}
      </div>
    </div>
  )
}
