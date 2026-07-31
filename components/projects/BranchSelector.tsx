"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface BranchSelectorProps {
  repoName: string
  allBranches: { name: string }[]
  activeBranchName: string
}

export default function BranchSelector({
  repoName,
  allBranches,
  activeBranchName,
}: BranchSelectorProps) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeIndex = allBranches.findIndex(
    (b) => b.name.toLowerCase() === activeBranchName.toLowerCase()
  )

  const handleClick = (branchName: string) => {
    router.push(`/projects/${repoName}/${encodeURIComponent(branchName)}`)
  }

  return (
    <div className="mb-12 w-full">
      <div className="mono-label mb-4 flex items-baseline gap-3">
        Branches
        <span className="font-mono text-[10px] font-medium tracking-wider text-ink-2 uppercase">
          {allBranches.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 pb-2">
        {allBranches.map((branch, index) => {
          const isActive = index === (activeIndex === -1 ? 0 : activeIndex)

          return (
            <motion.button
              key={branch.name}
              onClick={() => handleClick(branch.name)}
              initial={false}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 4 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.6) }}
              whileHover={{ y: isActive ? 0 : -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative inline-flex cursor-pointer items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors duration-200 select-none ${
                isActive
                  ? "text-cyan"
                  : "text-ink-2 hover:text-cyan focus-visible:text-cyan"
              }`}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
              )}
              {branch.name}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
