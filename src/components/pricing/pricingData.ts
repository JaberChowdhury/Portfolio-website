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

export const pricingData: PricingData = {
  header: "PRICING",
  submitProject: {
    label: "SUBMIT YOUR PROJECT",
    prompt:
      "Flexible engagement model designed to accommodate a varying scale of ambition and complexity.",
    buttonText: "Book a call",
  },
  tiers: [
    {
      id: "hourly",
      title: "HOURLY SESSION",
      description:
        "Flexible engagement for specific tasks, consulting, audits, or rapid sprints.",
      buttonText: "Hire Me",
      variant: "light",
    },
    {
      id: "monthly",
      title: "MONTHLY RETAINER",
      description:
        "Dedicated design & engineering resources for continuous product evolution.",
      buttonText: "Hire Me",
      variant: "light",
    },
    {
      id: "project",
      title: "PROJECT BASED",
      hasBullet: true, // For the square bullet icon
      description:
        "End-to-end execution. Full scope with defined deliverables and fixed timeline.",
      buttonText: "Hire Me",
      variant: "dark",
    },
  ],
  emailLink: "EMAIL US",
};
