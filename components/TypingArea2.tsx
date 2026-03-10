
import { TypingStatus } from "@/hooks/useTyping"
import { generateParagraph } from "@/lib/words"
import React, { useEffect, useRef, useState } from "react"

interface TypingAreaProps {
  text: string
  input: string
  status: TypingStatus
  onInput: (value: string) => void
}

const TypingArea2 = ({ text, input, status, onInput }: TypingAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const errorAudio = useRef(new Audio("/sounds/fahhhhhhhhhhhhhh.mp3"))
  const successAudio = useRef(new Audio("/sounds/nice-slow-mo.mp3"))
  const [hasPlayedSuccess, setHasPlayedSuccess] = useState(false);


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

  // play error sound is faah
  useEffect(() => {
    const lastCharIndex = input.length - 1
    if (lastCharIndex < 0) return

    // Check if the most recent character typed is incorrect
    if (input[lastCharIndex] !== text[lastCharIndex]) {
      const sound = errorAudio.current

      sound.currentTime = 0 // Reset to start
      sound.play()

      // Stop the sound after 1.5 second
      const timer = setTimeout(() => {
        sound.pause()
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [input, text])

useEffect(() => {
  if (input.length === 0) {
    setHasPlayedSuccess(false); // Reset if they restart
    return;
  }

  // 1. Calculate progress percentage
  const progress = (input.length / text.length) * 100;
  
  // 2. Check if everything typed so far is 100% correct
  const isPerfectSoFar = input.split("").every((char, i) => char === text[i]);

  // 3. Trigger sound if 50% progress is reached perfectly
  // We use 'hasPlayedSuccess' to ensure it only plays ONCE at the 50% mark
  if (isPerfectSoFar && progress >= 50 && !hasPlayedSuccess) {
    const sound = successAudio.current;
    sound.currentTime = 0;
    sound.play();
    
    setHasPlayedSuccess(true); // Lock it so it doesn't replay on every key after 50%
  }
}, [input, text, hasPlayedSuccess]);

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className="relative rounded-xl bg-card p-5 md:p-7"
      onClick={handleContainerClick}
    >
      <input
        id="text"
        name="text"
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => onInput(e.target.value)}
        value={input}
        className="absolute size-0 opacity-0"
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

      <p className="mt-4 text-center text-xs text-muted-foreground opacity-40">
        Click here or start typing to focus
      </p>
    </div>
  )
}

export default TypingArea2
