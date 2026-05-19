export type ChapterId =
  | "hero"
  | "foundation"
  | "corporate-lab"
  | "builder-studio"
  | "shipping"
  | "about-me"
  | "whats-next"
  | "contact";

export type Chapter = {
  index: number;
  id: ChapterId;
  label: string;
  title: string;
  navLabel: string;
};

export const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "hero",
    label: "Hero",
    title: "I ship consumer products.",
    navLabel: "Home",
  },
  {
    index: 1,
    id: "foundation",
    label: "Chapter I",
    title: "hec paris.",
    navLabel: "HEC",
  },
  {
    index: 2,
    id: "corporate-lab",
    label: "Chapter II",
    title: "bearingpoint.",
    navLabel: "Consulting",
  },
  {
    index: 3,
    id: "builder-studio",
    label: "Chapter III",
    title: "rocapine.",
    navLabel: "Rocapine",
  },
  {
    index: 4,
    id: "shipping",
    label: "Chapter IV",
    title: "side projects.",
    navLabel: "Projects",
  },
  {
    index: 5,
    id: "about-me",
    label: "Chapter V",
    title: "about me.",
    navLabel: "About",
  },
  {
    index: 6,
    id: "whats-next",
    label: "Chapter VI",
    title: "what's next.",
    navLabel: "What's next",
  },
  {
    index: 7,
    id: "contact",
    label: "Chapter VII",
    title: "let's talk.",
    navLabel: "Contact",
  },
];

export const TASK_CARDS_HERO = [
  { status: "Currently building", label: "Vibo" },
  { status: "Shipping", label: "Growth experiments" },
  { status: "Open to", label: "Builder collabs" },
] as const;

export const WHATS_NEXT_CARDS = [
  {
    status: "Open to",
    title: "Good conversations",
    body: "Founders, operators, anyone building something they care about. Drop me a line.",
  },
] as const;

export const TIMELINE_CARDS = {
  foundation: {
    status: "Active",
    title: "hec paris · master in management (2023–present)",
    body: "Master in Management · CPGE · Thammasat exchange · gap year to ship.",
  },
  corporateLab: {
    status: "Completed",
    title: "bearingpoint · consultant intern (jul 2025 – dec 2025, paris)",
    body: "Digital transformation · Public sector · IS deployment · Change management.",
  },
  rocapine: {
    status: "Active",
    title: "rocapine · product manager, publishing (jan 2026 – present, paris)",
    body: "$5.6M ARR · 315K MAU · 14 studios · 6 apps shipped.",
  },
} as const;

export type Value = { title: string; body: string };

export const VALUES: Value[] = [
  {
    title: "Ambition",
    body: "Working on meaningful projects with people who aim high.",
  },
  {
    title: "Hard work",
    body: "Taking ownership and executing with discipline.",
  },
  {
    title: "Curiosity",
    body: "Constantly learning across product, growth, business, and technology.",
  },
  {
    title: "Product taste",
    body: "Caring about design, UX, positioning, and the small details that make a product great.",
  },
  {
    title: "Great minds",
    body: "Surrounding myself with smart, driven, and inspiring people.",
  },
  {
    title: "Sociability",
    body: "Building strong relationships and enjoying collaborative environments.",
  },
  {
    title: "Momentum",
    body: "Testing, shipping, iterating, and learning fast.",
  },
  {
    title: "High standards",
    body: "Doing things seriously, clearly, and with care.",
  },
];
