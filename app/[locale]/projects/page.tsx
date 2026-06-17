"use client";

import ParticleText from "@/components/ParticleText";
import { ProjectCard } from "@/components/projects/project-card";
import { SkeletonCard } from "@/components/projects/skeleton-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FALLBACK_REPOS } from "@/data/fallbackRepos";
import type { RepoSummary } from "@/lib/github";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, Search } from "lucide-react";
import { useEffect, useState } from "react";

const CACHE_KEY = "github_repos_cache";
const CACHE_TIME_KEY = "github_repos_cache_time";
const CACHE_DURATION = 15 * 60 * 1000;

export default function ProjectsPage() {
  const [repos, setRepos] = useState<RepoSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    document.title = "Projects | Portfolio";
  }, []);

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        setLoading(true);

        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

        if (cachedData && cachedTime && Date.now() - Number(cachedTime) < CACHE_DURATION) {
          setRepos(JSON.parse(cachedData));
          setIsFallback(false);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error(`Failed to fetch repos: ${response.status}`);

        const data: RepoSummary[] = await response.json();
        
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
        sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));

        setRepos(data);
        setIsFallback(false);
      } catch (error) {
        console.error("GitHub API fetch failed, loading cached/fallback data:", error);
        
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        if (cachedData) {
          setRepos(JSON.parse(cachedData));
        } else {
          setRepos(FALLBACK_REPOS);
        }
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubRepos();
  }, []);

  const languageList = [
    "All",
    ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[],
  ];

  const processedRepos = repos
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  return (
    <div className="container mx-auto px-4 pt-24 pb-20 md:pt-32 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 md:mb-16">
        <div className="h-[120px] md:h-[220px] w-full relative overflow-hidden mb-6">
          <ParticleText
            text="PROJECTS"
            colorStart="hsl(var(--primary))"
            colorEnd="hsl(var(--primary))"
            canvasWidth={3400}
            canvasHeight={3400}
            fontSize={450}
            fontWeight={900}
            particleSize={0.5}
          />
        </div>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Explore my open-source repositories and development work.
        </p>
      </div>

      {isFallback && !loading && (
        <div className="mb-8 p-4 border-l-4 border-primary bg-muted/50 text-muted-foreground font-mono text-sm">
          // Displaying cached catalog (GitHub API rate limit hit).
        </div>
      )}

      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-10">
        
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
            <Select value={sortBy} onValueChange={(v) => { if (v) setSortBy(v as "updated" | "stars" | "name"); }}>
              <SelectTrigger className="w-[160px] bg-background font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Latest Update</SelectItem>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")} className="w-[160px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" className="font-bold tracking-widest text-[10px] uppercase flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5" /> Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="font-bold tracking-widest text-[10px] uppercase flex items-center gap-2">
                <List className="w-3.5 h-3.5" /> List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Language Filter Tags */}
      {!loading && repos.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {languageList.map((lang) => {
            const isSelected = selectedLanguage === lang;
            return (
              <Badge
                key={lang}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 text-xs font-mono transition-all hover:-translate-y-[1px]"
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang === "All" ? "All Languages" : lang}
              </Badge>
            );
          })}
        </div>
      )}

      {/* Projects Grid/List */}
      {loading ? (
        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} viewMode={viewMode} />
          ))}
        </div>
      ) : processedRepos.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {processedRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} viewMode={viewMode} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
