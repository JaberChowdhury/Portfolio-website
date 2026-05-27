import type { Metadata } from "next";
import TagsIndexClient from "./TagsIndexClient";

export const metadata: Metadata = {
  title: "Browse Tags | MD Jaber Hossain Chowdhury",
  description:
    "Explore all blog posts and open-source projects by tag. Filter by topic to find related writing and code.",
};

export default function TagsIndexPage() {
  return <TagsIndexClient />;
}
