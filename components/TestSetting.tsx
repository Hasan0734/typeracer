import React, { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Difficulty } from "@/lib/words"
import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react"
import { IconKeyboard } from "@tabler/icons-react"
import { TypingStatus } from "@/hooks/useTyping"

const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
]

const times = [
  { label: "30s", value: 30 },
  { label: "60s", value: 60 },
  { label: "2m", value: 120 },
]

interface SettingProps {
  difficulty: Difficulty
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
  sound: boolean
  setSound: React.Dispatch<React.SetStateAction<boolean>>
  status: TypingStatus
  showKeyboard: boolean
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>
}

const TestSetting = ({
  difficulty,
  setDifficulty,
  duration,
  setDuration,
  sound,
  setSound,
  status,
  showKeyboard,
  setShowKeyboard,
}: SettingProps) => {
  const thudAudio = useRef(new Audio("/sounds/thud.mp3"))

  const handleSpeaker = () => {
    if (!sound) {
      const audio = thudAudio.current

      audio.currentTime = 0 // Reset to start
      audio.play()

      // Stop the sound after 1.5 second
      const timer = setTimeout(() => {
        audio.pause()
      }, 1200)

      clearTimeout(timer)
    }
    setSound(!sound)
  }

  const handleKeyboard = () => {
    setShowKeyboard(!showKeyboard)
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="space-x-0.5 rounded-lg bg-card p-0.5">
        {difficulties.map((difficult) => (
          <Button
            disabled={status === "running"}
            key={difficult.value}
            onClick={() => setDifficulty(difficult.value as Difficulty)}
            className={"rounded-md"}
            variant={difficulty === difficult.value ? "default" : "ghost"}
            size={"sm"}
          >
            {difficult.label}
          </Button>
        ))}
      </div>
      <div className="space-x-0.5 rounded-lg bg-card p-0.5">
        {times.map((time) => (
          <Button
            disabled={status === "running"}
            key={time.value}
            onClick={() => setDuration(time.value)}
            className={"rounded-md"}
            variant={duration === time.value ? "default" : "ghost"}
            size={"sm"}
          >
            {time.label}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button size={"icon-sm"} onClick={handleSpeaker}>
          {sound ? <SpeakerHighIcon /> : <SpeakerSlashIcon />}
        </Button>
        <Button size={"sm"} onClick={handleKeyboard}>
          <IconKeyboard />
          {showKeyboard ? "Hide" : "Show"}
        </Button>
      </div>
    </div>
  )
}

export default TestSetting
