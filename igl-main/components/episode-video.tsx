"use client"

import { Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Episode } from "@/components/episode-gallery"
import Image from "next/image"

interface EpisodeVideoProps {
  currentEpisode: Episode | null
}

export function EpisodeVideo({ currentEpisode }: EpisodeVideoProps) {
  return (
    <motion.div 
      layout
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      className="video-container relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,0,0,0.2)]"
    >
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 text-center px-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEpisode ? currentEpisode.id : "empty"}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6 z-10"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Play className="h-7 w-7 text-white/50" />
            </span>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-white/80 sm:text-xl drop-shadow-md">
                {currentEpisode ? currentEpisode.title : "Select an Episode"}
              </h3>
              <p className="text-sm text-white/40">
                {currentEpisode
                  ? "Episode source is currently unavailable."
                  : "Browse the gallery below and pick an episode to watch."}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {currentEpisode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <Image 
                src={currentEpisode.image} 
                alt={currentEpisode.title}
                fill
                className="object-cover blur-2xl saturate-150"
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
