import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { TrophyIcon } from "@phosphor-icons/react"
import { IconRotateClockwise } from "@tabler/icons-react"
import { useApplicationStore, useBestScore } from "@/state"
import PerformanceHistory from "./Performance"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface ResultsScreenProps {
  onRestart: () => void
}

/** Shows final results after test completion */
export function ResultsScreen({ onRestart }: ResultsScreenProps) {
  //   const best = getPersonalBest();
  const { scores, getBestScore } = useBestScore()
  const { wpm, totalTyped, accuracy, incorrectChars, correctChars } =
    useApplicationStore()

  const best = getBestScore()
  const isNewBest = best && wpm >= best.wpm
  // const isNewBest = false

  // console.log({scores: })

  useEffect(() => {
    if (isNewBest) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        
      })
    }
  }, [isNewBest])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-8 text-center"
      >
        {isNewBest && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-primary"
          >
            <TrophyIcon className="h-5 w-5" />
            <span className="font-display text-sm font-semibold tracking-wider uppercase">
              New Personal Best!
            </span>
          </motion.div>
        )}

        {/* Main WPM */}
        <div>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="font-display text-6xl font-bold text-primary md:text-8xl"
          >
            {wpm}
          </motion.span>
          <p className="mt-2 text-sm text-muted-foreground">words per minute</p>
        </div>

        {/* Detailed stats grid */}
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-4 md:grid-cols-4">
          <ResultStat label="Accuracy" value={`${accuracy}%`} />
          <ResultStat label="Characters" value={totalTyped} />
          <ResultStat label="Correct" value={correctChars} />
          <ResultStat label="Mistakes" value={incorrectChars} />
        </div>

        {best && (
          <p className="text-xs text-muted-foreground">
            Personal best: {best.wpm} WPM
          </p>
        )}

        <Button onClick={onRestart} size="lg" className="group gap-2">
          <span className="transition duration-500 group-hover:rotate-360">
            <IconRotateClockwise className="h-4 w-4" />
          </span>
          Restart Test
        </Button>
      </motion.div>

      <PerformanceHistory />
    </>
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
      <span className="font-display text-2xl font-bold text-muted-foreground">
        {value}
      </span>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
