"use client"

import { Difficulty, generateParagraph } from "@/lib/words"
import { TypingStats, useApplicationStore, useBestScore } from "@/state"
import { useCallback, useEffect, useRef, useState } from "react"

export type TypingStatus = "idle" | "running" | "finished"

export function useTyping(
  duration: number = 30,
  difficult: Difficulty = "medium"
) {
  const [input, setInput] = useState("")
  const [text, setText] = useState(() => generateParagraph(80, difficult))
  const [timeLeft, setTimeLeft] = useState(duration)

  const { status, setStatus, setStats, totalTyped, difficulty, wpm, accuracy } =
    useApplicationStore()
  const { saveBestScore } = useBestScore()

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  // Expand paragraph when user approaches the end
  useEffect(() => {
    if (text.length - 20 <= input.length) {
      setText((prev) => prev + " " + generateParagraph(80, difficult))
    }
  }, [input, text.length, difficult])

  // Stats Calculation
  const calcStats = useCallback(
    (typed: string, elapsedSec: number): TypingStats => {
      // let correct = 0
      // let incorrect = 0

      // for (let i = 0; i < typed.length; i++) {
      //   console.log(i, text.length)
      //   if (i >= text.length) {
      //     incorrect++;
      //   } else if (typed[i] === text[i]) {
      //     correct++;
      //   } else {
      //     incorrect++;
      //   }
      // }

      let correct = 0

      for(let i = 0; i < typed.length; i++) {
        if(typed[i] === text[i]){
          correct++;
        }
      }

      const incorrect = typed.length - correct;

      const elapsedMin = Math.max(elapsedSec / 60, 1 / 60)

      const grossWpm = correct / 5 / elapsedMin
      const netWpm = grossWpm - incorrect / elapsedMin
      const wpm = Math.max(0, Math.round(netWpm))
      const cpm = Math.round(correct / elapsedMin)

      const accuracy =
        typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100

      return {
        wpm,
        cpm,
        accuracy,
        correctChars: correct,
        incorrectChars: incorrect,
        totalTyped: typed.length,
      }
    },
    [text]
  )

  // Timer
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    setStatus("running")

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const remaining = Math.max(duration - elapsed, 0)

      setTimeLeft(Math.ceil(remaining))

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current)
        setStatus("finished")
      }
    }, 100)
  }, [duration])

  // Input Handler
  const onInput = useCallback(
    (value: string) => {
      if (status === "finished") return

      if (status === "idle" && value.length > 0) {
        startTimer()
      }

      // prevent typing beyond text
      if (value.length > text.length) return

      setInput(value)

      // finish if paragraph completed
      if (value.length === text.length) {
        if (timerRef.current) clearInterval(timerRef.current)
        setStatus("finished")
      }
    },
    [status, startTimer, text]
  )

  // Update Stats
  useEffect(() => {
    if (status !== "running") return

    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const newStats = calcStats(input, elapsed)

    setStats(newStats)
  }, [input, timeLeft, calcStats, status])

  useEffect(() => {
    if (status === "finished" && totalTyped > 0) {
      saveBestScore({
        wpm,
        accuracy,
        difficulty: difficulty,
        duration: duration,
        date: new Date().toISOString(),
      })
    }
  }, [status, wpm, accuracy, difficulty, duration])

  // Restart Test
  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    setInput("")
    setStatus("idle")
    setText(generateParagraph(80, difficult))
    setTimeLeft(duration)

    setStats({
      wpm: 0,
      cpm: 0,
      accuracy: 100,
      correctChars: 0,
      incorrectChars: 0,
      totalTyped: 0,
    })
  }, [duration, difficult])

  // cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // restart when settings change
  useEffect(() => {
    restart()
  }, [duration, difficult, restart])

  return {
    text,
    input,
    status,
    restart,
    onInput,
    timeLeft,
  }
}
