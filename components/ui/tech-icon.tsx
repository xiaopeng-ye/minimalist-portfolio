"use client"

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

function DashboardImg({
  src,
  name,
  size,
  className,
  loading,
}: {
  src: string
  name: string
  size: number
  className: string
  loading: "lazy" | "eager"
}) {
  // Plain <img>: the site is a static export with `images.unoptimized`, so
  // next/image adds nothing for these tiny SVGs. It also avoids next/image's
  // LCP warning, which keys images by src and misattributes the eager intro
  // icon to a lazy instance of the same src rendered further down the page.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} icon`}
      width={size}
      height={size}
      loading={loading}
      decoding="async"
      className={`object-contain ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  )
}

// Dashboard icons that need a light variant on dark backgrounds render both
// variants and let the `.dark` class pick one. The server HTML is therefore
// already correct for the active theme: no theme subscription, no src swap
// (and no icon flicker) after hydration or on theme toggle.
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
  const baseUrl = `/icons/dashboard/${slug}.svg`

  if (!DASHBOARD_LIGHT_VARIANTS.has(slug)) {
    return (
      <DashboardImg
        src={baseUrl}
        name={name}
        size={size}
        className={`inline-block ${className}`}
        loading={loading}
      />
    )
  }

  return (
    <>
      <DashboardImg
        src={baseUrl}
        name={name}
        size={size}
        className={`inline-block dark:hidden ${className}`}
        loading={loading}
      />
      <DashboardImg
        src={`/icons/dashboard/${slug}-light.svg`}
        name={name}
        size={size}
        className={`hidden dark:inline-block ${className}`}
        loading={loading}
      />
    </>
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
