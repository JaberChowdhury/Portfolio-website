"use client";

import { useRouter } from "next/navigation";

interface TagChipProps {
	tag: string;
	size?: "sm" | "md";
	count?: number;
}

/**
 * Clickable tag chip that navigates to /tags/[tag] on click.
 * Used across blog posts, blog listing, and project cards.
 */
export default function TagChip({ tag, size = "sm", count }: TagChipProps) {
	const router = useRouter();
	const normalized = tag.toLowerCase().trim();

	const paddingClasses = size === "md" ? "px-3 py-1.5" : "px-2 py-1";
	const fontClasses = size === "md" ? "text-xs" : "text-[10px]";

	return (
		<button
			type="button"
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				e.preventDefault();
				router.push(`/tags/${encodeURIComponent(normalized)}`);
			}}
			className={`inline-flex items-center gap-1.5 cursor-pointer bg-transparent border border-border rounded-none ${paddingClasses} transition-all duration-150 ease-out hover:border-foreground hover:bg-muted/10 hover:-translate-y-[1px] active:translate-y-0`}
			aria-label={`Search posts and projects tagged ${normalized}`}
		>
			<span
				className={`font-mono ${fontClasses} font-bold text-foreground tracking-wider leading-none`}
			>
				#{normalized}
			</span>
			{count !== undefined && (
				<span className="font-mono text-[9px] font-bold text-muted-foreground/60 tracking-wider leading-none">
					{count}
				</span>
			)}
		</button>
	);
}
