import Link from "next/link"
import { cn } from "lib/utils"

export interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  badge?: React.ReactNode
  active?: boolean
}

export function NavItem({ href, icon, label, badge, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
      )}
    >
      {icon}
      {label}
      {badge}
    </Link>
  )
}
