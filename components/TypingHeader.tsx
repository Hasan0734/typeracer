"use client"
import { motion } from "motion/react"
import { IconKeyboard } from "@tabler/icons-react"

const TypingHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3"
    >
      <IconKeyboard className="h-7 w-7 text-primary" />
      <h1 className="font-display text-2xl font-bold tracking-wide text-foreground md:text-3xl">
        Fun Type
      </h1>
    </motion.header>
  )
}

export default TypingHeader
