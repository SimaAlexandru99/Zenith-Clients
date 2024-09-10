"use client"

import { signOut } from "@firebase/auth"
import { LogOut, Moon, User as UserIcon, UserRound } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth" // Use react-firebase-hooks for authentication state
import { Avatar, AvatarFallback } from "components/ui/avatar"
import { Button } from "components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "components/ui/sheet"
import { Skeleton } from "components/ui/skeleton"
import { Switch } from "components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip"
import { toast } from "components/ui/use-toast"
import { auth } from "lib/firebase"

export default function Header() {
  const [loading, setLoading] = useState(true)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [user] = useAuthState(auth) // Use useAuthState to get the current user

  useEffect(() => {
    // Redirect to /login if not authenticated
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    // Simulate a loading effect
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleDarkModeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleAvatarClick = () => {
    router.push("/login")
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Logged out",
        description: "You have successfully logged out.",
      })
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      })
    }
  }

  const getInitials = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return ""
  }

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="mr-4 hidden md:flex">
          {loading ? (
            <Skeleton className="w-18 mr-2 h-20" />
          ) : (
            <Link className="mr-4 flex items-center space-x-2 lg:mr-6" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-6">
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
              </svg>
              <span className="hidden font-bold lg:inline-block">zenith</span>
            </Link>
          )}
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {loading ? (
              <>
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-14" />
                <Skeleton className="h-6 w-14" />
              </>
            ) : (
              <>
                <Link className="text-foreground/60 transition-colors hover:text-foreground/80" href="/ut-dashboard">
                  UT Dashboard
                </Link>
                <Link className="text-foreground/60 transition-colors hover:text-foreground/80" href="/cc-dashboard">
                  CC Dashboard
                </Link>
                <Link className="text-foreground/60 transition-colors hover:text-foreground/80" href="/docs">
                  Docs
                </Link>
              </>
            )}
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="mr-2 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent hover:text-accent-foreground focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 md:hidden"
              type="button"
            >
              <svg
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
              >
                <path
                  d="M3 5H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 12H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 19H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Select a page to visit.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 text-sm">
              {loading ? (
                <>
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                </>
              ) : (
                <>
                  <Link className="text-foreground/60 transition-colors hover:text-foreground/80" href="/ut-dashboard">
                    UT Dashboard
                  </Link>
                  <Link className="text-foreground/60 transition-colors hover:text-foreground/80" href="/cc-dashboard">
                    CC Dashboard
                  </Link>
                  <Link className="text-foreground/60 transition-colors hover:text-foreground/80" href="/docs">
                    Docs
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="justify flex items-center gap-2">
            {loading ? (
              <Skeleton className="size-8 rounded-full" />
            ) : user ? (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Avatar className="size-8 cursor-pointer">
                          <AvatarFallback className="text-sm">{getInitials()}</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="mt-2 w-64 space-y-4 p-4">
                        <div className="flex items-center justify-between space-x-2">
                          <div>
                            <p className="text-sm font-medium">{user.displayName || user.email}</p>
                          </div>
                        </div>
                        <div className="my-2 border-t border-border/40"></div>
                        <Button variant="ghost" className="flex w-full items-center justify-start space-x-2 pl-1">
                          <UserIcon className="size-4 text-muted-foreground" />
                          <span>Account settings</span>
                        </Button>
                        <div className="flex items-center justify-between space-x-2">
                          <span className="flex items-center space-x-2 pl-1">
                            <Moon className="size-4 text-muted-foreground" />
                            <span>Dark mode</span>
                          </span>
                          <Switch checked={theme === "dark"} onCheckedChange={handleDarkModeToggle} />
                        </div>
                        <div className="my-2 border-t border-border/40"></div>
                        <Button variant="ghost" className="w-full justify-start space-x-2 pl-1" onClick={handleLogout}>
                          <LogOut className="size-4 text-muted-foreground" />
                          <span>Log out</span>
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="size-8 cursor-pointer" onClick={handleAvatarClick}>
                      <AvatarFallback>
                        <UserRound className="size-4" />
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Login</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
