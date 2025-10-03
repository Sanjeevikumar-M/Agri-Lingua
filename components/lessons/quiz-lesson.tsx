"use client"
import { useState } from "react"
import type { Lesson } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"

interface QuizLessonProps {
  lesson: Lesson
  onComplete: (xpEarned: number) => void
}

export default function QuizLesson({ lesson, onComplete }: QuizLessonProps) {
  const questions = lesson.content.questions || []
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [totalXP, setTotalXP] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false))

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const allQuestionsAnswered = answeredQuestions.every((answered) => answered)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const xpEarned = isCorrect ? currentQuestion.xp : Math.floor(currentQuestion.xp / 2)

    setTotalXP(totalXP + xpEarned)
    setShowExplanation(true)

    const newAnsweredQuestions = [...answeredQuestions]
    newAnsweredQuestions[currentQuestionIndex] = true
    setAnsweredQuestions(newAnsweredQuestions)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onComplete(totalXP)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="font-semibold text-primary">Total XP: {totalXP}</span>
      </div>

      {/* Question */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-xl font-bold mb-6">{currentQuestion.question}</h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === currentQuestion.correctAnswer
            const showCorrectness = showExplanation

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  isSelected && !showCorrectness
                    ? "border-primary bg-primary/10"
                    : showCorrectness && isCorrect
                      ? "border-green-500 bg-green-50"
                      : showCorrectness && isSelected && !isCorrect
                        ? "border-red-500 bg-red-50"
                        : "border-border bg-white hover:border-primary/50"
                } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showCorrectness && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                  {showCorrectness && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold mb-2">Explanation</h4>
              <p className="text-muted-foreground">{currentQuestion.explanation}</p>
              <p className="text-sm font-semibold text-primary mt-2">
                +
                {selectedAnswer === currentQuestion.correctAnswer
                  ? currentQuestion.xp
                  : Math.floor(currentQuestion.xp / 2)}{" "}
                XP
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showExplanation ? (
          <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} size="lg">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} size="lg">
            {isLastQuestion ? `Complete Quiz (+${totalXP} XP)` : "Next Question"}
          </Button>
        )}
      </div>
    </div>
  )
}
