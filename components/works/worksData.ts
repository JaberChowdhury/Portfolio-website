// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
	id: number;
	title: string;
	bg: string;
	accent: string;
	description: string;
	services: string;
	industry: string;
	location: string;
	textColor: string;
	repoName?: string;
}

// ─── Card Layout Constants ────────────────────────────────────────────────────

export const CARD_WIDTH = 520;
export const CARD_GAP = 16;
export const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
