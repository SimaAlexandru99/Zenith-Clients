import { Card, CardContent, CardHeader } from "components/ui/card"
import { Skeleton } from "components/ui/skeleton"

export function SkeletonChart({ single = false }: { single?: boolean }) {
  return (
    <Card className="flex size-full flex-col">
      {" "}
      {/* Ensure full width and height */}
      <CardHeader className="flex w-full flex-col items-center pb-4">
        <Skeleton className="mb-4 h-8 w-3/4" /> {/* Adjusted for responsiveness */}
        <Skeleton className="mb-2 h-6 w-1/2" />
      </CardHeader>
      <CardContent className="flex w-full flex-1 items-center justify-center">
        <Skeleton className={`rounded-full ${single ? "size-[250px]" : "size-[200px]"}`} />
      </CardContent>
      <div className="w-full p-6 pt-0">
        <div className="mt-4 flex w-full justify-around gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-14" />
            </div>
          ))}
        </div>
        <Skeleton className="mx-auto mt-6 h-3 w-40" />
      </div>
    </Card>
  )
}
