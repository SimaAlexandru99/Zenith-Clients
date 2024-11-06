"use client"

import { Home, Map, PieChart, SquareTerminal, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { NavMain } from "components/nav-main"
import { NavUser } from "components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "components/ui/sidebar"
import { auth } from "lib/firebase"

// Helper function to extract and format display name from email
function getDisplayName(email: string) {
  const [namePart] = email.split("@")
  const [firstName, lastName] = namePart?.split(".") || ["", ""]
  return `${capitalize(firstName || "")} ${capitalize(lastName || "")}`
}

// Helper function to capitalize the first letter
function capitalize(name: string) {
  if (!name) return ""
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

const data = {
  navMain: [
    {
      title: "Panou de control",
      url: "/panou-de-control",
      icon: Home, // Ensure Home icon is imported
      isActive: false,
      items: [],
    },
    {
      title: "Clienti",
      url: "/clienti",
      icon: Users, // Ensure Users icon is imported
      items: [],
    },
    {
      title: "Analitice",
      url: "/analitice",
      icon: PieChart, // Ensure LineChart icon is imported
      isActive: true,
      items: [
        { title: "Analiza UT", url: "/analitice/ut-dashboard", icon: Map },
        { title: "Analiza CC", url: "/analitice/cc-dashboard", icon: SquareTerminal },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user] = useAuthState(auth)
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <Image
                  src="/logo.png" // Asigură-te că imaginea există în public/images/logo.png
                  alt="Optima Solutions Services Logo"
                  width={40} // Ajustează dimensiunea după necesități
                  height={40}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Optima Solutions Services</span>
                  <span className="truncate text-xs">Analitice</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: getDisplayName(user.email || "User"),
              email: user.email || "No email",
              avatar: user.photoURL || "/default-avatar.jpg", // Default avatar image if no photoURL is set
            }}
          />
        ) : (
          <span className="text-sm">Not logged in</span>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
