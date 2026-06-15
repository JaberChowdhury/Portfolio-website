import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CustomCursor } from "@/components/customCursor/custom-cursor"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "marlin-font")}
    >
      <body>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main className="mt-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
