/** @jsxImportSource react */
"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

import { useTheme } from "next-themes"

export interface ParticleTextProps {
  text: string

  canvasWidth?: number
  canvasHeight?: number

  fontSize?: number
  fontWeight?: string | number
  fontFamily?: string

  particleStep?: number
  scale?: number
  zVariance?: number

  particleSize?: number
  particleOpacity?: number

  colorStart?: string
  colorEnd?: string

  hoverRadius?: number
  hoverForceXY?: number
  hoverForceZ?: number

  explodeRadius?: number
  explodeForceXY?: number
  explodeForceZ?: number

  explosionDecay?: number
  springForce?: number

  className?: string
}

function resolveCssColor(color?: string, fallback = "#000000") {
  if (!color) return fallback

  if (typeof window !== "undefined") {
    let cssValue = color

    if (color.startsWith("var(")) {
      const variableName = color.slice(4, -1).trim()
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(variableName)
        .trim()

      if (value) {
        cssValue =
          value.startsWith("#") || value.includes("(") ? value : `hsl(${value})`
      } else {
        cssValue = fallback
      }
    }

    try {
      const canvas = document.createElement("canvas")
      canvas.width = 1
      canvas.height = 1
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      if (ctx) {
        ctx.fillStyle = cssValue
        ctx.fillRect(0, 0, 1, 1)
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
        // If it's fully transparent black (default failure case), return fallback
        if (
          r === 0 &&
          g === 0 &&
          b === 0 &&
          cssValue !== "black" &&
          cssValue !== "#000" &&
          cssValue !== "#000000" &&
          cssValue !== "rgb(0,0,0)"
        ) {
          const alpha = ctx.getImageData(0, 0, 1, 1).data[3]
          if (alpha === 0) return fallback
        }
        return `rgb(${r}, ${g}, ${b})`
      }
    } catch (e) {
      console.error("Color parsing failed", e)
    }
  }

  return color
}

export default function ParticleText({
  text,

  canvasWidth = 1000,
  canvasHeight = 400,

  fontSize = 120,
  fontWeight = "bold",
  fontFamily = "Inter, Arial, sans-serif",

  particleStep = 3,
  scale = 0.05,
  zVariance = 0.5,

  particleSize = 0.25,
  particleOpacity = 0.9,

  colorStart,
  colorEnd,

  hoverRadius = 53.5,
  hoverForceXY = 0.2,
  hoverForceZ = 2.0,

  explodeRadius = 15,
  explodeForceXY = 1.5,
  explodeForceZ = 8,

  explosionDecay = 0.03,
  springForce = 0.08,

  className,
}: ParticleTextProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const container = mountRef.current

    if (!container) return

    const defaultPrimary = resolveCssColor("var(--primary)", "#3b82f6")

    const defaultSecondary = resolveCssColor("var(--secondary)", "#8b5cf6")

    const resolvedColorStart = resolveCssColor(colorStart, defaultPrimary)

    const resolvedColorEnd = resolveCssColor(colorEnd, defaultSecondary)

    const font = `${fontWeight} ${fontSize}px ${fontFamily}`

    let isDestroyed = false

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    )

    camera.position.z = 40

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    renderer.setSize(container.clientWidth, container.clientHeight)

    renderer.setClearColor(0x000000, 0)

    container.appendChild(renderer.domElement)

    const canvas = document.createElement("canvas")

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    })

    if (!ctx) return

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = font
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillStyle = "white"

    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data

    const particles: {
      x: number
      y: number
      z: number
    }[] = []

    for (let y = 0; y < canvas.height; y += particleStep) {
      for (let x = 0; x < canvas.width; x += particleStep) {
        const index = (y * canvas.width + x) * 4

        if (imageData[index] > 128) {
          particles.push({
            x: (x - canvas.width / 2) * scale,
            y: -(y - canvas.height / 2) * scale,
            z: (Math.random() - 0.5) * zVariance,
          })
        }
      }
    }

    const geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(particles.length * 3)

    const basePositions = new Float32Array(particles.length * 3)

    const colors = new Float32Array(particles.length * 3)

    const startColor = new THREE.Color(resolvedColorStart)

    const endColor = new THREE.Color(resolvedColorEnd)

    const tempColor = new THREE.Color()

    const maxX = (canvasWidth / 2) * scale

    particles.forEach((particle, index) => {
      const i3 = index * 3

      positions[i3] = particle.x
      positions[i3 + 1] = particle.y
      positions[i3 + 2] = particle.z

      basePositions[i3] = particle.x
      basePositions[i3 + 1] = particle.y
      basePositions[i3 + 2] = particle.z

      const normalizedX = (particle.x + maxX) / (maxX * 2)

      tempColor
        .copy(startColor)
        .lerp(endColor, Math.max(0, Math.min(1, normalizedX)))

      colors[i3] = tempColor.r
      colors[i3 + 1] = tempColor.g
      colors[i3 + 2] = tempColor.b
    })

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    geometry.setAttribute(
      "basePosition",
      new THREE.BufferAttribute(basePositions, 3)
    )

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: particleOpacity,
      blending: THREE.NormalBlending,
    })

    const points = new THREE.Points(geometry, material)

    scene.add(points)

    const raycaster = new THREE.Raycaster()

    const mouse = new THREE.Vector2(-9999, -9999)

    const mouse3D = new THREE.Vector3(-9999, -9999, -9999)

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

    let clickIntensity = 0

    const handleMouseMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect()

      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1

      const y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1

      mouse.set(x, y)

      raycaster.setFromCamera(mouse, camera)

      raycaster.ray.intersectPlane(plane, mouse3D)
    }

    const handleMouseDown = () => {
      clickIntensity = 1
    }

    const handleMouseLeave = () => {
      mouse3D.set(-9999, -9999, -9999)
    }

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight

      camera.updateProjectionMatrix()

      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)

    window.addEventListener("mousedown", handleMouseDown)

    window.addEventListener("resize", handleResize)

    container.addEventListener("mouseleave", handleMouseLeave)

    let frameId: number

    const animate = () => {
      if (isDestroyed) return

      const pos = geometry.attributes.position.array as Float32Array

      const base = geometry.attributes.basePosition.array as Float32Array

      if (clickIntensity > 0) {
        clickIntensity -= explosionDecay
      }

      for (let i = 0; i < particles.length; i++) {
        const i3 = i * 3

        const px = pos[i3]
        const py = pos[i3 + 1]

        const dx = mouse3D.x - px
        const dy = mouse3D.y - py

        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < hoverRadius && dist > 0.0001) {
          const force = (hoverRadius - dist) / hoverRadius

          pos[i3] -= (dx / dist) * force * hoverForceXY

          pos[i3 + 1] -= (dy / dist) * force * hoverForceXY

          pos[i3 + 2] += (Math.random() - 0.5) * force * hoverForceZ
        }

        if (clickIntensity > 0 && dist < explodeRadius && dist > 0.0001) {
          const force =
            ((explodeRadius - dist) / explodeRadius) * clickIntensity

          pos[i3] -= (dx / dist) * force * explodeForceXY

          pos[i3 + 1] -= (dy / dist) * force * explodeForceXY

          pos[i3 + 2] += (Math.random() - 0.5) * force * explodeForceZ
        }

        pos[i3] += (base[i3] - pos[i3]) * springForce

        pos[i3 + 1] += (base[i3 + 1] - pos[i3 + 1]) * springForce

        pos[i3 + 2] += (base[i3 + 2] - pos[i3 + 2]) * springForce
      }

      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)

      frameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      isDestroyed = true

      cancelAnimationFrame(frameId)

      window.removeEventListener("mousemove", handleMouseMove)

      window.removeEventListener("mousedown", handleMouseDown)

      window.removeEventListener("resize", handleResize)

      container.removeEventListener("mouseleave", handleMouseLeave)

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [
    text,
    canvasWidth,
    canvasHeight,
    fontSize,
    fontWeight,
    fontFamily,
    particleStep,
    scale,
    zVariance,
    particleSize,
    particleOpacity,
    colorStart,
    colorEnd,
    hoverRadius,
    hoverForceXY,
    hoverForceZ,
    explodeRadius,
    explodeForceXY,
    explodeForceZ,
    explosionDecay,
    springForce,
    currentTheme,
  ])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: "crosshair",
      }}
    />
  )
}
