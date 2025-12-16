"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Particles } from "./particles"

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme()
  const [color, setColor] = useState("#000000")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000")
    }
  }, [resolvedTheme, mounted])

  if (!mounted) {
    return null
  }

  return (
    <Particles
      className="fixed inset-0 z-0"
      quantity={100}
      ease={80}
      size={0.5}
      color={color}
      refresh
    />
  )
}
