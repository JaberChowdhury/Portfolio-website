export interface BlogPost {
	name: string;
	route: string;
	frontMatter: {
		title?: string;
		date?: string;
		description?: string;
		tags?: string[];
		author?: string;
		order?: number;
		[key: string]: unknown;
	};
}

export async function getPosts(): Promise<BlogPost[]> {
	// Return empty list of posts to avoid runtime nextra dependencies while typechecking
	return [];
}
