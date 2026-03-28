"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { SIMPLE_ICON_REGISTRY } from "@/lib/icon-registry"

const DASHBOARD_LIGHT_VARIANTS = new Set(["ansible", "aws", "nextjs", "openai"])

interface TechIconProps {
  name: string
  iconType?: "simple" | "dashboard"
  iconSlug?: string
  className?: string
  size?: number
  loading?: "lazy" | "eager"
}

// Dashboard icons are theme-aware (light/dark variant).
// Isolated in its own component so only dashboard icons subscribe to theme changes.
function DashboardIconRenderer({
  slug,
  name,
  size,
  className = "",
  loading = "lazy",
}: {
  slug: string
  name: string
  size: number
  className?: string
  loading?: "lazy" | "eager"
}) {
  const { resolvedTheme } = useTheme()
  const shouldUseLightVariant =
    resolvedTheme === "dark" && DASHBOARD_LIGHT_VARIANTS.has(slug)
  const dashboardSlug = shouldUseLightVariant ? `${slug}-light` : slug
  const dashboardUrl = `/icons/dashboard/${dashboardSlug}.svg`
  const fallbackUrl = `/icons/dashboard/${slug}.svg`

  return (
    <Image
      src={dashboardUrl}
      alt={`${name} icon`}
      width={size}
      height={size}
      loading={loading}
      className={`inline-block object-contain ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      suppressHydrationWarning
      onError={(e) => {
        if (shouldUseLightVariant && e.currentTarget.src === dashboardUrl) {
          e.currentTarget.src = fallbackUrl
        } else {
          e.currentTarget.style.display = "none"
        }
      }}
    />
  )
}

// Simple icons use fixed brand colors — no theme subscription needed.
function SimpleIconRenderer({
  slug,
  name,
  size,
  className = "",
}: {
  slug: string
  name: string
  size: number
  className?: string
}) {
  const icon = SIMPLE_ICON_REGISTRY[slug]

  if (!icon) {
    return null
  }

  const coloredSvg = icon.svg.replace(
    /<svg/,
    `<svg fill="#${icon.hex}" style="width: ${size}px; height: ${size}px;"`
  )

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      dangerouslySetInnerHTML={{ __html: coloredSvg }}
      aria-label={`${name} icon`}
      role="img"
    />
  )
}

export function TechIcon({
  name,
  iconType = "simple",
  iconSlug,
  className = "",
  size = 14,
  loading = "lazy",
}: TechIconProps) {
  const slug =
    iconSlug || name.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot")

  if (iconType === "dashboard") {
    return (
      <DashboardIconRenderer
        slug={slug}
        name={name}
        size={size}
        className={className}
        loading={loading}
      />
    )
  }

  return (
    <SimpleIconRenderer
      slug={slug}
      name={name}
      size={size}
      className={className}
    />
  )
}

interface TechBadgeProps {
  name: string
  iconType?: "simple" | "dashboard"
  iconSlug?: string
  className?: string
  showIcon?: boolean
  loading?: "lazy" | "eager"
}

export function TechBadge({
  name,
  iconType,
  iconSlug,
  className = "",
  showIcon = true,
  loading = "lazy",
}: TechBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && (
        <TechIcon
          name={name}
          iconType={iconType}
          iconSlug={iconSlug}
          size={14}
          loading={loading}
        />
      )}
      <span>{name}</span>
    </span>
  )
}
