import { Button } from "@/components/ui/button"
// import WaveDivider from "../Wavedivider"
import { Black_Ops_One, Playwrite_AR_Guides } from "next/font/google"
const black_ops_one = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
})
const playwrite_AR_Guides = Playwrite_AR_Guides({
  weight: "400",
  // subsets: ["latin"],
})
const Navbar = () => {
  return (
    <div className="w-full bg-background py-4">
      {/* Main Navbar Container */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Left Side: Logo/Brand (Matches Arc's minimalist styling) */}
        <div className="flex items-center gap-2">
          {/* Custom geometric logo icon to mimic Arc's style */}
          <div
            className={`flex items-center justify-center rounded-lg bg-primary p-3 text-3xl font-black text-background ${black_ops_one.className} block md:hidden`}
          >
            JABER
          </div>
          <span
            className={`font-sans text-4xl font-bold tracking-tight text-foreground ${playwrite_AR_Guides.className} hidden md:block`}
          >
            Jaber.dev
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#projects"
            className="font-sans text-sm font-medium text-foreground opacity-80 transition-opacity hover:opacity-100"
          >
            <Button variant="ghost">Projects</Button>
          </a>
          <a
            href="#about"
            className="font-sans text-sm font-medium text-foreground opacity-80 transition-opacity hover:opacity-100"
          >
            <Button variant="ghost">About</Button>
          </a>
          <a
            href="#experience"
            className="font-sans text-sm font-medium text-foreground opacity-80 transition-opacity hover:opacity-100"
          >
            <Button variant="ghost">Experience</Button>
          </a>
          <a
            href="#blog"
            className="font-sans text-sm font-medium text-foreground opacity-80 transition-opacity hover:opacity-100"
          >
            <Button variant="ghost">Blog</Button>
          </a>
        </div>

        {/* Right Side: CTA Button (Styled like the prominent Download button) */}
        <div className="flex items-center gap-4">
          <Button className="rounded-full bg-primary px-5 py-2 font-sans text-xs font-semibold tracking-wide text-primary-foreground shadow-sm hover:opacity-90">
            Let's Talk →
          </Button>
        </div>
      </nav>

      {/* The dynamic scalloped edge separating the navbar seamlessly
        from the rest of your portfolio page content.
      */}
      {/*<WaveDivider height={12} hillWidth={28} upsideDown={true} />*/}
    </div>
  )
}

export default Navbar
