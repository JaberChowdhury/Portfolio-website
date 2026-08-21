import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  viewMode: "grid" | "list"
}

export function SkeletonCard({ viewMode }: SkeletonCardProps) {
  const isList = viewMode === "list"

  return (
    <Card
      className={`flex h-full overflow-hidden ${isList ? "flex-col items-center md:flex-row" : "flex-col"}`}
    >
      <CardHeader
        className={`w-full p-4 pb-2 sm:p-6 sm:pb-3 ${isList ? "md:w-1/3" : ""}`}
      >
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>

      <CardContent
        className={`w-full flex-grow space-y-4 p-4 pt-0 sm:p-6 sm:pt-0 ${isList ? "md:w-2/3 md:pt-6" : ""}`}
      >
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>

      <CardFooter
        className={`flex w-full flex-wrap items-center justify-between gap-2 border-t border-border/50 bg-muted/20 px-4 py-3 sm:px-6 sm:py-4 ${isList ? "md:w-auto md:flex-col md:justify-center md:gap-2 md:border-t-0 md:border-l" : ""}`}
      >
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-24" />
      </CardFooter>
    </Card>
  )
}
