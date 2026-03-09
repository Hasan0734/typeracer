"use client"
import { TestStatus } from "@/hooks/useTypingTest"
import React, { useEffect, useRef } from "react"

interface TypingAreaProps {
  input: string
  status: TestStatus
  text: string
  onInput: (value: string) => void
}

const TypingArea = ({ input, status, text, onInput }: TypingAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [status])

  useEffect(() => {
    if (!textRef.current) return
    const currentChar = textRef.current.querySelector(".char-current")
    if (currentChar) {
      currentChar.scrollIntoView({ block: "center", behavior: "smooth" })
    }
  }, [input])

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className="roudned-lg relative cursor-text bg-card p-6 md:p-8"
      onClick={handleContainerClick}
    >
      {/* Hidden input to capture keystrokes */}
      <input
        id="text"
        name="text"
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => onInput(e.target.value)}
        disabled={status === "finished"}
        className="absolute h-0 w-0 opacity-0"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />

      <div
        ref={textRef}
        className="max-h-50 overflow-hidden font-mono text-lg leading-relaxed tracking-wide select-none md:text-2xl"
      >
        {text.split("").map((char, i) => {
          let className = "char-pending"
          if (i < input.length) {
            className = input[i] === char ? "char-correct" : "char-incorrect"
          } else if (i === input.length) {
            className = "char-current char-pending"
          }

          return (
            <span key={i} className={className}>
              {char}
            </span>
          )
        })}
      </div>

      {/* Focus hint */}

      <p className="mt-4 text-center text-xs text-muted-foreground opacity-60">
        Click here or start typing to focus
      </p>
    </div>
  )
}

export default TypingArea
