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
export function SkeletonGrid({width = "280px", height = "300px", numbers = 9}: {width?: string, height?: string, numbers?: number}) {
  return (
     <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: numbers }).map((_, index) => (
        <SkeletonCard key={index} width={width} height={height} />
      ))}
    </div>
  )
}