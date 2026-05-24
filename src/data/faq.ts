export interface FaqItem {
  id: string;
  question: { en: string; bn: string };
  answer: { en: string; bn: string };
}

export const faqData: FaqItem[] = [
  {
    id: "q1",
    question: {
      en: "What kind of projects do I handle?",
      bn: "আমি কি ধরনের প্রকল্প পরিচালনা করি?",
    },
    answer: {
      en: "I specialize in creating bespoke digital experiences, ranging from high-end personal portfolios and startup landing pages to complex web applications and immersive 3D interfaces. I focus on projects where premium design aesthetics and technical performance intersect.",
      bn: "আমি বেসপোক ডিজিটাল অভিজ্ঞতা তৈরিতে পারদর্শী, হাই-এন্ড ব্যক্তিগত পোর্টফোলিও এবং স্টার্টআপ ল্যান্ডিং পেজ থেকে শুরু করে জটিল ওয়েব অ্যাপ্লিকেশন এবং ইমারসিভ থ্রিডি ইন্টারফেস পর্যন্ত। আমি এমন প্রকল্পগুলিতে ফোকাস করি যেখানে প্রিমিয়াম ডিজাইন এবং প্রযুক্তিগত পারফরম্যান্সের মেলবন্ধন ঘটে।",
    },
  },
  {
    id: "q2",
    question: {
      en: "How does a project usually start?",
      bn: "একটি প্রকল্প সাধারণত কীভাবে শুরু হয়?",
    },
    answer: {
      en: "It begins with a discovery conversation. We'll book a call to align on your vision, goals, and technical requirements. Once we define the scope, I'll provide a detailed proposal and timeline before we kick off the strategy and design phases.",
      bn: "এটি একটি ডিসকভারি কল দিয়ে শুরু হয়। আপনার লক্ষ্য এবং প্রযুক্তিগত প্রয়োজনীয়তাগুলো নিয়ে আলোচনা করার জন্য আমরা একটি কল বুক করব। স্কোপ নির্ধারণ করার পর, আমি কৌশল এবং ডিজাইন পর্ব শুরু করার আগে একটি বিস্তারিত প্রস্তাবনা এবং সময়সীমা প্রদান করব।",
    },
  },
  {
    id: "q3",
    question: {
      en: "What happens if the result isn't quite what I expected?",
      bn: "যদি ফলাফলটি আমার প্রত্যাশিত না হয় তবে কী হবে?",
    },
    answer: {
      en: "Transparency and collaboration are key to my process. We have built-in review cycles at every major milestone (wireframing, visual design, and development). This ensures you have ample opportunity to provide feedback and guide the direction long before the final delivery.",
      bn: "স্বচ্ছতা এবং সহযোগিতা আমার কাজের প্রক্রিয়ার মূল চাবিকাঠি। আমাদের প্রতিটি বড় মাইলফলকে (ওয়্যারফ্রেমিং, ভিজ্যুয়াল ডিজাইন এবং ডেভেলপমেন্ট) রিভিউ সাইকেল রয়েছে। এটি নিশ্চিত করে যে আপনার কাছে চূড়ান্ত ডেলিভারির অনেক আগে ফিডব্যাক দেওয়ার এবং নির্দেশনা দেওয়ার যথেষ্ট সুযোগ রয়েছে।",
    },
  },
  {
    id: "q4",
    question: {
      en: "Do I handle both design and development?",
      bn: "আমি কি ডিজাইন এবং ডেভেলপমেন্ট উভয়ই পরিচালনা করি?",
    },
    answer: {
      en: "Yes, absolutely. I offer end-to-end execution. By handling both the UI/UX design and the front-end/back-end engineering, I bridge the gap between creative vision and robust technical implementation, ensuring the final product performs flawlessly.",
      bn: "হ্যাঁ, অবশ্যই। আমি সম্পূর্ণ বাস্তবায়ন (End-to-end) অফার করি। ইউআই/ইউএক্স ডিজাইন এবং ফ্রন্ট-এন্ড ইঞ্জিনিয়ারিং উভয়ই পরিচালনা করে, আমি সৃজনশীলতা এবং প্রযুক্তিগত বাস্তবায়নের মধ্যে ব্যবধান দূর করি।",
    },
  },
  {
    id: "q5",
    question: {
      en: "How do you keep me in the loop during a project?",
      bn: "প্রকল্প চলাকালীন আপনি কীভাবে আমাকে আপডেট রাখবেন?",
    },
    answer: {
      en: "I maintain asynchronous communication via your preferred channel (Slack, Discord, or Email) and provide weekly progress updates. You'll also have access to live staging links and Figma files so you can watch the project come to life in real-time.",
      bn: "আমি আপনার পছন্দের মাধ্যমে (স্ল্যাক, ডিসকর্ড বা ইমেইল) যোগাযোগ বজায় রাখি এবং সাপ্তাহিক অগ্রগতি আপডেট প্রদান করি। আপনার কাছে লাইভ স্টেজিং লিঙ্ক এবং ফিগমা ফাইলগুলিতে অ্যাক্সেস থাকবে যাতে আপনি রিয়েল-টাইমে প্রকল্পটি দেখতে পারেন।",
    },
  },
];
