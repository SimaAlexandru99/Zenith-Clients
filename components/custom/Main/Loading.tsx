import { Loader2 } from "lucide-react"

export function LoadingComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="size-8 animate-spin" />
    </div>
  )
}
