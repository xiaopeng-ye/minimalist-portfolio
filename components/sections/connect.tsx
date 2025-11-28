"use client"

import Link from "next/link"
import { getContact, getSocial } from "@/lib/portfolio-config"

interface ConnectProps {
    sectionRef: (el: HTMLElement | null) => void
}

export function Connect({ sectionRef }: ConnectProps) {
    const contact = getContact()
    const social = getSocial()

    return (
        <section id="connect" ref={sectionRef} className="py-20 sm:py-32 opacity-0">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
                <div className="space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

                    <div className="space-y-6">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            Always interested in new opportunities, collaborations, and conversations about technology and design.
                        </p>

                        <div className="space-y-4">
                            <Link
                                href={`mailto:${contact.email}`}
                                className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                            >
                                <span className="text-base sm:text-lg">{contact.email}</span>
                                <svg
                                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 sm:space-y-8">
                    <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {social.map((item) => (
                            <Link
                                key={item.name}
                                href={item.url}
                                className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                            >
                                <div className="space-y-2">
                                    <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                                        {item.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{item.handle}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
