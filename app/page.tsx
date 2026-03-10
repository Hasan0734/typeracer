"use client"
import TypingArea from "@/components/TypingArea"
import TypingHeader from "@/components/TypingHeader"
import { Button } from "@/components/ui/button"
import { Keyboard } from "@/components/ui/keyboard"
import { useTypingTest } from "@/hooks/useTypingTest"
import { Difficulty } from "@/lib/words"
import { useState } from "react"
import { motion } from "motion/react"
import TypingArea2 from "@/components/TypingArea2"
import TestSetting from "@/components/TestSetting"
import { useTyping } from "@/hooks/useTyping"

export default function Page() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [duration, setDuration] = useState(30)

  // const { input, text, handleInput, status, restart } = useTypingTest(
  //   duration,
  //   difficulty
  // )

  const { input, text, status, restart, onInput } = useTyping(duration, difficulty)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="mb-10 w-full max-w-3xl space-y-8">
        <TypingHeader />
        {status !== "finished" ? (
          <>
            {/* <TypingArea
              text={text}
              input={input}
              onInput={handleInput}
              status={status}
            /> */}
            <TestSetting
              duration={duration}
              setDuration={setDuration}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />

            <TypingArea2 text={text} input={input} status={status} onInput={onInput} />
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

      <div className="sr-only">
        <Keyboard enableSound />
      </div>
    </main>
  )
}
