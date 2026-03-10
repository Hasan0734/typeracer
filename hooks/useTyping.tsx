"use client"
import { Difficulty, generateParagraph } from "@/lib/words"
import { useCallback, useEffect, useRef, useState } from "react"

export interface TypingStats {
  wpm: number
  cpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number
  totalTyped: number
}

export type TypingStatus = "idle" | "running" | "finished"

export function useTyping(
  duration: number = 30,
  difficult: Difficulty = "medium"
) {
  const [input, setInput] = useState("")
  const [status, setStatus] = useState<TypingStatus>("idle")
  const [text, setText] = useState(() => generateParagraph(40, difficult))
  const [timeLeft, setTimeLeft] = useState(duration)
  const [stats, setStats] = useState({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    correctChars: 0,
    incorrectChars: 0,
    totalTyped: 0,
  })

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (text.length - 20 <= input.length)
      setText((state) => state + " " + generateParagraph(40, difficult))
  }, [input])

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

      const wpm = Math.round(correct / 5) / elapsedMin
      const cpm = Math.round(correct / elapsedMin)

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

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const remaining = Math.max(duration - elapsed, 0)

      setTimeLeft(remaining)

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current)
        setStatus("finished")
      }
    }, 100)
  }, [])

  const onInput = useCallback(
    (value: string) => {
      if (status === "finished") return

      if (status === "idle" && value.length > 0) {
        startTimer()
      }

      // don't allow typing beyound text length
      if (value.length > text.length) return
      setInput(value)

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const newStats = calcStats(value, elapsed);
      setStats(newStats);

      //if type enter text is finished;

      if(value.length == text.length) {
        if(timerRef.current) clearInterval(timerRef.current)
            setStatus("finished")
      }

    },
    [status, startTimer, text]
  )

  const restart = () => {
    setInput("")
    setStatus("idle")
    setText(generateParagraph(40, difficult))
  }


    useEffect(() => {
        return () => {
             if(timerRef.current) clearInterval(timerRef.current)
        }
  }, [duration, difficult])


  // restart when difficulty or duration changes

  useEffect(() => {
    restart()
  }, [duration, difficult])

  return { text, input, status, restart, onInput, stats, timeLeft }
}
