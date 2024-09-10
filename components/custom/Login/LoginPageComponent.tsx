"use client"

import { doc, getDoc, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { auth, db } from "lib/firebase"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const [user] = useAuthState(auth)
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth)
  const [signInWithGoogle, , googleLoading, googleError] = useSignInWithGoogle(auth)

  const checkUserRole = useCallback(
    async (uid: string) => {
      const userRef = doc(db, "users", uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userData = userSnap.data()
        if (userData.role) {
          router.push("/")
        } else {
          await setDoc(userRef, { role: "user" }, { merge: true })
          router.push("/")
        }
      } else {
        await setDoc(userRef, {
          email: user?.email,
          role: "user",
        })
        router.push("/")
      }
    },
    [router, user?.email]
  )

  useEffect(() => {
    if (user) {
      checkUserRole(user.uid)
    }
  }, [user, checkUserRole])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signInWithEmailAndPassword(email, password)
  }

  const handleGoogleSignIn = async () => {
    await signInWithGoogle()
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <p className="mt-2 text-center text-sm text-gray-600">Enter your email below to login to your account</p>
      </div>
      <form onSubmit={handleEmailSignIn} className="mt-8 space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <div className="mt-6">
        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" disabled={googleLoading}>
          {googleLoading ? "Logging in..." : "Login with Google"}
        </Button>
      </div>
      {(error || googleError) && (
        <p className="mt-4 text-center text-sm text-red-500">{error?.message || googleError?.message}</p>
      )}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
