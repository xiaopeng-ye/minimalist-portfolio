"use client"

import { useEffect, useState } from "react"
import posthog from "posthog-js"

const CONSENT_KEY = "posthog-consent"

type ConsentState = "accepted" | "declined" | null

export function PostHogConsent() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_KEY)

    if (storedConsent === "accepted") {
      applyConsent("accepted", false)
      return
    }

    if (storedConsent === "declined") {
      applyConsent("declined", false)
      return
    }

    setIsReady(true)
  }, [])

  const applyConsent = (
    nextConsent: Exclude<ConsentState, null>,
    capturePageview: boolean
  ) => {
    window.localStorage.setItem(CONSENT_KEY, nextConsent)
    setConsent(nextConsent)
    setIsReady(true)

    if (nextConsent === "accepted") {
      posthog.set_config({
        persistence: "localStorage+cookie",
      })
      posthog.opt_in_capturing()

      if (capturePageview) {
        posthog.capture("$pageview")
      }

      return
    }

    posthog.opt_out_capturing()
  }

  if (!isReady || consent !== null) {
    return null
  }

  return (
    <aside className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/90 p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,127,127,0.16),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="relative space-y-4">
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-muted-foreground">
              Privacy Choice
            </p>
            <div className="space-y-2">
              <h2 className="text-base font-medium text-foreground">
                Allow anonymous analytics?
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I use PostHog to understand visits and improve this portfolio.
                It only starts after you accept.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => applyConsent("accepted", true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => applyConsent("declined", false)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background/70 px-4 text-sm font-medium text-foreground transition-colors duration-300 hover:border-muted-foreground/60 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
