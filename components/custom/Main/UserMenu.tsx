"use client"

import { CreditCard, Lock, LogOut, Settings, Share2, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuthState } from "react-firebase-hooks/auth"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { Switch } from "components/ui/switch"
import { auth } from "lib/firebase" // Asigurați-vă că această cale este corectă

export const UserMenu = () => {
  const [user] = useAuthState(auth)
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-8">
          <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "Avatar utilizator"} />
          <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 rounded-xl" align="end">
        <div className="flex items-center p-2">
          <Avatar className="mr-2 size-8">
            <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "Avatar utilizator"} />
            <AvatarFallback>{user?.email?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.displayName ?? "Utilizator"}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          <span>Setări</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Lock className="mr-2 size-4" />
          <span>Securitate</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users className="mr-2 size-4" />
          <span>Echipe</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 size-4" />
          <span>Abonamente</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="mr-2 size-4" />
          <span>Recomandări</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm">Mod întunecat</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => auth.signOut()}>
          <LogOut className="mr-2 size-4" />
          <span>Deconectare</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}