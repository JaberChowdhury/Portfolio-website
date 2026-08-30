"use client"

import React from "react"
import { GraduationCap, LucideIcon, BookOpen } from "lucide-react"
import { M3FacetedBadge, M3AssistChip } from "@/components/m3/M3Shapes"

export interface ProgressItem {
  label: string
  value: string
}

export interface EducationCardProps {
  title: string
  subtitle: string
  description: string
  subjects: string[]
  progress: ProgressItem[]
  icon?: LucideIcon
  asymmetric?: boolean
}

export function EducationCard({
  title,
  subtitle,
  description,
  subjects,
  progress,
  icon: Icon = GraduationCap,
  asymmetric = true,
}: EducationCardProps) {
  return (
    <div
      data-cursor="cover"
      className={`group relative overflow-hidden border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-5 sm:p-6 md:p-7 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)] ${
        asymmetric
          ? "rounded-[36px_14px_36px_14px] sm:rounded-[44px_16px_44px_16px]"
          : "rounded-t-[40px] rounded-b-[18px]"
      }`}
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left Column: University Degree Overview & Core Coursework */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-3.5 flex items-start gap-3.5 sm:gap-4">
              {/* Faceted M3 Icon Badge */}
              <M3FacetedBadge
                shape="gem"
                icon={Icon}
                size={52}
                iconClassName="h-6 w-6"
              />

              <div className="min-w-0 flex-1">
                <h3
                  data-cursor="text"
                  className="text-lg sm:text-xl md:text-2xl font-black break-words text-[var(--md-sys-color-on-surface)]"
                >
                  {title}
                </h3>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--md-sys-color-primary)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary)]" />
                  <span className="break-words">{subtitle}</span>
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
              {description}
            </p>
          </div>

          {/* Core Coursework Assist Chips */}
          {subjects.length > 0 && (
            <div className="mt-4 border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3.5">
              <div className="font-mono text-[11px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-[var(--md-sys-color-primary)]" />
                <span>Core Coursework & Curriculum</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {subjects.map((subject) => (
                  <M3AssistChip key={subject} label={subject} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Academic Progress Milestone Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 content-start">
          {progress.map((item, i) => {
            const containerTones = [
              "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-primary)]",
              "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-secondary)]",
              "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-tertiary)]",
              "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-primary)]",
            ][i % 4]

            return (
              <div
                key={item.label}
                className={`flex flex-col justify-center rounded-2xl border border-[var(--md-sys-color-outline-variant)]/50 p-3 transition-colors ${containerTones}`}
              >
                <div className="font-mono text-sm sm:text-base md:text-lg font-black tracking-tight break-words">
                  {item.value}
                </div>
                <p className="mt-0.5 font-mono text-[10px] sm:text-xs text-[var(--md-sys-color-on-surface-variant)] break-words">
                  {item.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EducationCard
