"use client"
import { useState } from "react"
import type { Lesson } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface TutorialLessonProps {
  lesson: Lesson
  onComplete: (xpEarned: number) => void
}

export default function TutorialLesson({ lesson, onComplete }: TutorialLessonProps) {
  const [hasRead, setHasRead] = useState(false)

  const handleComplete = () => {
    onComplete(lesson.xpReward)
  }

  return (
    <div className="space-y-6">
      {/* Introduction */}
      {lesson.content.introduction && (
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{lesson.content.introduction}</p>
        </div>
      )}

      {/* Data Visualization */}
      {lesson.content.dataVisualization && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-xl font-bold mb-3">{lesson.content.dataVisualization.title}</h3>

          <div className="mb-4 rounded-lg overflow-hidden border-2 border-blue-300">
            <Image
              src={lesson.content.dataVisualization.imageUrl || "/placeholder.svg"}
              alt={lesson.content.dataVisualization.title}
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>

          <p className="text-muted-foreground mb-3">{lesson.content.dataVisualization.description}</p>

          <div className="bg-white rounded-lg p-3 text-sm border border-blue-200">
            <p className="font-semibold mb-1">Data Source: {lesson.content.dataVisualization.dataSource}</p>
            <p className="text-xs text-muted-foreground">{lesson.content.dataVisualization.citation}</p>
          </div>
        </Card>
      )}

      {/* Completion */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="read-confirmation"
            checked={hasRead}
            onChange={(e) => setHasRead(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="read-confirmation" className="text-sm cursor-pointer">
            I've read and understood this lesson
          </label>
        </div>

        <Button onClick={handleComplete} disabled={!hasRead} size="lg">
          Complete Lesson (+{lesson.xpReward} XP)
        </Button>
      </div>
    </div>
  )
}
