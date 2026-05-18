export type ChapterId =
  | "hero" | "foundation" | "corporate-lab" | "builder-studio"
  | "shipping" | "whats-next" | "contact";

export type ChapterBullet = { lead: string; rest: string };

export type Chapter = {
  index: number;
  id: ChapterId;
  label: string;
  title: string;
  body?: string[];
  metricsLine?: string;
  bullets?: ChapterBullet[];
  navLabel: string;
};

export const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "hero",
    label: "Hero",
    title: "I ship consumer products.",
    body: [
      "Product Manager at Rocapine. Building Vibo on the side. HEC Paris. Relocating to San Francisco.",
    ],
    navLabel: "Home",
  },
  {
    index: 1,
    id: "foundation",
    label: "Chapter I",
    title: "HEC Paris.",
    body: [
      "Master in Management, ranked #1 worldwide (Financial Times 2025). Expected GPA 3.8/4.0.",
      "Before HEC: French preparatory class (CPGE ECS), ranked top 100 out of 9,000 candidates at the national entrance exam. Exchange semester at Thammasat University (Bangkok).",
      "Coursework: Strategy, Digital Innovation, Data Analytics, Financial Economics. Currently on a gap year to ship.",
    ],
    navLabel: "Foundation",
  },
  {
    index: 2,
    id: "corporate-lab",
    label: "Chapter II",
    title: "BearingPoint · Digital transformation.",
    body: [
      "Six months delivering digital transformation workstreams for public-sector clients: a major French public health organization and a top-tier French university.",
      "What I owned:",
      "Takeaway: shipping software at scale inside organizations that resist change. Useful muscle before going consumer.",
    ],
    bullets: [
      {
        lead: "Requirements gathering, user journey mapping, and functional rollout",
        rest: " of a new information system serving thousands of internal users.",
      },
      {
        lead: "Co-authored a digital master plan",
        rest: ": IT landscape diagnostics, target architecture, initiative prioritization. Presented to executive stakeholders.",
      },
    ],
    navLabel: "Consulting",
  },
  {
    index: 3,
    id: "builder-studio",
    label: "Chapter III",
    title: "Rocapine · Product Manager, Publishing.",
    body: [
      "Mobile app publisher in wellness. We ship low-cost app demos, test distribution, scale what performs. GenAI-powered personalization across mental health, fitness, nutrition, and sleep.",
      "What I own:",
    ],
    metricsLine: "$5.6M annualized revenue · 315K monthly active users · 14 active studios.",
    bullets: [
      {
        lead: "End-to-end lifecycle for 6 consumer iOS apps",
        rest: ": concept, MVP specs, App Store launch, growth experiments. Cohort analyses on CAC, D1/D7/D30 retention, and LTV to decide what to scale vs. kill.",
      },
      {
        lead: "20+ dev studios onboarded",
        rest: " under profit-share partnerships. Built and own the full studio acquisition pipeline.",
      },
      {
        lead: "100+ creative and product A/B tests",
        rest: " run to identify what scales. Portfolio-level dashboards on revenue, retention, and ROAS.",
      },
      {
        lead: "Scouty",
        rest: ": internal CRM I designed and built. Now used daily by the publishing team. Replaced scattered spreadsheets, scaled partner sourcing throughput ~3x.",
      },
    ],
    navLabel: "Builder",
  },
  {
    index: 4,
    id: "shipping",
    label: "Chapter IV",
    title: "Side projects.",
    body: [
      "Where I learn the stack outside of work.",
    ],
    navLabel: "Projects",
  },
  {
    index: 5,
    id: "whats-next",
    label: "Chapter V",
    title: "What's next.",
    body: [
      "Relocating to San Francisco. Looking for two things:",
      "**Founder collabs**: Early-stage consumer apps, AI-native products, growth systems. I can ship product, run growth experiments, and build internal tools.",
      "**Pre-seed product roles**: Small teams where I own outcomes, not slides. PM or founding PM seats at consumer or AI startups.",
      "Long-term: building toward starting my own. Right now, getting the reps in.",
    ],
    navLabel: "What's next",
  },
  {
    index: 6,
    id: "contact",
    label: "Chapter VI",
    title: "Let's talk.",
    body: [
      "Building consumer, AI, or anything ambitious? Reach out.",
    ],
    navLabel: "Contact",
  },
];

export const TASK_CARDS_HERO = [
  { status: "Currently building", label: "Vibo" },
  { status: "Shipping", label: "Growth experiments" },
  { status: "Open to", label: "Builder collabs" },
] as const;

export const WHATS_NEXT_CARDS = [
  { status: "Open to", title: "Founder collabs", body: "Building consumer apps and AI tools." },
  { status: "Curious about", title: "Pre-seed product roles", body: "Where I ship, not just advise." },
] as const;

export const TIMELINE_CARDS = {
  foundation: {
    status: "Active",
    title: "HEC Paris · Master in Management (2023–Present)",
    body: "Master in Management · CPGE · Thammasat exchange · gap year to ship.",
  },
  corporateLab: {
    status: "Completed",
    title: "BearingPoint · Consultant Intern (Jul 2025 – Dec 2025, Paris)",
    body: "Digital transformation · Public sector · User needs · IS deployment · Change management.",
  },
  rocapine: {
    status: "Active",
    title: "Rocapine · Product Manager, Publishing (Jan 2026 – Present, Paris)",
    body: "$5.6M ARR · 315K MAU · 14 studios · 6 apps shipped.",
  },
} as const;
