"use client"
import { FileText, Home, LineChart, Menu, Search, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem } from "components/custom/Main/NavItem"
import { UserMenu } from "components/custom/Main/UserMenu" // Import the new UserMenu component
import { Button } from "components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Input } from "components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "components/ui/sheet"

export const Header = () => {
  const pathname = usePathname() // Get the current path to set the active state

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/logo.png" // Update the path to your image
                alt="Optima Logo"
                width={30}
                height={30}
                className="size-6"
              />
              <span className="">Optima Solutions</span>
            </Link>

            {/* Adding NavItems like in Sidebar */}
            <NavItem href="/" icon={<Home className="size-4" />} label="Dashboard" active={pathname === "/"} />
            <NavItem
              href="/customers"
              icon={<Users className="size-4" />}
              label="Customers"
              active={pathname === "/customers"}
            />
            <NavItem
              href="/reports"
              icon={<FileText className="size-4" />}
              label="Reports"
              active={pathname === "/reports"}
            />
            <NavItem
              href="/analytics"
              icon={<LineChart className="size-4" />}
              label="Analytics"
              active={pathname === "/analytics"}
            />
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserMenu /> {/* Use the new UserMenu component here */}
    </header>
  )
}
