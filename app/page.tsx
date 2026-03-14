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
import { useStore } from "zustand"
import { useApplicationStore } from "@/state"

export default function Page() {
  const { duration, difficulty, keySound, showKeyboard } = useApplicationStore()

  const { input, text, status, restart, onInput, timeLeft } = useTyping(
    duration,
    difficulty
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 py-8">
      <div className="relative mb-10 w-full max-w-3xl space-y-8">
        <TypingHeader />
        {/* {status !== "finished" ? (
          <>
            <TestSetting restart={restart} />
            <StatsBar timeLeft={timeLeft} />
            <div className="relative">
              <TypingArea
                text={text}
                input={input}
                status={status}
                onInput={onInput}
              />
            </div>
          </>
        ) : ( */}
          <ResultsScreen onRestart={restart} />
          {/* )} */}
      </div>

      {/* {status !== "finished" && (
        <div
          className={cn({
            "absolute top-0 left-0 -z-10 size-0 opacity-0": !showKeyboard,
          })}
        >
          <Keyboard enableSound={keySound} />
        </div>
      )} */}
    </main>
  )
}
