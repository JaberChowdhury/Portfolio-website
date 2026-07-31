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
    <div className="mb-8 w-full">
      <div className="mb-3 flex items-center font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
        BRANCHES
        <span className="ml-3 text-[10px] font-medium tracking-wider opacity-50">
          {allBranches.length}
        </span>
      </div>

      <div className="mb-4 h-px w-full bg-border" />

      <div className="flex flex-wrap gap-2 pb-2">
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
              className={`inline-flex cursor-pointer items-center rounded-full px-4 py-1.5 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 select-none ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-[0_4px_0_0_var(--primary-edge)]"
                  : "bg-paper-2 text-muted-foreground hover:bg-paper-3 hover:text-primary"
              } `}
            >
              {isActive && (
                <div className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground opacity-80" />
              )}
              {branch.name}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-2 h-px w-full bg-border" />
    </div>
  )
}
