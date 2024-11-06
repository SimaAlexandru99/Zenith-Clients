// components/LoginForm.tsx

"use client"

import { doc, getDoc, setDoc } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { auth, db } from "lib/firebase"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const [user, , userError] = useAuthState(auth)
  const [signInWithEmailAndPassword, , loadingSignIn, signInError] = useSignInWithEmailAndPassword(auth)

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

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h1 className="text-center text-3xl font-bold">Autentificare</h1>
        <p className="mt-2 text-center text-sm">
          Introduceți adresa de email și parola pentru a vă autentifica în contul dumneavoastră
        </p>
      </div>
      <form onSubmit={handleEmailSignIn} className="mt-8 space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="exemplu@domeniu.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            aria-describedby="email-description"
          />
          <p id="email-description" className="text-xs text-gray-500">
            Introduceți adresa de email asociată contului dumneavoastră.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="block text-sm font-medium">
              Parolă
            </Label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Ați uitat parola?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
            aria-describedby="password-description"
          />
          <p id="password-description" className="text-xs text-gray-500">
            Introduceți parola asociată contului dumneavoastră.
          </p>
        </div>
        <Button type="submit" className="w-full" disabled={loadingSignIn}>
          {loadingSignIn ? "Autentificare în curs..." : "Autentificare"}
        </Button>
      </form>
      {(signInError || userError) && (
        <p className="mt-4 text-center text-sm text-red-500">{signInError?.message || userError?.message}</p>
      )}
    </div>
  )
}
