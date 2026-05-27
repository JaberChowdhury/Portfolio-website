import PostStats from "@/components/PostStats";
import { ReactNode } from "react";

export default function PostsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
      <PostStats />
    </>
  );
}
