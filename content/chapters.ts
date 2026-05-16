export type ChapterId =
  | "hero" | "foundation" | "corporate-lab" | "builder-studio"
  | "shipping" | "whats-next" | "contact";

export type Chapter = {
  index: number;
  id: ChapterId;
  label: string;
  title: string;
  body?: string[];
  navLabel: string;
};

export const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "hero",
    label: "Hero",
    title: "I build consumer apps — from idea to growth.",
    body: [
      "Product & Growth at Rocapine. Building Vibo on the side.",
      "Studying at HEC Paris, learning by shipping.",
    ],
    navLabel: "Home",
  },
  {
    index: 1,
    id: "foundation",
    label: "Chapter I",
    title: "It started at HEC Paris.",
    body: [
      "I'm doing a gap year built around one question: how do consumer products actually get built, tested, and scaled?",
      "Not the theory version. The real one — the messy middle between an idea and a product people use every day.",
      "So I went to find people doing it.",
    ],
    navLabel: "Foundation",
  },
  {
    index: 2,
    id: "corporate-lab",
    label: "Chapter II",
    title: "The first stop was consulting.",
    body: [
      "I joined BearingPoint to work on digital transformation projects for the public sector.",
      "I sat with people who used software they hated. I watched information systems get deployed at scale. I learned how organizations resist change, and how products actually land in users' hands.",
      "It was slow. It was real. It taught me to care about the gap between what a product promises and what people actually experience.",
      "That gap is where I want to spend my career.",
    ],
    navLabel: "Consulting",
  },
  {
    index: 3,
    id: "builder-studio",
    label: "Chapter III",
    title: "Now I build at Rocapine.",
    body: [
      "Rocapine is a mobile app publisher. We build, test and scale consumer apps from scratch.",
      "My job is hands-on: scout promising studios, analyze product opportunities, improve onboarding and monetization, test ad concepts, follow growth metrics, and turn data into product iterations.",
      "It's the closest I've found to early-stage building with real budgets and real users.",
    ],
    navLabel: "Builder",
  },
  {
    index: 4,
    id: "shipping",
    label: "Chapter IV",
    title: "Things I'm shipping.",
    body: [
      "Side projects are how I learn the stack. Some are tools I needed at work. Some are bets on where consumer software is going.",
    ],
    navLabel: "Projects",
  },
  {
    index: 5,
    id: "whats-next",
    label: "Chapter V",
    title: "Where I'm going.",
    body: [
      "I want to spend the next decade building consumer products with founders who move fast — AI-powered apps, growth systems, and the messy infrastructure underneath.",
      "Eventually, I'll start my own. For now, I'm getting the reps in: shipping, breaking things, learning the stack, and finding the people I want to build with.",
    ],
    navLabel: "What's next",
  },
  {
    index: 6,
    id: "contact",
    label: "Chapter VI",
    title: "Let's build something.",
    body: [
      "If you're working on consumer apps, AI products, or anything ambitious — I'd love to talk.",
    ],
    navLabel: "Contact",
  },
];

export const WHAT_I_DO = [
  { icon: "🛠️", title: "Product & Growth", body: "Onboarding, paywalls, retention." },
  { icon: "📱", title: "Consumer Apps", body: "Mobile-first, B2C, fast iteration." },
  { icon: "⚡", title: "Growth Experiments", body: "UA, creative testing, funnels." },
  { icon: "🤖", title: "AI Tools", body: "LLM-powered products and internal tools." },
  { icon: "🚀", title: "Mobile MVPs", body: "Idea → TestFlight in weeks." },
  { icon: "🧩", title: "Internal Systems", body: "CRMs, dashboards, scouting tools." },
] as const;

export const TASK_CARDS_HERO = [
  { status: "Currently building", label: "Vibo" },
  { status: "Shipping", label: "Growth experiments" },
  { status: "Open to", label: "Builder collabs" },
] as const;

export const WHATS_NEXT_CARDS = [
  { status: "Open to", title: "Founder collabs", body: "Building consumer apps and AI tools." },
  { status: "Curious about", title: "Pre-seed product roles", body: "Where I can ship, not just advise." },
] as const;

export const TIMELINE_CARDS = {
  foundation: { status: "Active", title: "HEC Paris — Gap year", body: "Focus: startups, product, growth." },
  corporateLab: { status: "Completed", title: "BearingPoint — Consultant", body: "Digital transformation · Public sector · User needs · IS deployment · Change management." },
} as const;
