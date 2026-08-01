import { Stat as StatTile } from "@/components/pouf/readout"
import type { IconName } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"

export interface Stat {
  label: string
  value: string
}

interface StatCardProps {
  stat: Stat
  icon: IconName
  tone: Tone
}

export function StatCard({ stat, icon, tone }: StatCardProps) {
  return <StatTile label={stat.label} value={stat.value} icon={icon} tone={tone} />
}
