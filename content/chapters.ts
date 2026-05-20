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

export type Stat = { value: string; label: string };
export type Annotation = { lead: string; body: string };

export const CHAPTER_STATS: Record<string, readonly Stat[]> = {
  foundation: [
    { value: "#1", label: "worldwide · FT 2025" },
    { value: "top 100", label: "/ 9,000 candidates" },
    { value: "3 years", label: "CPGE ECS" },
  ],
  corporateLab: [
    { value: "3-year", label: "master plan" },
    { value: "5,000+", label: "users" },
    { value: "12+", label: "initiatives" },
    { value: "15+", label: "workshops" },
  ],
  rocapine: [
    { value: "$5.6M", label: "annualized revenue" },
    { value: "315K", label: "monthly active users" },
    { value: "14", label: "active studios" },
    { value: "6", label: "apps shipped" },
  ],
} as const;

export const ANNOTATIONS: Record<string, readonly Annotation[]> = {
  foundation: [
    {
      lead: "Master in Management, and a gap year to ship.",
      body: "Three years of CPGE before HEC, one semester abroad at Thammasat, and right now a deliberate break from the classroom to build real products. The credentials are nice; the gap year is the part I actually wanted.",
    },
    {
      lead: "Vice-President of the Ski Club at HEC.",
      body: "Leading a team of 11, managing a €75K annual budget, organizing trips for 300+ students each year. The closest thing to running a small operation while still in school.",
    },
  ],
  corporateLab: [
    {
      lead: "Co-authored a 3-year digital master plan, presented to C-level.",
      body: "Diagnostic of the existing IT landscape, target architecture, prioritization of 12+ initiatives. Moved exec stakeholders from a fragmented view to a shared roadmap with clearer investment calls. Takeaway: turning complex technical topics into something readable and actionable for senior decision-makers.",
    },
    {
      lead: "Deployed an IS used by 5,000+ internal users.",
      body: "Defined business needs, user journeys, functional requirements; ran 15+ user workshops. A digital project doesn't win because the tool is well designed, it wins because the process is clear, the UX is intuitive, and change is managed properly.",
    },
  ],
  rocapine: [
    {
      lead: "Built Scouty, our internal CRM, from scratch.",
      body: "Designed and coded it in ~4 weeks. ~3× partner sourcing throughput, used daily by the whole publishing team. When I see a recurring problem, I'd rather build the fix than document it.",
    },
    {
      lead: "Shipped 6 apps alongside the strategy work.",
      body: "Not to replace dev studios — to actually understand what it takes to build, test, iterate. The best PMs in consumer are the ones who could ship the v1 themselves.",
    },
  ],
} as const;

export type ValueCategory = "drive" | "craft" | "people";
export type ValueWithCategory = {
  title: string;
  body: string;
  category: ValueCategory;
};

export const VALUES_GROUPED: ValueWithCategory[] = [
  { category: "drive",  title: "Ambition",       body: "Working on meaningful projects with people who aim high." },
  { category: "drive",  title: "Hard work",      body: "Taking ownership and executing with discipline." },
  { category: "drive",  title: "Momentum",       body: "Testing, shipping, iterating, and learning fast." },
  { category: "drive",  title: "High standards", body: "Doing things seriously, clearly, and with care." },
  { category: "craft",  title: "Curiosity",      body: "Constantly learning across product, growth, business, and technology." },
  { category: "craft",  title: "Product taste",  body: "Caring about design, UX, positioning, and the small details that make a product great." },
  { category: "people", title: "Great minds",    body: "Surrounding myself with smart, driven, and inspiring people." },
  { category: "people", title: "Sociability",    body: "Building strong relationships and enjoying collaborative environments." },
];
