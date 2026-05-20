// content/chapters.ts — additions
// Append (or merge into existing exports) the following:

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
      lead: "Master in Management — and a gap year to ship.",
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
      body: "Defined business needs, user journeys, functional requirements; ran 15+ user workshops. A digital project doesn't win because the tool is well designed — it wins because the process is clear, the UX is intuitive, and change is managed properly.",
    },
  ],
  rocapine: [
    {
      lead: "Built Scouty, our internal CRM, from scratch.",
      body: "Sourcing was scattered across spreadsheets, qualification painfully manual. Designed and coded Scouty in ~4 weeks: structured sourcing, outreach, qualification, follow-up. Result: ~3× partner sourcing throughput, now used daily by the whole publishing team. When I see a recurring problem, I'd rather build the fix than document it.",
    },
    {
      lead: "Shipped 6 apps alongside the strategy work.",
      body: "Not to replace dev studios — to actually understand what it takes to build, test, iterate. Sharper product taste, better grasp of technical constraints, more concrete conversations with founders, devs, and designers. The best PMs in consumer are the ones who could ship the v1 themselves.",
    },
  ],
  whatsNext: [
    {
      lead: "What pulls me in.",
      body: "Consumer products, growth that compounds, software that feels personal. Mostly though, it's about working with people who care a stupid amount about what they're making.",
    },
    {
      lead: "The fun part isn't picking a label.",
      body: "It's getting in the middle of something ambitious and shipping. I'll figure out the rest. Long-term, building my own. Right now, relocating to San Francisco and open to conversations.",
    },
  ],
} as const;

// Values for Chapter V grouped into three lenses.
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
