export type ProjectStatus = "Building" | "Internal tool" | "Open-source";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  summary: string;
  stack?: string[];
  problem?: string;
  approach?: string;
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    id: "vibo",
    name: "Vibo",
    status: "Building",
    summary: "A mobile app teaching non-technical people to ship with AI coding tools.",
    stack: ["React Native", "Expo", "TypeScript"],
    problem:
      "Most non-technical people want to use AI coding tools but don't know where to start. Tutorials are scattered, intimidating, and rarely mobile-first.",
    approach:
      "Short, interactive lessons on iOS and Android. Each lesson ends with a concrete output. Built in React Native with Expo.",
  },
  {
    id: "creative-testing-dashboard",
    name: "Creative Testing Dashboard",
    status: "Internal tool",
    summary: "A dashboard to analyze ad creatives and growth metrics at Rocapine.",
    problem:
      "Creative testing data was scattered across Meta, TikTok and internal sheets. Hard to see which concepts moved CPI.",
    approach: "Aggregates spend, CTR, CPI, ROAS by creative concept. Surfaces winners and losers at a glance.",
  },
  {
    id: "consumer-app-starter-kit",
    name: "Consumer App Starter Kit",
    status: "Open-source",
    summary:
      "A React Native starter kit for early-stage consumer apps: auth, paywall, analytics, ready to ship in a weekend.",
    stack: ["React Native", "Expo", "RevenueCat"],
    problem:
      "Every consumer app rebuilds the same boilerplate: auth, paywall, analytics, deep links. Wastes weeks before the actual product.",
    approach: "Opinionated starter wired with the tools we use in production. Clone, rename, ship.",
  },
  {
    id: "app-scouting-crm",
    name: "App Scouting CRM",
    status: "Internal tool",
    summary: "A CRM to manage app scouting and studio outreach.",
    problem: "Scouting promising app studios meant tracking hundreds of contacts in spreadsheets.",
    approach: "Lightweight CRM with pipeline stages, notes, and reminders tailored to studio outreach.",
  },
];
