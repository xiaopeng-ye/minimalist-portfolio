"use client"

import { useEffect, useRef, useState } from "react"
import { Navigation } from "@/components/sections/navigation"
import { Intro } from "@/components/sections/intro"
import { Work } from "@/components/sections/work"
import { Thoughts } from "@/components/sections/thoughts"
import { Connect } from "@/components/sections/connect"
import { Footer } from "@/components/sections/footer"

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id !== "intro") {
              entry.target.classList.add("animate-fade-in-up")
            }
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [mounted])

  return (
    <div id="top" className="min-h-screen bg-background text-foreground relative">
      <AnimatedThemeToggler className="absolute top-4 right-4 z-50" />
      <Navigation activeSection={activeSection} />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <Intro sectionRef={(el) => { sectionsRef.current[0] = el }} />
        <Work sectionRef={(el) => { sectionsRef.current[1] = el }} />
        <Thoughts sectionRef={(el) => { sectionsRef.current[2] = el }} />
        <Connect sectionRef={(el) => { sectionsRef.current[3] = el }} />
        <Footer />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
