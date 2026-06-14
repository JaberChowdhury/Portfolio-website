"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  AArrowDown as Github,
  AArrowUp as Linkedin,
  Mail,
  ArrowUpRight,
  Trophy,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const socials = [
  {
    title: "GitHub",
    description:
      "Explore projects, open-source contributions, and experiments.",
    href: "https://github.com/YOUR_USERNAME",
    icon: Github,
  },
  {
    title: "Codeforces",
    description: "Competitive programming profile, ratings, and contests.",
    href: "https://codeforces.com/profile/YOUR_HANDLE",
    icon: Trophy,
  },
  {
    title: "LinkedIn",
    description: "Professional experience and engineering journey.",
    href: "https://linkedin.com/in/YOUR_USERNAME",
    icon: Linkedin,
  },
  {
    title: "Email",
    description: "Reach out for opportunities, collaboration, or discussion.",
    href: "mailto:your@email.com",
    icon: Mail,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function ContactSection() {
  return (
    <section id="contact" className="relative w-full overflow-hidden py-28">
      {/* Background Aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[650px] rounded-full bg-foreground/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Get In Touch
          </p>

          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            Let's build something
            <br />
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              meaningful together
            </span>
            .
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Whether it&apos;s software engineering, competitive programming,
            open-source collaboration, or an exciting opportunity, I'm always
            interested in meaningful conversations.
          </p>
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <Card className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <CardContent className="relative flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div>
                <Badge
                  variant="secondary"
                  className="mb-4 rounded-full border border-border/50 bg-muted/40"
                >
                  Available For Opportunities
                </Badge>

                <h3 className="max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
                  Open to internships, freelance work, open-source
                  collaboration, and engineering roles.
                </h3>

                <p className="mt-4 max-w-2xl text-muted-foreground">
                  If you have an interesting project, startup, or technical
                  challenge, I'd love to hear about it.
                </p>
              </div>

              <Button
                size="lg"
                className="rounded-full px-8"
                nativeButton={false}
                render={<Link href="mailto:your@email.com" />}
              >
                Say Hello
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {socials.map((social) => {
            const Icon = social.icon

            return (
              <motion.div key={social.title} variants={item}>
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="group h-full overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/40 transition-colors group-hover:border-primary/30">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>

                      <CardTitle className="flex items-center justify-between transition-colors group-hover:text-primary">
                        {social.title}

                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                      </CardTitle>

                      <CardDescription className="leading-relaxed">
                        {social.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
