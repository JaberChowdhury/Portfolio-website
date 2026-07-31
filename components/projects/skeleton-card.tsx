import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  viewMode: "grid" | "list"
}

export function SkeletonCard({ viewMode }: SkeletonCardProps) {
  const isList = viewMode === "list"

  return (
    <Card
      className={`flex h-full flex-col overflow-hidden rounded-2xl bg-paper-2 text-ink shadow-none ring-0 ${
        isList ? "md:flex-row" : ""
      }`}
    >
      <CardHeader className={`w-full ${isList ? "md:w-1/3" : ""}`}>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-3 w-16 bg-paper-3" />
          <Skeleton className="h-4 w-4 bg-paper-3" />
        </div>
        <Skeleton className="h-6 w-3/4 bg-paper-3" />
      </CardHeader>

      <CardContent
        className={`w-full flex-grow space-y-4 ${isList ? "md:w-2/3 md:pt-6" : ""}`}
      >
        <div className="space-y-2">
          <Skeleton className="h-3 w-full bg-paper-3" />
          <Skeleton className="h-3 w-5/6 bg-paper-3" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12 bg-paper-3" />
          <Skeleton className="h-5 w-16 bg-paper-3" />
          <Skeleton className="h-5 w-14 bg-paper-3" />
        </div>
      </CardContent>

      <CardFooter
        className={`flex w-full items-center justify-between gap-4 ${
          isList ? "md:w-auto md:flex-col md:justify-center md:gap-2" : ""
        }`}
      >
        <Skeleton className="h-4 w-20 bg-paper-3" />
        <Skeleton className="h-3 w-24 bg-paper-3" />
      </CardFooter>
    </Card>
  )
}
