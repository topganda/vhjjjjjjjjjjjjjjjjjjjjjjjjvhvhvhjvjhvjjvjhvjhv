"use client"

import { useMemo, useState } from "react"
import { EpisodeGallery, type Episode, type GalleryType } from "@/components/episode-gallery"
import { EpisodeNav } from "@/components/episode-nav"
import { EpisodeVideo } from "@/components/episode-video"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

const premiumEpisodes: Episode[] = [  {
    id: "paid-episode-1",
    title: "India's Got Latent - Premium Episode 1 (DELETED)",
    summary:
      "This special deleted episode features exclusive content that was originally removed from the main series. Premium subscribers only.",
    image: "/paid-episodes/1.png",
    episodeNumber: 1,
    isSpecial: true,
    specialType: "deleted",
  },
  {
    id: "paid-episode-2",
    title: "India's Got Latent - Premium Episode 2",
    summary:
      "Exclusive premium content featuring extended judge reactions and behind-the-scenes moments from Episode 2.",
    image: "/paid-episodes/2.png",
    episodeNumber: 2,
  },
  {
    id: "paid-episode-3",
    title: "India's Got Latent - Premium Episode 3",
    summary:
      "Premium episode 3 with uncut performances and exclusive judge commentary not available in the free version.",
    image: "/paid-episodes/3.png",
    episodeNumber: 3,
    available: false,
  },
  {
    id: "paid-episode-4",
    title: "India's Got Latent - Premium Episode 4",
    summary:
      "Extended premium version of episode 4 featuring additional contestant interviews and backstage footage.",
    image: "/paid-episodes/4.png",
    episodeNumber: 4,
    available: false,
  },
  {
    id: "paid-episode-5",
    title: "India's Got Latent - Premium Episode 5 (DELETED SCENES)",
    summary:
      "Premium episode 5 featuring exclusive deleted scenes and extended performances not seen in the regular version.",
    image: "/paid-episodes/5.png",
    episodeNumber: 5,
    isSpecial: true,
    specialType: "deleted scenes",
    available: false,
  },
  {
    id: "paid-episode-6",
    title: "India's Got Latent - Premium Episode 6 (DELETED SCENES)",
    summary: "Exclusive deleted scenes from episode 6 with additional judge reactions and contestant backstories.",
    image: "/paid-episodes/6.png",
    episodeNumber: 6,
    isSpecial: true,
    specialType: "deleted scenes",
    available: false,
  },
  {
    id: "paid-episode-7",
    title: "India's Got Latent - Premium Episode 7",
    summary:
      "Premium episode 7 with extended performances and exclusive behind-the-scenes content for subscribers.",
    image: "/paid-episodes/7.png",
    episodeNumber: 7,
    available: false,
  },
  {
    id: "paid-episode-8",
    title: "India's Got Latent - Premium Episode 8",
    summary:
      "Extended premium version of episode 8 featuring uncut judge deliberations and contestant interactions.",
    image: "/paid-episodes/8.png",
    episodeNumber: 8,
    available: false,
  },
  {
    id: "paid-episode-9",
    title: "India's Got Latent - Premium Episode 9 (DISCARDED)",
    summary: "Special discarded episode content that was originally planned but never aired in the main series.",
    image: "/paid-episodes/9.png",
    episodeNumber: 9,
    isSpecial: true,
    specialType: "discarded",
    available: false,
  },
  {
    id: "paid-episode-10",
    title: "India's Got Latent - Premium Episode 10",
    summary: "Premium episode 10 with exclusive content, extended performances, and additional judge commentary.",
    image: "/paid-episodes/10.png",
    episodeNumber: 10,
    available: false,
  },
]

const freeEpisodes: Episode[] = [
  {
    id: "free-episode-1",
    title: "India's Got Latent - Episode 1 ft. Raftaar",
    summary:
      "The first episode of India's favorite pointless reality show featuring hidden talents with special guest Raftaar.",
    image: "/episodes/1.png",
    episodeNumber: 1,
  },
  {
    id: "free-episode-2",
    title: "India's Got Latent - Episode 2 ft. GamerFleet, JokeSingh & KaranSinghMagic",
    summary:
      "Watch the second episode featuring GamerFleet, JokeSingh, and KaranSinghMagic as special guests.",
    image: "/episodes/2.png",
    episodeNumber: 2,
  },
  {
    id: "free-episode-3",
    title: "India's Got Latent - Episode 3 ft. Urfi Javed",
    summary:
      "Episode 3 brings more laughter and unexpected performances featuring special guest Urfi Javed.",
    image: "/episodes/3.png",
    episodeNumber: 3,
  },
  {
    id: "free-episode-4",
    title: "India's Got Latent - Episode 4 ft. ComedianMaheepSingh & TandonAmit",
    summary:
      "Another round of comedy and talent featuring ComedianMaheepSingh and TandonAmit.",
    image: "/episodes/4.png",
    episodeNumber: 4,
  },
  {
    id: "free-episode-5",
    title: "India's Got Latent - Episode 5 ft. KunalKamra & AtulKhatriComedian",
    summary:
      "Episode 5 delivers more unforgettable moments featuring KunalKamra and AtulKhatriComedian.",
    image: "/episodes/5.png",
    episodeNumber: 5,
  },
  {
    id: "free-episode-6",
    title: "India's Got Latent - Episode 6 ft. VipulGoyal, JokeSingh & sonalithakkercomedy",
    summary:
      "The sixth episode continues the show with VipulGoyal, JokeSingh and sonalithakkercomedy.",
    image: "/episodes/6.png",
    episodeNumber: 6,
  },
  {
    id: "free-episode-7",
    title: "India's Got Latent - Episode 7 ft. raviguptacomedy, RahgirLive & comicsaurabh",
    summary:
      "Episode 7 brings fresh faces and performances featuring raviguptacomedy, RahgirLive and comicsaurabh.",
    image: "/episodes/7.png",
    episodeNumber: 7,
  },
  {
    id: "free-episode-8",
    title: "India's Got Latent - Episode 8 ft. aslipoonampandey, viditchess & vivekmagic",
    summary:
      "The eighth episode showcases more brilliant contestants with aslipoonampandey, viditchess and vivekmagic.",
    image: "/episodes/8.png",
    episodeNumber: 8,
  },
  {
    id: "free-episode-9",
    title: "India's Got Latent - Episode 9",
    summary: "Episode 9 features another lineup of performers ready to showcase their unique abilities.",
    image: "/episodes/9.png",
    episodeNumber: 9,
    available: false,
  },
  {
    id: "free-episode-10",
    title: "India's Got Latent - Episode 10",
    summary: "The tenth episode brings double-digit entertainment with amazing performances and judge reactions.",
    image: "/episodes/10.png",
    episodeNumber: 10,
    available: false,
  },
  {
    id: "free-episode-11",
    title: "India's Got Latent - Episode 11",
    summary: "Episode 11 continues the journey of discovering India's entertaining and talented individuals.",
    image: "/episodes/11.png",
    episodeNumber: 11,
    available: false,
  },
  {
    id: "free-episode-12",
    title: "India's Got Latent - Episode 12",
    summary: "The twelfth episode features special guests and more performances from talented contestants.",
    image: "/episodes/12.png",
    episodeNumber: 12,
    available: false,
  },
]

const watchHistory: Episode[] = [
  {
    id: "history-1",
    title: "Recently Watched: Episode 2 ft. GamerFleet",
    summary: "Completed on Dec 16, 2024 - Latest episode with GamerFleet, JokeSingh & KaranSinghMagic.",
    image: "/episodes/2.png",
    episodeNumber: 2,
  },
  {
    id: "history-2",
    title: "Recently Watched: Episode 1 ft. Raftaar",
    summary: "Completed on Dec 15, 2024 - The episode that started it all.",
    image: "/episodes/1.png",
    episodeNumber: 1,
  },
  {
    id: "history-3",
    title: "Recently Watched: Episode 1 (Rewatch)",
    summary: "Completed on Dec 12, 2024 - Rewatched the first episode.",
    image: "/episodes/1.png",
    episodeNumber: 1,
  },
]

export default function HomePage() {
  const [activeGallery, setActiveGallery] = useState<GalleryType>("episodes")
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)

  const activeItems = useMemo(() => {
    if (activeGallery === "free") return freeEpisodes
    if (activeGallery === "history") return watchHistory
    return premiumEpisodes
  }, [activeGallery])

  const heading = {
    free: "Free Episodes",
    episodes: "Premium Episodes",
    history: "Watch History",
  }[activeGallery]

  const handleEpisodeClick = (episode: Episode) => {
    setCurrentEpisode(episode)
    document.getElementById("video-player")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <main className="min-h-screen bg-black text-foreground relative">
      <ProgressiveBlur position="top" className="z-10" />
      <ProgressiveBlur position="bottom" className="z-10" />

      <div className="relative z-20 bg-[#111] px-2 py-4 sm:px-4 md:px-6 lg:px-8">
        <section id="video-player" className="mb-8">
          <EpisodeVideo currentEpisode={currentEpisode} />
        </section>

        <EpisodeNav
          active={activeGallery}
          items={[
            { name: "free", label: "Free" },
            { name: "episodes", label: "Premium" },
            { name: "history", label: "History" },
          ]}
          onChange={setActiveGallery}
        />
      </div>

      <div className="relative z-0 pb-32">
        <EpisodeGallery
          heading={heading}
          galleryType={activeGallery}
          items={activeItems}
          onEpisodeClick={handleEpisodeClick}
        />
      </div>
    </main>
  )
}
