"use client"

import Link from "next/link"
import {
  AArrowDown as Github,
  AArrowDownIcon as Linkedin,
  Mail,
  ArrowUpRight,
  Trophy,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-background/5 blur-[120px]" />
      </div>

      {/* Giant Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <h2 className="text-[18vw] font-black tracking-tighter text-background/[0.03] select-none">
          DEV
        </h2>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* CTA */}
        <div className="border-b border-background/10 py-24">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs tracking-[0.35em] text-background/60 uppercase">
              Final Destination
            </p>

            <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-7xl">
              Let's create
              <br />
              something remarkable.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/70">
              Software engineering, competitive programming, open-source
              collaboration, or just a conversation about technology — my inbox
              is always open.
            </p>

            <Link
              href="mailto:your@email.com"
              className="group mt-10 inline-flex items-center rounded-full border border-background/20 px-7 py-3 text-sm font-medium transition-all duration-300 hover:border-background/40 hover:bg-background hover:text-foreground"
            >
              Start a Conversation
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Your Name</h3>

            <p className="mt-4 max-w-sm leading-relaxed text-background/70">
              Full Stack Engineer, Competitive Programmer, and builder of
              performant digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 text-sm font-medium tracking-[0.25em] text-background/60 uppercase">
              Navigation
            </h4>

            <div className="flex flex-col gap-3">
              {[
                "Home",
                "Projects",
                "Competitive Programming",
                "Experience",
                "Contact",
              ].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="w-fit text-background/70 transition-colors hover:text-background"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-5 text-sm font-medium tracking-[0.25em] text-background/60 uppercase">
              Connect
            </h4>

            <div className="space-y-4">
              <Link
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                className="group flex items-center justify-between rounded-xl border border-background/10 p-4 transition-all hover:border-background/20"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4" />
                  GitHub
                </div>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                className="group flex items-center justify-between rounded-xl border border-background/10 p-4 transition-all hover:border-background/20"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </div>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="https://codeforces.com/profile/YOUR_HANDLE"
                target="_blank"
                className="group flex items-center justify-between rounded-xl border border-background/10 p-4 transition-all hover:border-background/20"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4" />
                  Codeforces
                </div>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="mailto:your@email.com"
                className="group flex items-center justify-between rounded-xl border border-background/10 p-4 transition-all hover:border-background/20"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  Email
                </div>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/10 py-8 text-sm text-background/50 md:flex-row">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>

          <p>Built with Next.js, TypeScript, Tailwind CSS & Framer Motion.</p>
        </div>
      </div>
    </footer>
  )
}
