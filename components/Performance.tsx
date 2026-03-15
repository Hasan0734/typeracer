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
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { TrashIcon } from "@phosphor-icons/react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

const PerformanceHistory = () => {
  const { scores, clearScore } = useBestScore()

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">
          Scores
        </h2>
        <AlertDialog>
          <AlertDialogTrigger
            render={(props) => {
              return (
                <Button size={"sm"} {...props} variant="outline">
                  <TrashIcon /> Clear
                </Button>
              )
            }}
          ></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                performance history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel size={"sm"}>Cancel</AlertDialogCancel>
              <AlertDialogCancel onClick={clearScore} variant={'default'} size={"sm"}>
                Confirm
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Table className="overflow-hidden rounded-md">
        <TableCaption>A list of your top 10 scores.</TableCaption>
        <TableHeader className="bg-primary/10">
          <TableRow className="border-b-0!">
            <TableHead className="w-25 text-center">Date</TableHead>
            <TableHead className="text-center">WPM</TableHead>
            <TableHead className="text-center">Accuracy</TableHead>
            <TableHead className="text-center">Difficulty</TableHead>
            <TableHead className="text-center">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((stat) => (
            <TableRow key={stat.date} className="bg-primary/5">
              <TableCell className="text-center">
                {format(parseISO(stat.date), "MMM dd, yyyy '-' HH:mm")}
              </TableCell>
              <TableCell className="py-3 text-center">{stat.wpm}</TableCell>
              <TableCell className="py-3 text-center">
                {stat.accuracy}%
              </TableCell>
              <TableCell className="py-3 text-center">
                <Badge variant={"outline"} className="capitalize">
                  {stat.difficulty}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-center">
                {stat.duration}s
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default PerformanceHistory
