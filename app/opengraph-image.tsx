import { ImageResponse } from "next/og"
import { getPersonalInfo, getSiteMetadata } from "@/lib/portfolio-config"

export const dynamic = "force-static"
export const alt = "Xiaopeng Ye - Portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  const personal = getPersonalInfo()
  const meta = getSiteMetadata()

  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#6b7280",
          fontSize: 18,
          letterSpacing: "0.2em",
          marginBottom: 24,
        }}
      >
        PORTFOLIO / 2026
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginBottom: 32 }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 80,
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          {personal.firstName}
        </span>
        <span
          style={{
            color: "#6b7280",
            fontSize: 80,
            fontWeight: 300,
            lineHeight: 1.1,
          }}
        >
          {personal.lastName}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          color: "#9ca3af",
          fontSize: 22,
          maxWidth: 700,
          lineHeight: 1.5,
        }}
      >
        {meta.description}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 80,
          right: 80,
          color: "#6b7280",
          fontSize: 18,
        }}
      >
        {personal.location}
      </div>
    </div>,
    { ...size }
  )
}
