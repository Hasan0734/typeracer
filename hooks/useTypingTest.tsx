import { Difficulty, generateParagraph } from "@/lib/words"
import { useCallback, useEffect, useRef, useState } from "react"
import { TypingStats } from "./useTyping"



export type TestStatus = "idle" | "running" | "finished"

export function useTypingTest(
  duration: number = 60,
  difficulty: Difficulty = "medium"
) {
  const [text, setText] = useState(() => generateParagraph(80, difficulty))
  const [input, setInput] = useState("")
  const [status, setStatus] = useState<TestStatus>("idle")
  const [timeLeft, setTimeLeft] = useState(duration)
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    cpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalTyped: 0,
  })

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  // calculate stats from current input
  const calcStats = useCallback(
    (typed: string, elapsedSec: number) => {
      let correct = 0
      let incorrect = 0
      for (let i = 0; i < typed.length; i++) {
        if (typed[i] === text[i]) correct++
        else incorrect++
      }
      const totalTyped = typed.length
      const elapsedMin = Math.max(elapsedSec / 60, 0.1)

      //WPM; correct chars / 5 / minutes

      const wpm = Math.round(correct / 5) / elapsedMin;
      const cpm = Math.round(correct / elapsedMin);
      const accuracy =
        totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 100
      return {
        wpm,
        cpm,
        accuracy,
        correctChars: correct,
        incorrectChars: incorrect,
        totalTyped,
      }
    },
    [text]
  )

  // start the timer
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    setStatus("running")

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const remaining = Math.max(duration - elapsed, 0)
      setTimeLeft(remaining)

      if (remaining <= 0) {
        // timer done
        if (timerRef.current) clearInterval(timerRef.current)
        setStatus("finished")
      }
    }, 100)

  }, [])

  const handleInput = useCallback(
    (value: string) => {
      if (status === "finished") return

      // start time on first keystroke
      if (status === "idle" && value.length > 0) {
        startTimer()
      }
      // don't allow typing beyond text length
      if (value.length > text.length) return
      setInput(value)

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const newStats = calcStats(value, Math.max(elapsed, 0.1))
      setStats(newStats)

      // if typed entire text, finish
      if (value.length === text.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setStatus("finished")
      }
    },
    [status, text, startTimer, calcStats]
  )

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setText(generateParagraph(80, difficulty))
    setStatus("idle")
    setInput("")
    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 0,
      correctChars: 0,
      incorrectChars: 0,
      totalTyped: 0,
    })
  }, [difficulty, duration])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // restart when difficulty or duration changes
  useEffect(() => {
    restart()
  }, [difficulty, duration, restart])

  return { text, input, status, timeLeft, stats, handleInput, restart }
}
