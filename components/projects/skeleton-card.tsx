import { Skeleton } from "@/components/pouf/feedback"
import { Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"

interface SkeletonCardProps {
  viewMode: "grid" | "list"
}

export function SkeletonCard({ viewMode }: SkeletonCardProps) {
  const isList = viewMode === "list"

  return (
    <Card>
      <div
        className={
          isList
            ? "flex flex-col gap-(--s4) md:flex-row md:items-center"
            : "flex flex-col gap-(--s4)"
        }
      >
        <div className="flex items-center justify-between gap-(--s3)">
          <Skeleton variant="text" count={1} />
          <Skeleton variant="text" count={1} />
        </div>
        <Skeleton variant="card" count={1} />
        <Skeleton variant="text" count={2} />
        <Skeleton variant="row" count={1} />
      </div>
    </Card>
  )
}
