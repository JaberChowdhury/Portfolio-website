export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: "q1",
    question: "What kind of projects do I handle?",
    answer:
      "I specialize in creating bespoke digital experiences, ranging from high-end personal portfolios and startup landing pages to complex web applications and immersive 3D interfaces. I focus on projects where premium design aesthetics and technical performance intersect.",
  },
  {
    id: "q2",
    question: "How does a project usually start?",
    answer:
      "It begins with a discovery conversation. We'll book a call to align on your vision, goals, and technical requirements. Once we define the scope, I'll provide a detailed proposal and timeline before we kick off the strategy and design phases.",
  },
  {
    id: "q3",
    question: "What happens if the result isn't quite what I expected?",
    answer:
      "Transparency and collaboration are key to my process. We have built-in review cycles at every major milestone (wireframing, visual design, and development). This ensures you have ample opportunity to provide feedback and guide the direction long before the final delivery.",
  },
  {
    id: "q4",
    question: "Do I handle both design and development?",
    answer:
      "Yes, absolutely. I offer end-to-end execution. By handling both the UI/UX design and the front-end/back-end engineering, I bridge the gap between creative vision and robust technical implementation, ensuring the final product performs flawlessly.",
  },
  {
    id: "q5",
    question: "How do you keep me in the loop during a project?",
    answer:
      "I maintain asynchronous communication via your preferred channel (Slack, Discord, or Email) and provide weekly progress updates. You'll also have access to live staging links and Figma files so you can watch the project come to life in real-time.",
  },
];
