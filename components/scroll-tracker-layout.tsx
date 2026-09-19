"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/sections/navigation"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function ScrollTrackerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("opacity-0")) {
              entry.target.classList.remove("opacity-0")
              entry.target.classList.add("animate-fade-in-up")
            }
            setActiveSection(entry.target.id)
          }
        })
      },
      // Reveal as soon as a sliver of the section clears the bottom 10% of the
      // viewport. A ratio threshold would scale with section height and leave
      // most of a small screen blank on tall sections before firing.
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    )

    // Query sections by id after mount — works with RSC-rendered HTML
    const sections = document.querySelectorAll<HTMLElement>(
      "#intro, #work, #thoughts, #connect"
    )
    sections.forEach((section) => {
      // Hide-for-reveal is applied here, not in the markup, so sections stay
      // visible without JS and never flash in late after hydration when the
      // page loads mid-scroll (e.g. reload with scroll restoration).
      if (section.id !== "intro") {
        const rect = section.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (!inView) section.classList.add("opacity-0")
      }
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div id="top" className="min-h-screen text-foreground relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <AnimatedThemeToggler className="fixed top-4 right-4 z-50" />
      <Navigation activeSection={activeSection} />
      <main
        id="main-content"
        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pb-28 lg:pb-0"
      >
        {children}
      </main>
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
  )
}
