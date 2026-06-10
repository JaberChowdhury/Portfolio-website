import { Roboto } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        roboto.variable,
        "font-sans",
        roboto.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <GridBackground>
            <Navbar />
            {children}
            <Footer />
          </GridBackground>
        </ThemeProvider>
      </body>
    </html>
  );
}
