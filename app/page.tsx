"use client"
import TypingHeader from "@/components/TypingHeader"
import { Keyboard } from "@/components/ui/keyboard"
import { Difficulty } from "@/lib/words"
import { useState } from "react"
import { motion } from "motion/react"
import TestSetting from "@/components/TestSetting"
import { useTyping } from "@/hooks/useTyping"
import StatsBar from "@/components/StatsBar"
import { ResultsScreen } from "@/components/ResultsScreen"
import { IconRotateClockwise } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import TypingArea from "@/components/TypingArea"
import { cn } from "@/lib/utils"

export default function Page() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [duration, setDuration] = useState(30)
  const [sound, setSound] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)

  const { input, text, status, restart, onInput, stats, timeLeft } = useTyping(
    duration,
    difficulty
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 py-8">
      <div className="relative mb-10 w-full max-w-3xl space-y-8">
        <TypingHeader />
        {status !== "finished" ? (
          <>
            <TestSetting
              duration={duration}
              setDuration={setDuration}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              sound={sound}
              setSound={setSound}
              status={status}
              showKeyboard={showKeyboard}
              setShowKeyboard={setShowKeyboard}
            />
            <StatsBar status={status} timeLeft={timeLeft} stats={stats} />
            <div className="relative">
              <TypingArea
                text={text}
                input={input}
                status={status}
                onInput={onInput}
                sound={sound}
              />
              {status === "running" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-2 right-3 flex justify-center"
                >
                  <Button
                    variant={"ghost"}
                    size={"icon-xs"}
                    onClick={restart}
                    className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="transition duration-500 group-hover:rotate-360">
                      <IconRotateClockwise className="h-4 w-4" />
                    </span>
                    <span className="sr-only">Restart</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <ResultsScreen onRestart={restart} stats={stats} />
        )}
      </div>

      {status !== "finished" && (
        <div
          className={cn({
            "absolute top-0 left-0 -z-10 size-0 opacity-0": !showKeyboard,
          })}
        >
          <Keyboard enableSound={sound} />
        </div>
      )}
    </main>
  )
}
