import type { Metadata } from "next";
import TagSearchClient from "./TagSearchClient";

interface Props {
	params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { tag } = await params;
	const decoded = decodeURIComponent(tag);
	return {
		title: `#${decoded} — Tag Search | MD Jaber Hossain Chowdhury`,
		description: `Browse all blog posts and open-source projects tagged with #${decoded}.`,
	};
}

export default async function TagPage({ params }: Props) {
	const { tag } = await params;
	const decoded = decodeURIComponent(tag).toLowerCase().trim();
	return <TagSearchClient tag={decoded} />;
}
