import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useBestScore } from "@/state"
import { format, parseISO } from "date-fns"

const PerformanceHistory = () => {
  const { getBestScore, scores } = useBestScore()

  console.log(scores)

  const date = new Date()
  console.log(date.toString())

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-on-surface kinetic-border inline-block pb-2 text-3xl font-black tracking-tight">
          Scores
        </h2>
        <button className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black tracking-widest text-primary uppercase transition-all hover:bg-primary/20">
          Export Data
        </button>
      </div>
      <Table className="overflow-hidden rounded-md">
        <TableCaption>A list of your top 10 scores.</TableCaption>
        <TableHeader className="bg-primary/10">
          <TableRow className="border-b-0!">
            <TableHead className="w-25">Date</TableHead>
            <TableHead className="text-center">WPM</TableHead>
            <TableHead className="text-center">Accuracy</TableHead>
            <TableHead className="text-right">Difficulty</TableHead>
            <TableHead className="text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((stat) => (
            <TableRow key={stat.date}>
              <TableCell className="font-medium">
                {format(parseISO(stat.date), "MMM dd, yyyy '-' HH:mm")}
              </TableCell>
              <TableCell className="text-center">{stat.wpm}</TableCell>
              <TableCell className="text-center">{stat.accuracy}</TableCell>
              <TableCell className="text-right">{stat.difficulty}</TableCell>
              <TableCell className="text-right">{stat.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default PerformanceHistory
