import React, { useState } from "react"
import { Button } from "./ui/button"
import { Difficulty } from "@/lib/words"
import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react"

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
}

const TestSetting = ({
  difficulty,
  setDifficulty,
  duration,
  setDuration,
}: SettingProps) => {
  const [speakerToggle, setSpeakerToggle] = useState(true)

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="space-x-0.5 rounded-lg bg-card p-0.5">
        {difficulties.map((difficult) => (
          <Button
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
      <div>
        <Button size={'icon-sm'} onClick={() => setSpeakerToggle(!speakerToggle)}>
          {speakerToggle ? <SpeakerHighIcon /> : <SpeakerSlashIcon />}
        </Button>
      </div>
    </div>
  )
}

export default TestSetting
