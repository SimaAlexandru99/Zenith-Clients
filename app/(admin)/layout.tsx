import { Nunito as FontSans } from "next/font/google"
import { AuthWrapper } from "components/custom/Main/AuthWrapper"
import { Toaster } from "components/ui/toaster"
import { cn } from "lib/utils"
import { ThemeProvider } from "providers/ThemeProvider"

import "styles/tailwind.css"
import "styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthWrapper>
            <main>
              {children}
              <Toaster />
            </main>
          </AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
