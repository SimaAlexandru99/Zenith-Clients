"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { useAuthState } from "react-firebase-hooks/auth"

import { LoadingComponent } from "components/custom/Main/Loading"
import { auth } from "lib/firebase"

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const pathname = usePathname()

  // Check if the user is not authenticated and not on the login page
  const shouldRedirectToLogin = useMemo(() => !loading && !user && pathname !== "/login", [loading, user, pathname])

  useEffect(() => {
    if (shouldRedirectToLogin) {
      router.push("/login")
    }
  }, [shouldRedirectToLogin, router])

  if (loading) return <LoadingComponent />

  // Prevent rendering of children on non-authenticated routes except "/login"
  if (shouldRedirectToLogin) return null

  return <>{children}</>
}
