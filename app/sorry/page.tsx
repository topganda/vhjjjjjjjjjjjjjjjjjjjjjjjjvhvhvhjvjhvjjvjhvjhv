"use client"

import { useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion"
import NumberFlow from "@number-flow/react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export default function SorryPage() {
  const { scrollYProgress } = useScroll()
  const [progressPercent, setProgressPercent] = useState(0)

  // Mouse follow coordinates
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mouseOpacity = useMotionValue(0)

  const handlePointerMove = (e: React.PointerEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  // Clamp scroll progress between 0 and 1
  const clampedProgress = useTransform(scrollYProgress, (value) =>
    Math.min(Math.max(value, 0), 1),
  )
  
  // Transform progress value into percentage (0-100)
  const progressAsPercent = useTransform(clampedProgress, (value) =>
    Math.round(value * 100),
  )

  // Sync scroll percentage to react state for NumberFlow
  useMotionValueEvent(progressAsPercent, "change", (value) => {
    setProgressPercent(value)
  })

  const svgRadius = 18
  const circumference = 2 * Math.PI * svgRadius

  // Dummy paragraph blocks to simulate a detailed message page
  const paragraphs = [
    "India's Got Latent has been a journey that captures the raw, unfiltered essence of human expression. In creating this archive, our goal was to build a home for the moments that made us laugh, cringed, and marvel at the quirks of participants who dared to share their latency with the world.",
    "This page serves as a repository of thoughts, decisions, and messages that will be refined over time. Here, we'll document details about the project's evolution, behind-the-scenes thoughts, and credits to the creators who brought this phenomenon to life.",
    "Interaction design is at the core of a premium digital experience. The way elements slide, morph, and fade in response to scroll positions or pointer events influences how information is felt, not just read. By integrating clean easing, smooth layout adjustments, and interactive widgets, we bridge the gap between simple content display and immersive software design.",
    "As you scroll through this note, notice the floating circular progress indicator in the bottom-right corner. It is draggable—you can grab and reposition it anywhere on your screen. It tracks your read progress in real time, serving as both a utility and a playful micro-interaction.",
    "We chose a clean, high-contrast dark color palette to emphasize readability and visual focus. The deep blacks, muted borders, and glassmorphic blurs draw inspiration from minimal portfolio sites that respect the reader's attention and device screen technology.",
    "This archive is built with modern web tools including Next.js, React 19, Framer Motion, and Tailwind CSS. Each component is isolated and reusable, allowing rapid extension and styling modifications without code bloat or layout shifts.",
    "India's Got Latent represents more than just a talent show; it's a social experiment that examines humor, confidence, and the fine line between genius and delusion. By saving deleted scenes, discarded episodes, and premium content, this project keeps that cultural milestone alive.",
    "The journey of building this interface has been a collaborative process of refinement. Every hover state, font choice, and responsive breakpoint has been adjusted to look premium and minimalist, removing the clutter that often dominates streaming and landing pages.",
    "In future updates, this specific section will host letters from the archivist, detailed episode notes, and judge profiles. It will serve as the editorial corner of the project, complementing the video player and library filters.",
    "Thank you for exploring this layout. Scroll back to the top to return to the main library, or feel free to drag the progress bubble around to explore its physics.",
  ]

  return (
    <main
      onPointerMove={handlePointerMove}
      onPointerEnter={() => mouseOpacity.set(1)}
      onPointerLeave={() => mouseOpacity.set(0)}
      className="min-h-screen bg-black text-white relative flex flex-col items-center select-none font-sans overflow-x-hidden cursor-none"
    >
      {/* Custom Mouse Follow Cursor */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          opacity: mouseOpacity,
        }}
        className="pointer-events-none fixed left-0 top-0 -ml-2.5 -mt-2.5 rounded-full size-5 bg-[#ccc] z-55 mix-blend-difference"
      />

      {/* Fixed Progressive Blurs */}
      <ProgressiveBlur position="top" backgroundColor="#000000" className="z-40" />
      <ProgressiveBlur position="bottom" backgroundColor="#000000" className="z-40" />

      {/* Floating Back Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-white/70 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-black/60 hover:text-white shadow-lg"
            >
              <div className="relative grid cursor-pointer items-center justify-center">
                <ChevronLeft className="transition-all duration-500 ease-out group-hover:-translate-x-0.5" />
                <div className="absolute left-[9px] h-[2px] w-3 origin-left scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:left-[7px] group-hover:scale-x-100"></div>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            <p>Back to Episode Page</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Draggable Circular Scroll Progress Indicator */}
      <motion.div
        drag
        dragMomentum={false}
        className="group fixed bottom-4 right-4 z-50 cursor-grab active:cursor-grabbing flex items-center gap-1"
      >
        {/* Percentage tooltip — appears on hover */}
        <NumberFlow
          value={progressPercent}
          className="absolute top-1 -translate-y-full flex h-8 items-center justify-center px-4 text-xs font-medium tabular-nums text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          suffix="%"
        />

        {/* Circular Progress Ring Container */}
        <div className="bg-black/30 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 backdrop-blur transition-all duration-300">
          <svg
            className="h-10 w-10 text-white"
            viewBox="0 0 48 48"
            role="presentation"
          >
            <circle
              cx="24"
              cy="24"
              r={svgRadius}
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-[0.12]"
              fill="none"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={svgRadius}
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              style={{
                pathLength: clampedProgress,
                rotate: -90,
                transformOrigin: "50% 50%",
              }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Scroll indicator header */}
      <div className="-mt-10 mb-20 pt-[50vh] grid content-start justify-items-center gap-6 text-center z-10">
        <span className="relative max-w-[12ch] text-xs uppercase tracking-[0.2em] leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:to-white after:content-['']">
          see the progress while scroll
        </span>
      </div>

      {/* Main Text Content */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-[10vh] px-6 pb-[50vh] z-10">
        {paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-white text-base leading-relaxed tracking-wide sm:text-lg sm:leading-loose text-justify"
          >
            {paragraph}
          </motion.div>
        ))}
      </div>
    </main>
  )
}
