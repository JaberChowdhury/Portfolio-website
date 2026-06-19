/** @jsxImportSource react */
import React from "react"

interface WithSectionOptions {
  id?: string
  bgClass?: string
}

export function withSection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithSectionOptions = {}
) {
  const ComponentWithSection = (props: P) => {
    const { id, bgClass = "bg-[var(--background)]" } = options

    return (
      <section
        id={id}
        // Mobile: strict 100dvh height, snap-start
        // Desktop (md:): normal height, spacing padding, drops snapping completely
        className={`flex h-dvh w-full snap-start items-center justify-center px-6 md:h-auto md:snap-none md:px-12 md:py-32 ${bgClass}`}
      >
        <div className="mx-auto w-full max-w-5xl">
          <WrappedComponent {...props} />
        </div>
      </section>
    )
  }

  ComponentWithSection.displayName = `withSection(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`

  return ComponentWithSection
}
/*
How to use
// components/sections/Projects.tsx
import React from "react"
import { withSection } from "../hoc/withSection"

const ProjectsBase = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-[var(--foreground)]">Selected Work</h2>
      <p className="text-muted-foreground mt-2">A curated look at my latest work.</p>
    </div>
  )
}

// Export the enhanced version directly tied to your snap targets
export const ProjectsSection = withSection(ProjectsBase, {
  id: "projects",
  bgClass: "bg-[var(--card)]" // Optional variant background styling
})
*/
