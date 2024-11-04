// Header.tsx
"use client"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"
import { Separator } from "components/ui/separator"
import { SidebarTrigger } from "components/ui/sidebar"

export default function Header() {
  const pathname = usePathname()
  const pathSegments = pathname?.split("/").filter(Boolean) || []

  // Generate breadcrumb items based on path segments
  const breadcrumbs = pathSegments.map((segment: string, index: number) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/")
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

    return (
      <React.Fragment key={href}>
        {index > 0 && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
        </BreadcrumbItem>
      </React.Fragment>
    )
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
