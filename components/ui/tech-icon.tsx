"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import * as SimpleIcons from "simple-icons"
import Image from "next/image"

interface TechIconProps {
  name: string
  iconType?: "simple" | "dashboard"
  iconSlug?: string
  className?: string
  size?: number
}

/**
 * TechIcon Component
 * Displays technology icons from Simple Icons or Dashboard Icons CDN
 * Supports both light and dark themes
 */
export function TechIcon({ name, iconType = "simple", iconSlug, className = "", size = 14 }: TechIconProps) {
  const { resolvedTheme } = useTheme()
  // If no iconSlug provided, try to derive it from name
  const slug = iconSlug || name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot")

  if (iconType === "dashboard") {
    // Use Dashboard Icons CDN
    // In dark mode, try to use the -light variant if available
    const dashboardSlug = resolvedTheme === "dark" ? `${slug}-light` : slug
    const dashboardUrl = `https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/${dashboardSlug}.svg`
    const fallbackUrl = `https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/${slug}.svg`

    return (
      <Image
        src={dashboardUrl}
        alt={`${name} icon`}
        width={size}
        height={size}
        className={`inline-block object-contain ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        suppressHydrationWarning
        onError={(e) => {
          // Fallback: try the regular version if -light version doesn't exist
          if (e.currentTarget.src === dashboardUrl && resolvedTheme === "dark") {
            e.currentTarget.src = fallbackUrl
          } else {
            // If both fail, hide the image
            e.currentTarget.style.display = "none"
          }
        }}
      />
    )
  }

  // Use Simple Icons
  try {
    // Get icon from simple-icons package
    const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof SimpleIcons
    const icon = SimpleIcons[iconKey]

    if (!icon || !("svg" in icon)) {
      // Icon not found, return null
      return null
    }

    // Apply brand color to SVG
    const coloredSvg = icon.svg.replace(
      /<svg/,
      `<svg fill="#${icon.hex}" style="width: ${size}px; height: ${size}px;"`
    )

    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
        dangerouslySetInnerHTML={{ __html: coloredSvg }}
        aria-label={`${name} icon`}
        role="img"
      />
    )
  } catch (error) {
    // If icon not found, return null
    console.warn(`Icon not found for: ${name} (slug: ${slug})`)
    return null
  }
}

/**
 * TechBadge Component
 * Displays a technology badge with icon and name
 */
interface TechBadgeProps {
  name: string
  iconType?: "simple" | "dashboard"
  iconSlug?: string
  className?: string
  showIcon?: boolean
}

export function TechBadge({ name, iconType, iconSlug, className = "", showIcon = true }: TechBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && <TechIcon name={name} iconType={iconType} iconSlug={iconSlug} size={14} />}
      <span>{name}</span>
    </span>
  )
}
