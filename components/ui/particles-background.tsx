"use client"

import { useTheme } from "@/components/theme-provider"
import { Particles } from "./particles"

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme()

  // resolvedTheme is undefined on the server and during hydration; rendering
  // nothing until it resolves avoids a first paint (and canvas init) with the
  // wrong particle color that would then re-initialize a frame later.
  if (!resolvedTheme) {
    return null
  }

  return (
    <Particles
      className="fixed inset-0 z-0"
      quantity={100}
      ease={80}
      size={0.5}
      color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
      refresh
    />
  )
}
