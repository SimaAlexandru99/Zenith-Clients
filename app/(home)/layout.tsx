import { Nunito as FontSans } from "next/font/google"
import { AuthWrapper } from "components/custom/Main/AuthWrapper"
import { Header } from "components/custom/Main/Header"
import { Sidebar } from "components/custom/Main/Sidebar"
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
            <Sidebar />
            <main className="md:pl-[220px] lg:pl-[280px]">
              <Header />
              {children}
            </main>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
