"use client"
import { Bell, FileText, Home, LineChart, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "components/custom/Main/NavItem"
import { Button } from "components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { ScrollArea } from "components/ui/scroll-area"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-30 hidden w-[220px] border-r bg-muted/40 md:block lg:w-[280px]">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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
          <Button variant="outline" size="icon" className="ml-auto size-8">
            <Bell className="size-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="grid items-start gap-2 text-sm font-medium lg:px-2">
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
        </ScrollArea>
        <div className="mt-auto border-t p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}