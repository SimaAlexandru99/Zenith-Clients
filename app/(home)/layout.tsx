// RootLayout.tsx

import { Nunito as FontSans } from "next/font/google"
import * as React from "react"
import { AppSidebar } from "components/app-sidebar"
import { Breadcrumbs } from "components/breadcrumbs"
import { Separator } from "components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "components/ui/sidebar"
import { Toaster } from "components/ui/toaster"
import { TooltipProvider } from "components/ui/tooltip"
import { ThemeProvider } from "providers/ThemeProvider"
import { AuthWrapper } from "components/custom/Main/AuthWrapper"
import { cn } from "lib/utils"


import "styles/tailwind.css"
import "styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthWrapper>
            <TooltipProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex items-center h-16 gap-2 shrink-0">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="h-4 mr-2" />
                      <Breadcrumbs /> {/* Use the new Breadcrumbs component here */}
                    </div>
                  </header>
                  <main className="flex flex-col flex-1 gap-4 p-4 pt-0">{children}</main>
                </SidebarInset>
                <Toaster />
              </SidebarProvider>
            </TooltipProvider>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
