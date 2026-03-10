import React from "react"
import { motion } from "motion/react"
import { TypingStats, TypingStatus } from "@/hooks/useTyping"

interface StatsBarProps {
  timeLeft: number
  status: TypingStatus
  stats: TypingStats
}

const StatsBar = ({ timeLeft, status, stats }: StatsBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-6 text-sm md:gap-10 md:text-base"
    >
      {/* Timer */}
      <div className="text-center">
        <span className="font-display text-2xl font-bold text-primary tabular-nums md:text-4xl">
          {timeLeft}
        </span>
        <p className="mt-1 text-xs text-muted-foreground">seconds</p>
      </div>
      {status !== "idle" && (
        <>
          <Stat label="wpm" value={stats.wpm} />
          <Stat label="cpm" value={stats.cpm} />
          <Stat label="acc" value={`${stats.accuracy}%`} />
        </>
      )}
    </motion.div>
  )
}

export default StatsBar

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <span className="font-display text-xl font-bold text-foreground tabular-nums md:text-3xl">
        {value}
      </span>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
