"use client"

import Link from "next/link"
import { getContact, getSocial } from "@/lib/portfolio-config"
import { useWebHaptics } from "web-haptics/react"

export function Connect() {
  const contact = getContact()
  const social = getSocial()
  const haptic = useWebHaptics()

  return (
    <section id="connect" className="py-16 sm:py-32 opacity-0">
      <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl font-light">
            Let&apos;s Connect
          </h2>

          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Always interested in new opportunities, collaborations, and
              conversations about technology and design.
            </p>

            <div className="space-y-4">
              <Link
                href={`mailto:${contact.email}`}
                onClick={() => haptic.trigger("medium")}
                className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
              >
                <span className="text-base sm:text-lg">{contact.email}</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="text-sm text-muted-foreground font-mono">
            ELSEWHERE
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {social.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => haptic.trigger("light")}
                className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-[border-color,box-shadow] duration-300 hover:shadow-sm"
              >
                <div className="space-y-2">
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                    {item.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.handle}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
