// components/Breadcrumbs.tsx
"use client"

import { usePathname } from "next/navigation" // Change useRouter to usePathname
import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"

export function Breadcrumbs() {
  const pathname = usePathname() // use usePathname instead of useRouter
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
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  )
}
