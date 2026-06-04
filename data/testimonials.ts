export interface TestimonialData {
	id: number;
	quote: string;
	clientName: string;
	company: string;
	project: string;
	verified: boolean;
}

export const testimonialsData: TestimonialData[] = [
	{
		id: 1,
		quote:
			"Working with Jaber was a transformative experience for our brand. The attention to detail and technical precision are unmatched.",
		clientName: "Sarah Jenkins",
		company: "Monkeys / Creative Director",
		project: "MONKEYS",
		verified: true,
	},
	{
		id: 2,
		quote:
			"He perfectly captured the heritage of our estate while bringing us into the modern digital age. The final product exceeded all expectations.",
		clientName: "Tiago Silva",
		company: "Morgado SA / CEO",
		project: "MORGADO SA",
		verified: true,
	},
	{
		id: 3,
		quote:
			"The complex web platform was delivered ahead of schedule, with incredibly clean code and a stunning user interface.",
		clientName: "Elena Rodriguez",
		company: "Repulsor / Tech Lead",
		project: "REPULSOR",
		verified: false,
	},
];
