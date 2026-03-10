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

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now()
    setStatus("running")

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const remaining = Math.max(duration - elapsed, 0)

      console.log({ elapsed, remaining })
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

      setInput(value)
    },
    [status, startTimer, text]
  )

  const restart = () => {
    setInput("")
    setStatus("idle")
    setText(generateParagraph(40, difficult))
  }

  // restart when difficulty or duration changes

  useEffect(() => {
    restart()
  }, [duration, difficult])

  return { text, input, status, restart, onInput, stats, timeLeft }
}
