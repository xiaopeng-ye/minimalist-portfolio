"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getPersonalInfo } from "@/lib/portfolio-config"
import Link from "next/link"

export function Footer() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const personal = getPersonalInfo()
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        <footer className="py-12 sm:py-16 border-t border-border">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
                <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">© {currentYear} {personal.name}. All rights reserved.</div>
                    <div className="text-xs text-muted-foreground">Built with Next.js by {personal.name}</div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {mounted && resolvedTheme === "dark" ? (
                            <svg
                                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>

                    <Link
                        href="#top"
                        className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                        aria-label="Scroll to top"
                    >
                        <svg
                            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
