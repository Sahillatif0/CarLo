import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard({width = "280px", height = "150px"}: {width?: string, height?: string}) {
  return (
    <div className={`flex flex-col space-y-3 w-[${width}]`}>
      <Skeleton className={`h-[${height}] w-[${width}] rounded-xl`} />
      <div className="space-y-2">
        <Skeleton className={`h-4 w-[${width}]`} />
        <Skeleton className={`h-4 w-[calc(${width} - 20px)]`} />
      </div>
    </div>
  )
}
export function SkeletonGrid() {
  return (
    <div className="mt-5 space-y-4 flex flex-wrap gap-4 align-center justify-center">
      {Array.from({ length: 9 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}