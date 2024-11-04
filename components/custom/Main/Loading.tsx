import { Loader2 } from "lucide-react"

export function LoadingComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="size-8 animate-spin" />
    </div>
  )
}
