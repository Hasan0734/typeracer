import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import type { TypingStats } from "@/hooks/useTyping"
import { TrophyIcon } from "@phosphor-icons/react"
import { IconRotateClockwise } from "@tabler/icons-react"

interface ResultsScreenProps {
  stats: TypingStats
  onRestart: () => void
}

/** Shows final results after test completion */
export function ResultsScreen({ stats, onRestart }: ResultsScreenProps) {
  //   const best = getPersonalBest();
  //   const isNewBest = best && stats.wpm >= best.wpm;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-8 text-center"
    >
      {/* {isNewBest && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-primary"
        >
          <TrophyIcon className="w-5 h-5" />
          <span className="font-display font-semibold text-sm uppercase tracking-wider">
            New Personal Best!
          </span>
        </motion.div>
      )} */}

      {/* Main WPM */}
      <div>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="font-display text-6xl font-bold text-primary md:text-8xl"
        >
          {stats.wpm}
        </motion.span>
        <p className="mt-2 text-sm text-muted-foreground">words per minute</p>
      </div>

      {/* Detailed stats grid */}
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-4 md:grid-cols-4">
        <ResultStat label="Accuracy" value={`${stats.accuracy}%`} />
        <ResultStat label="Characters" value={stats.totalTyped} />
        <ResultStat label="Correct" value={stats.correctChars} />
        <ResultStat label="Mistakes" value={stats.incorrectChars} />
      </div>

      {/* {best && (
        <p className="text-muted-foreground text-xs">
          Personal best: {best.wpm} WPM
        </p>
      )} */}

      <Button onClick={onRestart} size="lg" className="gap-2">
        <IconRotateClockwise className="h-4 w-4" />
        Restart Test
      </Button>
    </motion.div>
  )
}

function ResultStat({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-lg bg-card p-4">
      <span className="font-display text-2xl font-bold text-foreground">
        {value}
      </span>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
