export interface Tier {
	id: string;
	title: string;
	description: string;
	buttonText: string;
	variant: string;
	hasBullet?: boolean;
}

export interface SubmitProjectData {
	label: string;
	prompt: string;
	buttonText: string;
}

export interface PricingData {
	header: string;
	submitProject: SubmitProjectData;
	tiers: Tier[];
	emailLink: string;
}
