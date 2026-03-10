"use client"
import { Difficulty, generateParagraph } from "@/lib/words"
import { useEffect, useState } from "react"
import { TestStatus } from "./useTypingTest"

export type TypingStatus = "idle" | "runnning" | "finished"

export function useTyping(
  duration: number = 30,
  difficult: Difficulty = "medium"
) {
  const [input, setInput] = useState("")
  const [status, setStatus] = useState<TestStatus>("idle")
  const [text, setText] = useState(() => generateParagraph(40, difficult))

  useEffect(() => {
    if (text.length - 20 <= input.length)
      setText((state) => state + " " + generateParagraph(40, difficult))
  }, [input])

  const onInput = (value: string) => {
    setInput(value)
  }

  const restart = () => {
    setInput("")
    setStatus("idle")
    setText(generateParagraph(40, difficult))
  }

  // restart when difficulty or duration changes

  useEffect(() => {
    restart()
  }, [duration, difficult])

  return { text, input, status, restart, onInput }
}
