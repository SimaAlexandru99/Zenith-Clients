"use client"

import { ChevronsUpDown, CircleUserRound, LogOut } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "components/ui/sidebar"
import { auth } from "lib/firebase"

export function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
  const { isMobile } = useSidebar()

  // Function to handle sign-out
  const handleSignOut = () => {
    auth.signOut()
  }

  // Extract initials (first letter of each name part)
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="rounded-lg size-8">
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-semibold truncate">{user.name}</span>
                <span className="text-xs truncate">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="rounded-lg size-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-semibold truncate">{user.name}</span>
                  <span className="text-xs truncate">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/contul-meu">
                <CircleUserRound />
                <span>Contul meu</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 size-4" />
              <span>Deconectare</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
