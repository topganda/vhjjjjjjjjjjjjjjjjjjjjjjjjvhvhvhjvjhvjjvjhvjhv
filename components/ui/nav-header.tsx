"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"

type CursorPosition = {
  left: number
  width: number
  opacity: number
}

export type NavHeaderItem<TValue extends string = string> = {
  label: string
  value: TValue
}

interface NavHeaderProps<TValue extends string = string> {
  items: NavHeaderItem<TValue>[]
  value: TValue
  onValueChange: (value: TValue) => void
  className?: string
}

function NavHeader<TValue extends string = string>({
  items,
  value,
  onValueChange,
  className,
}: NavHeaderProps<TValue>) {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  })
  
  const containerRef = useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    const updatePosition = () => {
      // Find the active tab element and set cursor position
      const activeTabIndex = items.findIndex(item => item.value === value)
      if (activeTabIndex !== -1 && containerRef.current) {
        const tabs = containerRef.current.querySelectorAll('li')
        // Skip the cursor li (motion.li)
        const tabElements = Array.from(tabs).filter(tab => 
          !(tab as any).hasAttribute('data-cursor')
        )
        if (tabElements[activeTabIndex]) {
          const tab = tabElements[activeTabIndex] as HTMLElement
          const { width } = tab.getBoundingClientRect()
          setPosition({
            width,
            opacity: 1,
            left: tab.offsetLeft,
          })
        }
      }
    }

    // Update immediately
    updatePosition()
    
    // Also update on window resize
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [value, items])

  return (
    <ul
      ref={containerRef}
      className={`relative mx-auto flex w-fit rounded-full border border-white/10 bg-black p-1 ${className ?? ""}`}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          setPosition={setPosition}
          onClick={() => onValueChange(item.value)}
        >
          {item.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  )
}

const Tab = ({
  children,
  setPosition,
  onClick,
}: {
  children: React.ReactNode
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>
  onClick: () => void
}) => {
  const ref = useRef<HTMLLIElement>(null)
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref.current) return

        const { width } = ref.current.getBoundingClientRect()
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        })
      }}
      className="relative z-10 block cursor-pointer px-5 py-2.5 text-sm uppercase text-white mix-blend-difference sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-3.5 md:text-lg"
    >
      {children}
    </li>
  )
}

const Cursor = ({ position }: { position: CursorPosition }) => {
  return (
    <motion.li
      data-cursor="true"
      animate={position}
      className="absolute z-0 top-1 h-10 rounded-full bg-white sm:h-12 md:h-[3.5rem]"
    />
  )
}

export default NavHeader
