import React, { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Difficulty } from "@/lib/words"
import {
  EyeIcon,
  GearIcon,
  SpeakerHighIcon,
  SpeakerSlashIcon,
} from "@phosphor-icons/react"
import { IconKeyboard } from "@tabler/icons-react"
import { TypingStatus } from "@/hooks/useTyping"
import { motion } from "motion/react"

import { Switch } from "./ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Label } from "./ui/label"

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
  keySound: boolean
  setKeySound: React.Dispatch<React.SetStateAction<boolean>>
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
  keySound,
  setKeySound,
}: SettingProps) => {
  const thudAudio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    thudAudio.current = new Audio("/sounds/thud.mp3")
  }, [])

  const handleSpeaker = (value: boolean) => {
    if (!sound && thudAudio?.current) {
      const audio = thudAudio?.current

      audio.currentTime = 0 // Reset to start
      audio.volume = 0.1 // 10% of volume
      audio?.play()

      // Stop the sound after 1.2 second
      const timer = setTimeout(() => {
        audio.pause()
      }, 1200)

      clearTimeout(timer)
    }
    setSound(value)
  }

  const handleKeySound = (value: boolean) => {
    setKeySound(value)
  }

  const handleKeyboard = (value: boolean) => {
    setShowKeyboard(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3"
    >
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
        <Popover>
          <PopoverTrigger
            render={(props) => {
              return (
                <Button {...props} variant={"outline"} size={"icon"}>
                  <GearIcon />
                </Button>
              )
            }}
        />
          <PopoverContent align="center" className={"w-40"}>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-xl py-0.5 text-sm">
                <Label>
                  {sound ? <SpeakerHighIcon /> : <SpeakerSlashIcon />} Music
                </Label>
                <Switch checked={sound} onCheckedChange={handleSpeaker} />
              </div>
              <div className="flex items-center justify-between rounded-xl py-0.5 text-sm">
                <Label>
                  {keySound ? <SpeakerHighIcon /> : <SpeakerSlashIcon />} Key
                  Sound
                </Label>
                <Switch checked={keySound} onCheckedChange={handleKeySound} />
              </div>
              <div className="flex items-center justify-between rounded-xl py-0.5 text-sm">
                <Label>
                  <EyeIcon /> Keyboard
                </Label>
                <Switch
                  checked={showKeyboard}
                  onCheckedChange={handleKeyboard}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </motion.div>
  )
}

export default TestSetting
