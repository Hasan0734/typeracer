"use client"
import TypingHeader from "@/components/TypingHeader"
import { Keyboard } from "@/components/ui/keyboard"
import TestSetting from "@/components/TestSetting"
import { useTyping } from "@/hooks/useTyping"
import StatsBar from "@/components/StatsBar"
import { ResultsScreen } from "@/components/ResultsScreen"
import TypingArea from "@/components/TypingArea"
import { cn } from "@/lib/utils"
import { useApplicationStore } from "@/state"
import { Button } from "@/components/ui/button"
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

export default function Page() {
  const { duration, difficulty, keySound, showKeyboard } = useApplicationStore()

  const { input, text, status, restart, onInput, timeLeft } = useTyping(
    duration,
    difficulty
  )

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 py-8">
      <div className="absolute top-2 right-3 flex items-center-safe gap-2">
        <a href="https://github.com/hasan0734" target="_blank">
          <Button size={"icon-sm"} variant={"outline"} className={'cursor-pointer'}>
            <GithubLogoIcon />
          </Button>
        </a>
         <a href="https://www.linkedin.com/in/jahid07/" target="_blank" >
          <Button size={"icon-sm"} variant={"outline"} className={'cursor-pointer'}>
            <LinkedinLogoIcon />
          </Button>
        </a>
      </div>
      <div className="relative mb-10 w-full max-w-3xl space-y-8">
        <TypingHeader />
        {status !== "finished" ? (
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
        ) : (
          <ResultsScreen onRestart={restart} />
        )}
      </div>

      {status !== "finished" && (
        <div
          className={cn({
            "absolute top-0 left-0 -z-10 size-0 opacity-0": !showKeyboard,
          })}
        >
          <Keyboard enableSound={keySound} />
        </div>
      )}
    </main>
  )
}
