// RootLayout.tsx

import { Nunito as FontSans } from "next/font/google"
import * as React from "react"
import { AppSidebar } from "components/app-sidebar"
import { Breadcrumbs } from "components/breadcrumbs"
import { AuthWrapper } from "components/custom/Main/AuthWrapper"
import { Separator } from "components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "components/ui/sidebar"
import { Toaster } from "components/ui/toaster"
import { TooltipProvider } from "components/ui/tooltip"
import { cn } from "lib/utils"
import { ThemeProvider } from "providers/ThemeProvider"

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
                  <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                      <Breadcrumbs /> {/* Use the new Breadcrumbs component here */}
                    </div>
                  </header>
                  <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</main>
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
