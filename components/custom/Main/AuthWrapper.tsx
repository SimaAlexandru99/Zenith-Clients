"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

import { LoadingComponent } from "components/custom/Main/Loading"
import { auth } from "lib/firebase"

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return <LoadingComponent />
  }

  if (!user && pathname !== "/login") {
    return null // This prevents a flash of unwanted content
  }

  return <>{children}</>
}
