// RootLayout.tsx

import { Nunito as FontSans } from "next/font/google"
import { AppSidebar } from "components/app-sidebar"
import { AuthWrapper } from "components/custom/Main/AuthWrapper"
import Header from "components/Header"
import MainContent from "components/MainContent"
import { SidebarProvider } from "components/ui/sidebar"
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
            <SidebarProvider>
              <AppSidebar />
              <div>
                <Header />
                <MainContent>{children}</MainContent>
              </div>
            </SidebarProvider>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
