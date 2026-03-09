"use client"
import TypingArea from "@/components/TypingArea"
import TypingHeader from "@/components/TypingHeader"
import { Button } from "@/components/ui/button"
import { Keyboard } from "@/components/ui/keyboard"
import { useTypingTest } from "@/hooks/useTypingTest"
import { Difficulty } from "@/lib/words"
import { useState } from "react"
import { motion } from "motion/react"

export default function Page() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [duration, setDuration] = useState(60)

  const { input, text, handleInput, status, restart } = useTypingTest(
    duration,
    difficulty
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="mb-10 w-full max-w-3xl space-y-8">
        <TypingHeader />
        {status !== "finished" ? (
          <>
            <TypingArea
              text={text}
              input={input}
              onInput={handleInput}
              status={status}
            />
            {status === "running" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={restart}
                  className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  restart (tab + enter)
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div>Result</div>
        )}
      </div>

      <Keyboard enableSound />
    </main>
  )
}
