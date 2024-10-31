// team-switcher.tsx

"use client"

import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { BookOpen, Bot, ChevronsUpDown, Frame, GalleryVerticalEnd, Map, PieChart, Plus, Settings2, SquareTerminal } from "lucide-react"
import * as React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from "components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"
import { Label } from "components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "components/ui/sidebar"
import { auth, db } from "lib/firebase"

type Team = {
  id: string
  name: string
  logo: React.ElementType
  plan: string
}

type UserRole = {
  [teamId: string]: "admin" | "member"
}

interface TeamSwitcherProps {
  teams: Team[]
  userRoles: UserRole
}

export function TeamSwitcher({ teams, userRoles }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  const [user] = useAuthState(auth)
  const [selectedTeam, setSelectedTeam] = React.useState<Team | null>(null)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [newTeamName, setNewTeamName] = React.useState("")
  const [newTeamLogo, setNewTeamLogo] = React.useState<string>("")
  const [newTeamPlan, setNewTeamPlan] = React.useState<string>("Basic")
  const [isAddingTeam, setIsAddingTeam] = React.useState(false)
  const [addTeamError, setAddTeamError] = React.useState<string | null>(null)

  // Initialize the selected team
  React.useEffect(() => {
    if (teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0] || null)
    }
  }, [teams, selectedTeam])

  // Handle adding a new team
  const handleAddTeam = async () => {
    if (!user) return

    // Basic validation
    if (!newTeamName.trim()) {
      setAddTeamError("Team name is required.")
      return
    }

    if (!newTeamLogo.trim()) {
      setAddTeamError("Team logo is required.")
      return
    }

    if (!newTeamPlan.trim()) {
      setAddTeamError("Team plan is required.")
      return
    }

    setIsAddingTeam(true)
    setAddTeamError(null)

    try {
      const newTeam = {
        name: newTeamName.trim(),
        logo: newTeamLogo.trim() || "GalleryVerticalEnd", // Default logo
        plan: newTeamPlan.trim(),
        teamMembers: [user.uid],
        adminIds: [user.uid],
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "teams"), newTeam)

      // Update local state by selecting the newly created team
      setSelectedTeam({
        id: docRef.id,
        name: newTeamName.trim(),
        logo: getLogoComponent(newTeamLogo.trim()),
        plan: newTeamPlan.trim(),
      })

      // Optionally, update user document to include the new team
      // This depends on your Firestore security rules and data structure

      // Reset form fields
      setNewTeamName("")
      setNewTeamLogo("")
      setNewTeamPlan("Basic")
      setIsDialogOpen(false)
    } catch (err) {
      console.error("Error adding new team:", err)
      setAddTeamError("Failed to add team. Please try again.")
    } finally {
      setIsAddingTeam(false)
    }
  }

  // Helper function to map logo string to component
  const getLogoComponent = (logoName: string): React.ElementType => {
    const logoMap: { [key: string]: React.ElementType } = {
      GalleryVerticalEnd: GalleryVerticalEnd,
      Frame: Frame,
      Bot: Bot,
      PieChart: PieChart,
      Map: Map,
      BookOpen: BookOpen,
      Settings2: Settings2,
      SquareTerminal: SquareTerminal,
      // Add more mappings as needed
    }

    return logoMap[logoName] || GalleryVerticalEnd // Default icon
  }

  // Helper function to get all available logo options
  const getLogoComponentMap = (): { [key: string]: React.ElementType } => {
    return {
      GalleryVerticalEnd: GalleryVerticalEnd,
      Frame: Frame,
      Bot: Bot,
      PieChart: PieChart,
      Map: Map,
      BookOpen: BookOpen,
      Settings2: Settings2,
      SquareTerminal: SquareTerminal,
      // Add more mappings as needed
    }
  }

  // Determine if the user is an admin in any team or has no teams
  const canAddTeam =
    Object.values(userRoles).some((role) => role === "admin") || teams.length === 0

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                <Plus className="size-4" />
              </div>
              <div className="grid flex-1 text-sm leading-tight text-left">
                <span className="font-semibold truncate">
                  {selectedTeam ? selectedTeam.name : "Select a team"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-zinc-500 dark:text-zinc-400">
              Teams
            </DropdownMenuLabel>
            {teams.length > 0 ? (
              teams.map((team) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex items-center justify-center border rounded-sm size-6">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  {team.name}
                  {/* Optionally, indicate if the user is an admin */}
                  {userRoles[team.id] === "admin" && (
                    <span className="ml-auto text-xs text-green-500">Admin</span>
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem className="gap-2 p-2 text-zinc-500 dark:text-zinc-400">
                No teams available
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {/* Only show "Add Team" option if the user is an admin in at least one team or has no teams */}
            {canAddTeam && (
              <DropdownMenuItem
                className="gap-2 p-2 cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                <div className="flex items-center justify-center bg-white border rounded-md size-6 border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-zinc-500 dark:text-zinc-400">Add Team</div>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Team Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Team</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new team.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="team-name" className="text-sm">
                  Team Name
                </Label>
                <input
                  id="team-name"
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <Label htmlFor="team-logo" className="text-sm">
                  Team Logo
                </Label>
                <Select onValueChange={setNewTeamLogo} value={newTeamLogo}>
                  <SelectTrigger id="team-logo" className="w-full">
                    <SelectValue placeholder="Choose a logo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(getLogoComponentMap()).map((logoName) => (
                      <SelectItem key={logoName} value={logoName}>
                        {logoName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="team-plan" className="text-sm">
                  Plan
                </Label>
                <Select onValueChange={setNewTeamPlan} defaultValue="Basic" value={newTeamPlan}>
                  <SelectTrigger id="team-plan" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {addTeamError && (
                <div className="text-sm text-red-500">{addTeamError}</div>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="outline"
                disabled={isAddingTeam}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTeam}
                disabled={
                  isAddingTeam ||
                  !newTeamName.trim() ||
                  !newTeamLogo.trim() ||
                  !newTeamPlan.trim()
                }
              >
                {isAddingTeam ? "Adding..." : "Add Team"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
