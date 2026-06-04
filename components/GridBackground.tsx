// components/GridBackground.tsx
"use client";

import type React from "react";

export default function GridBackground({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className="w-screen min-h-screen bg-background text-foreground relative"
			style={{
				backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
				backgroundSize: "40px 40px",
			}}
		>
			{children}
		</div>
	);
}
