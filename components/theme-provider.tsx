"use client"

// Single re-export point for theme hooks so swapping the theme library only
// touches this file and app/layout.tsx (the provider itself is an async Server
// Component from "@wrksz/themes/next" and must be used directly in the layout).
export { useTheme, useThemeValue, useHydrated } from "@wrksz/themes/client"
