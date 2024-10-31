// app-sidebar.tsx

"use client"

import { collection, onSnapshot, query, where } from "firebase/firestore"
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import * as React from "react"
import { useAuthState } from "react-firebase-hooks/auth"

import { NavMain } from "components/nav-main"
import { NavProjects } from "components/nav-projects"
import { NavUser } from "components/nav-user"
import { TeamSwitcher } from "components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "components/ui/sidebar"
import { auth, db } from "lib/firebase"

// Define the Team type with id, name, logo, and plan
type Team = {
  id: string
  name: string
  logo: React.ElementType
  plan: string
}

// Define the UserRole type to map team IDs to roles
type UserRole = {
  [teamId: string]: "admin" | "member"
}

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user] = useAuthState(auth)
  const [teams, setTeams] = React.useState<Team[]>([])
  const [userRoles, setUserRoles] = React.useState<UserRole>({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Fetch teams and user roles from Firebase
  React.useEffect(() => {
    const fetchTeamsAndRoles = async () => {
      setLoading(true)
      setError(null)

      try {
        if (user) {
          // Set up Firestore real-time listener
          const teamsRef = collection(db, "teams")
          const q = query(teamsRef, where("teamMembers", "array-contains", user.uid))

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const fetchedTeams: Team[] = []
            const roles: UserRole = {}

            querySnapshot.forEach((docSnap) => {
              const teamData = docSnap.data()
              fetchedTeams.push({
                id: docSnap.id,
                name: teamData.name,
                logo: teamData.logo ? getLogoComponent(teamData.logo) : GalleryVerticalEnd,
                plan: teamData.plan,
              })

              // Determine the user's role in the team
              roles[docSnap.id] =
                Array.isArray(teamData.adminIds) && teamData.adminIds.includes(user.uid)
                  ? "admin"
                  : "member"
            })

            setTeams(fetchedTeams)
            setUserRoles(roles)

            // Debugging: Log teams and roles
            console.log("Fetched Teams:", fetchedTeams)
            console.log("User Roles:", roles)

            setLoading(false)
          })

          // Cleanup listener on unmount
          return () => unsubscribe()
        } else {
          setTeams([])
          setUserRoles({})
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching teams and roles:", err)
        setError("Failed to load teams. Please try again.")
        setLoading(false)
      }
    }

    fetchTeamsAndRoles()
  }, [user])

  // Helper function to map logo string to component
  const getLogoComponent = (logoName: string): React.ElementType => {
    // Map logo names to Lucide icons or your custom icons
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {loading ? (
          <span>Loading teams...</span>
        ) : error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          <TeamSwitcher teams={teams} userRoles={userRoles} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
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
      <SidebarRail />
    </Sidebar>
  )
}

// Sample data for non-user sections
const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "History", url: "#" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        { title: "Genesis", url: "#" },
        { title: "Explorer", url: "#" },
        { title: "Quantum", url: "#" },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Introduction", url: "#" },
        { title: "Get Started", url: "#" },
        { title: "Tutorials", url: "#" },
        { title: "Changelog", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Limits", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
}
