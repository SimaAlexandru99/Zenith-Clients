import { AppSidebar } from "components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "components/ui/breadcrumb"
import { Separator } from "components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="grid gap-4 auto-rows-min md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
            <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
            <div className="aspect-video rounded-xl bg-zinc-100/50 dark:bg-zinc-800/50" />
          </div>
          <div className="flex-1 min-h-screen rounded-xl bg-zinc-100/50 md:min-h-min dark:bg-zinc-800/50" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
