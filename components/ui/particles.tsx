"use client"

import React, {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"

import { cn } from "@/lib/utils"

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "")

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("")
  }

  const hexInt = parseInt(hex, 16)
  const red = (hexInt >> 16) & 255
  const green = (hexInt >> 8) & 255
  const blue = hexInt & 255
  return [red, green, blue]
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  // Cached in a ref — devicePixelRatio is a hardware constant, not state
  const dpr = useRef(
    typeof window !== "undefined" ? window.devicePixelRatio : 1
  )
  const rafID = useRef<number | null>(null)
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
  // Color lives in a ref so a theme change recolors the *existing* particles on
  // the next frame instead of tearing the canvas down and fading 100 new ones in.
  const rgb = useMemo(() => hexToRgb(color), [color])
  const rgbRef = useRef(rgb)
  useEffect(() => {
    rgbRef.current = rgb
  }, [rgb])

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)
      context.current.fillStyle = `rgba(${rgbRef.current.join(", ")}, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr.current, 0, 0, dpr.current, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }, [])

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    const pSize = Math.floor(Math.random() * 2) + size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }, [size])

  const resizeCanvas = useCallback(
    (preserveParticles = false) => {
      if (!canvasContainerRef.current || !canvasRef.current || !context.current)
        return

      const w = canvasContainerRef.current.offsetWidth
      const h = canvasContainerRef.current.offsetHeight
      const sizeChanged =
        w !== canvasSize.current.w || h !== canvasSize.current.h
      if (preserveParticles && !sizeChanged && circles.current.length > 0)
        return

      canvasSize.current.w = w
      canvasSize.current.h = h

      // Assigning width/height clears the bitmap and resets the transform.
      canvasRef.current.width = w * dpr.current
      canvasRef.current.height = h * dpr.current
      canvasRef.current.style.width = `${w}px`
      canvasRef.current.style.height = `${h}px`
      context.current.scale(dpr.current, dpr.current)

      if (preserveParticles && circles.current.length > 0) {
        // Keep the field stable across viewport changes (window resize, mobile
        // URL bar collapse): only particles that fell outside the new bounds
        // get a fresh position, everything else keeps its alpha and momentum.
        circles.current.forEach((circle) => {
          const outside =
            circle.x + circle.translateX < 0 ||
            circle.x + circle.translateX > w ||
            circle.y + circle.translateY < 0 ||
            circle.y + circle.translateY > h
          if (outside) {
            const fresh = circleParams()
            circle.x = fresh.x
            circle.y = fresh.y
            circle.translateX = 0
            circle.translateY = 0
          }
        })
        return
      }

      // Fresh start: clear existing particles and create exactly `quantity`
      circles.current = []
      for (let i = 0; i < quantity; i++) {
        drawCircle(circleParams())
      }
    },
    [circleParams, drawCircle, quantity]
  )

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      )
    }
  }, [])

  const initCanvas = useCallback(() => {
    resizeCanvas(false)
  }, [resizeCanvas])

  function remapValue(
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
    return remapped > 0 ? remapped : 0
  }

  const animate = useCallback(() => {
    clearContext()
    const toRemove: number[] = []

    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      )
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease

      drawCircle(circle, true)

      // Mark out-of-bounds circles for removal (splice during forEach skips elements)
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        toRemove.push(i)
      }
    })

    // Remove in reverse order to preserve correct indices, then spawn replacements
    for (let i = toRemove.length - 1; i >= 0; i--) {
      circles.current.splice(toRemove[i], 1)
      drawCircle(circleParams())
    }

    rafID.current = window.requestAnimationFrame(animate)
  }, [circleParams, clearContext, drawCircle, ease, staticity, vx, vy])

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    animate()

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      resizeTimeout.current = setTimeout(() => {
        resizeCanvas(true)
      }, 150)
    }

    // Update mouse ref directly in the event handler — no setState, no re-render
    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const { w, h } = canvasSize.current
        const x = event.clientX - rect.left - w / 2
        const y = event.clientY - rect.top - h / 2
        if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
          mouse.current.x = x
          mouse.current.y = y
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current)
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [animate, initCanvas, resizeCanvas])

  // `refresh` is an explicit "regenerate the field" signal; skip the mount run
  // since the effect above already initialised the canvas.
  const isFirstRefresh = useRef(true)
  useEffect(() => {
    if (isFirstRefresh.current) {
      isFirstRefresh.current = false
      return
    }
    initCanvas()
  }, [initCanvas, refresh])

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
