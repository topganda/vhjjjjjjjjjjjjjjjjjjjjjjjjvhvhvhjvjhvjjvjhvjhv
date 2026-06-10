"use client"

import NavHeader from "@/components/ui/nav-header"
import type { GalleryType } from "@/components/episode-gallery"

interface EpisodeNavItem {
  name: GalleryType
  label: string
}

interface EpisodeNavProps {
  active: GalleryType
  items: EpisodeNavItem[]
  onChange: (name: GalleryType) => void
}

export function EpisodeNav({ active, items, onChange }: EpisodeNavProps) {
  return (
    <nav className="relative z-10 mb-8 flex justify-center" aria-label="Episode sections">
      <NavHeader
        value={active}
        onValueChange={onChange}
        items={items.map((item) => ({
          label: item.label,
          value: item.name,
        }))}
      />
    </nav>
  )
}
