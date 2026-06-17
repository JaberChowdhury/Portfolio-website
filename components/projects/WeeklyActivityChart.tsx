"use client";

import { useState } from "react";

interface WeeklyActivityChartProps {
  weeklyActivity: number[];
}

export default function WeeklyActivityChart({
  weeklyActivity,
}: WeeklyActivityChartProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const activity = weeklyActivity || [];
  if (activity.length === 0) return null;

  const maxCommits = Math.max(...activity, 1);
  const totalCommits = activity.reduce((a, b) => a + b, 0);

  const getWeekDateRange = (weekIndex: number) => {
    const today = new Date();
    const daysAgoStart = (51 - weekIndex) * 7;
    const startOfWeek = new Date(today.getTime() - daysAgoStart * 24 * 60 * 60 * 1000);
    const dayOfWeek = startOfWeek.getDay();
    const monday = new Date(startOfWeek.getTime() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) * 24 * 60 * 60 * 1000);
    const sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);

    const formatWeekDate = (d: Date) => {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return `${formatWeekDate(monday)} – ${formatWeekDate(sunday)}`;
  };

  return (
    <div className="flex flex-col h-full bg-muted/20 border border-border p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground">
          WEEKLY ACTIVITY
        </div>
        <div className="font-mono text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded-sm">
          {totalCommits} commits
        </div>
      </div>

      <div className={`font-mono text-xs mb-6 h-5 ${hoveredWeek !== null ? "text-primary font-bold" : "text-muted-foreground"}`}>
        {hoveredWeek !== null
          ? `${getWeekDateRange(hoveredWeek)}: ${activity[hoveredWeek]} ${activity[hoveredWeek] === 1 ? "commit" : "commits"}`
          : "Hover over the bars to see activity detail"}
      </div>

      <div className="w-full relative">
        <svg
          viewBox="0 0 520 100"
          width="100%"
          height="100"
          style={{ overflow: "visible", display: "block" }}
          role="img"
        >
          <title>Weekly Commit Activity Chart</title>
          
          <line x1="0" y1="0" x2="520" y2="0" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3,3" />
          <line x1="0" y1="50" x2="520" y2="50" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3,3" />
          <line x1="0" y1="100" x2="520" y2="100" stroke="currentColor" strokeOpacity="0.2" />

          {activity.map((commits, idx) => {
            const barWidth = 7;
            const spacing = 3;
            const x = idx * (barWidth + spacing);
            const barHeight = maxCommits > 0 ? (commits / maxCommits) * 90 : 0;
            const y = 100 - barHeight;

            const isHovered = hoveredWeek === idx;
            let fill = "currentColor";
            let opacity = 0.15;
            
            if (commits > 0) {
              fill = "hsl(var(--primary))";
              opacity = isHovered ? 1 : 0.65;
            } else if (isHovered) {
              opacity = 0.4;
            }

            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight || 3}
                fill={fill}
                style={{ opacity, cursor: "pointer", transition: "all 0.15s ease" }}
                onMouseEnter={() => setHoveredWeek(idx)}
                onMouseLeave={() => setHoveredWeek(null)}
              />
            );
          })}
        </svg>

        <div className="flex justify-between mt-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          <span>1 year ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
