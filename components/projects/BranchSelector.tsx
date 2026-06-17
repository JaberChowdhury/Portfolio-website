"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BranchSelectorProps {
  repoName: string;
  allBranches: { name: string }[];
  activeBranchName: string;
}

export default function BranchSelector({
  repoName,
  allBranches,
  activeBranchName,
}: BranchSelectorProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeIndex = allBranches.findIndex(
    (b) => b.name.toLowerCase() === activeBranchName.toLowerCase(),
  );

  const handleClick = (branchName: string) => {
    router.push(`/projects/${repoName}/${encodeURIComponent(branchName)}`);
  };

  return (
    <div className="w-full mb-8">
      <div className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3 flex items-center">
        BRANCHES
        <span className="ml-3 text-[10px] tracking-wider opacity-50 font-medium">
          {allBranches.length}
        </span>
      </div>

      <div className="w-full h-px bg-border mb-4" />

      <div className="flex flex-wrap gap-2 pb-2">
        {allBranches.map((branch, index) => {
          const isActive = index === (activeIndex === -1 ? 0 : activeIndex);

          return (
            <motion.button
              key={branch.name}
              onClick={() => handleClick(branch.name)}
              initial={false}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 4 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.6) }}
              whileHover={{ y: isActive ? 0 : -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative overflow-hidden inline-flex items-center px-3 py-1.5 rounded-sm cursor-pointer
                font-mono text-xs font-bold tracking-widest uppercase select-none border transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:text-primary hover:border-muted-foreground"
                }
              `}
            >
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mr-2 shrink-0 opacity-80" />
              )}
              {branch.name}
            </motion.button>
          );
        })}
      </div>

      <div className="w-full h-px bg-border mt-2" />
    </div>
  );
}
