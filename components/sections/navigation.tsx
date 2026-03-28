"use client"

import { getThoughts } from "@/lib/portfolio-config"
import { useWebHaptics } from "web-haptics/react"

interface NavigationProps {
  activeSection: string
}

export function Navigation({ activeSection }: NavigationProps) {
  const thoughts = getThoughts()
  const hasThoughts = thoughts && thoughts.length > 0
  const haptic = useWebHaptics()

  // Build sections array based on available data
  const sections = ["intro", "work"]
  if (hasThoughts) {
    sections.push("thoughts")
  }
  sections.push("connect")

  return (
    <>
      {/* Desktop: left side dot navigation */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => haptic.trigger("selection")}
              className={`w-2 h-8 rounded-full transition-[background-color] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeSection === section
                  ? "bg-foreground"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      {/* Mobile/Tablet: bottom pill navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 lg:hidden">
        <div className="flex items-center gap-1 bg-background/90 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-lg shadow-black/5 dark:shadow-white/5">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => haptic.trigger("selection")}
              className={`px-3 py-1.5 text-xs font-mono tracking-wider rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeSection === section
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={`Navigate to ${section}`}
            >
              {section.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
