"use client"

import { useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  duration = 1,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const spring = useSpring(0, {
    stiffness: 120,
    damping: 20,
  })

  const display = useTransform(spring, current =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <motion.span transition={{ duration }}>
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}

