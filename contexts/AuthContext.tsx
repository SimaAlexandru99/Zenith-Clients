"use client"
import { onAuthStateChanged, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "lib/firebase" // Adjust the path to your firebaseConfig

interface AuthContextProps {
  user: User | null
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  error: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe() // Cleanup subscription on unmount
  }, [])

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
