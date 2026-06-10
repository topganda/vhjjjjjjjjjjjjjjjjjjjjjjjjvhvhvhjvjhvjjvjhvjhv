"use client"

import { AlertCircle, ArrowRight, Clock, Lock, Play, Star } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { memo, useMemo } from "react"

export type GalleryType = "free" | "episodes" | "history"

export interface Episode {
  id: string
  title: string
  summary: string
  image: string
  episodeNumber: number
  isSpecial?: boolean
  specialType?: string
  available?: boolean
}

interface EpisodeGalleryProps {
  heading: string
  galleryType: GalleryType
  items: Episode[]
  onEpisodeClick: (episode: Episode) => void
}

function EmptySlot({ galleryType }: { galleryType: GalleryType }) {
  const isPremium = galleryType === "episodes"

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 0.6, y: 0, transition: { duration: 0.35, ease: [0.215, 0.61, 0.355, 1] } }
      }}
      className="flex min-h-[23rem] flex-col gap-4 rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] p-4"
    >
      <div className="flex aspect-video w-full items-center justify-center rounded-[1.25rem] bg-white/[0.035] text-center text-gray-400">
        {isPremium ? <Lock className="h-8 w-8" /> : <span className="text-sm">Episode Coming Soon</span>}
      </div>
      <div>
        <h3 className="mb-2 text-xl font-medium text-gray-400">
          {isPremium ? "Premium Content" : "Episode Unavailable"}
        </h3>
        <p className="text-sm text-gray-500">
          {isPremium
            ? "This premium episode requires access before it can be watched."
          : "This episode is not yet available or has been removed."}
        </p>
      </div>
    </motion.div>
  )
}

const EpisodeCard = memo(function EpisodeCard({
  item,
  galleryType,
  onEpisodeClick,
}: {
  item: Episode
  galleryType: GalleryType
  onEpisodeClick: (episode: Episode) => void
}) {
  const isAvailable = item.available !== false
  const buttonText = galleryType === "free" ? "Watch Free" : galleryType === "history" ? "Rewatch" : "Watch Premium"

  const statusLabel = galleryType === "free" ? "FREE" : galleryType === "history" ? "WATCHED" : "PREMIUM"

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: isAvailable ? 1 : 0.68, y: 0, transition: { duration: 0.35, ease: [0.215, 0.61, 0.355, 1] } }
      }}
      className={`group relative flex min-h-[23rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.34)] ${
        isAvailable ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      onClick={() => isAvailable && onEpisodeClick(item)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[1.25rem] bg-white/[0.03]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover object-center transition duration-500 ${
            isAvailable ? "group-hover:scale-105" : "grayscale"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85" />

        {isAvailable ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white p-4 shadow-[0_0_40px_rgba(255,255,255,0.28)]">
              <Play className="h-5 w-5 text-black" />
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-2 pt-4">
        <h3 className={`mb-3 line-clamp-2 text-xl font-semibold leading-tight ${isAvailable ? "text-white" : "text-gray-400"}`}>
          {item.title}
        </h3>
        <p className={`mb-4 line-clamp-3 text-sm ${isAvailable ? "text-gray-300" : "text-gray-500"}`}>
          {isAvailable ? item.summary : "This episode is not yet available. Check back later."}
        </p>
        <button
          className={`group/button mt-auto inline-flex items-center self-start rounded-full px-0 py-2 text-sm font-semibold transition-colors ${
            isAvailable ? "text-white hover:text-white/78" : "text-gray-500"
          }`}
          disabled={!isAvailable}
          onClick={(event) => {
            event.stopPropagation()
            if (isAvailable) onEpisodeClick(item)
          }}
        >
          {isAvailable ? buttonText : "Not Available"}
          <span className="ml-2 grid h-6 w-6 place-items-center rounded-full bg-white text-black transition-transform group-hover/button:translate-x-1">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </motion.article>
  )
})

export function EpisodeGallery({ heading, galleryType, items, onEpisodeClick }: EpisodeGalleryProps) {
  const arrangedItems = useMemo(() => {
    if (galleryType === "history") return items

    const episodeMap = new Map(items.map((item) => [item.episodeNumber, item]))
    const episodeNumbers = [...episodeMap.keys()].sort((a, b) => a - b)
    if (episodeNumbers.length === 0) return []

    const minEpisode = Math.min(...episodeNumbers)
    const maxEpisode = Math.max(...episodeNumbers)

    return Array.from({ length: maxEpisode - minEpisode + 1 }, (_, index) => {
      return episodeMap.get(minEpisode + index) ?? null
    })
  }, [galleryType, items])

  const HeadingIcon = galleryType === "free" ? Star : galleryType === "history" ? Clock : Lock
  const iconColor = galleryType === "free" ? "text-yellow-500" : galleryType === "history" ? "text-gray-400" : "text-purple-500"

  return (
    <section className="bg-black px-3 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        <div className="mb-8 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            <HeadingIcon className={`h-4 w-4 ${iconColor}`} />
            <span className="text-xs uppercase tracking-[0.22em] text-white/42">Library</span>
          </div>
          <h2 className="max-w-full text-balance text-3xl font-black uppercase leading-none tracking-normal sm:text-4xl md:text-5xl">
            {heading}
          </h2>
        </div>

        <motion.div 
          key={galleryType}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {arrangedItems.map((item, index) =>
            item ? (
              <EpisodeCard
                key={`${galleryType}-${item.id}-${index}`}
                item={item}
                galleryType={galleryType}
                onEpisodeClick={onEpisodeClick}
              />
            ) : (
              <EmptySlot key={`empty-${galleryType}-${index}`} galleryType={galleryType} />
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}
