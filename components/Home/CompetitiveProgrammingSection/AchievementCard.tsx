export interface Achievement {
  title: string
  description: string
}

interface AchievementCardProps {
  achievement: Achievement
  index: number
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  return (
    <div
      data-cursor="cover"
      className="hum-card hum-card--plain rounded-2xl p-7 md:p-8"
    >
      <span className="mono-label text-cyan-deep">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3
        data-cursor="text"
        className="mt-3 text-xl font-bold tracking-tight text-ink"
      >
        {achievement.title}
      </h3>

      <p className="mt-2 leading-relaxed text-ink-2">
        {achievement.description}
      </p>
    </div>
  )
}
