"use client";

import ParticleText from "@/components/ParticleText";
import type { CombinedRepo } from "@/lib/github";
import { ArrowLeft, ExternalLink, GitFork, Code, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProjectHeaderProps {
  repoInfo: CombinedRepo;
}

export default function ProjectHeader({ repoInfo }: ProjectHeaderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getParticleFont = (name: string, mobile: boolean) => {
    const baseDesktopSize = 480;
    const baseMobileSize = 420;
    const factor = name.length > 10 ? Math.min(1, 10 / name.length) : 1;
    const desktopSize = Math.max(80, Math.floor(baseDesktopSize * factor));
    const mobileSize = Math.max(45, Math.floor(baseMobileSize * factor));
    return mobile ? mobileSize : desktopSize;
  };

  return (
    <div className="w-full">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase mb-10 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-12 border-b border-border pb-8">
        <div className="h-[150px] md:h-[280px] w-full relative overflow-hidden mb-6">
          <ParticleText
            text={repoInfo.name}
            canvasWidth={3000}
            canvasHeight={3000}
            colorStart="hsl(var(--primary))"
            colorEnd="hsl(var(--primary))"
            fontSize={getParticleFont(repoInfo.name, isMobile)}
            fontWeight={900}
            particleSize={0.45}
          />
        </div>

        {repoInfo.description && (
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-4xl mb-8">
            {repoInfo.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Star className="h-4 w-4" />
            <span className="font-mono text-xs font-bold tracking-wider">
              Stars: {repoInfo.stargazers_count}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <GitFork className="h-4 w-4" />
            <span className="font-mono text-xs font-bold tracking-wider">
              Forks: {repoInfo.forks_count}
            </span>
          </div>

          {repoInfo.size > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="font-mono text-xs font-bold tracking-wider">
                Size: {repoInfo.size > 1024 ? `${(repoInfo.size / 1024).toFixed(1)} MB` : `${repoInfo.size} KB`}
              </span>
            </div>
          )}

          {repoInfo.open_issues_count > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="font-mono text-xs font-bold tracking-wider">
                Issues: {repoInfo.open_issues_count}
              </span>
            </div>
          )}

          <div className="text-muted-foreground">
            <span className="font-mono text-xs font-bold tracking-wider">
              Updated: {formatDate(repoInfo.pushed_at || repoInfo.updated_at)}
            </span>
          </div>

          <a
            href={repoInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary underline hover:text-primary/80 transition-colors"
          >
            <Code className="h-4 w-4" />
            GitHub
          </a>

          {repoInfo.homepage && (
            <a
              href={repoInfo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-primary underline hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
