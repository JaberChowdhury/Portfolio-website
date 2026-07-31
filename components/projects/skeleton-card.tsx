import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  viewMode: "grid" | "list"
}

export function SkeletonCard({ viewMode }: SkeletonCardProps) {
  const isList = viewMode === "list"

  return (
    <div
      className={`hum-card--plain flex h-full overflow-hidden rounded-2xl ${isList ? "flex-col md:flex-row" : "flex-col"}`}
    >
      <div
        className={`flex flex-1 flex-col p-6 md:p-7 ${isList ? "md:w-2/3" : ""}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded-full" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-5/6 rounded-full" />
        </div>
        <div className="mt-5 flex gap-2">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
      <div
        className={`flex items-center justify-between gap-3 px-6 pb-6 md:pb-0 ${isList ? "md:w-1/3 md:flex-col md:items-start md:justify-center md:gap-3 md:border-l md:border-border/60 md:px-7" : ""}`}
      >
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-3 w-24 rounded-full" />
      </div>
    </div>
  )
}
