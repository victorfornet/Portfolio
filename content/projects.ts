export type ProjectStatus = "Building" | "Internal tool" | "Live";

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
    summary:
      "The Duolingo for vibe-coding. Mobile app teaching non-technical users to build software with AI tools: daily AI news in short digestible briefs, then interactive exercises to test comprehension and reinforce learning through spaced repetition.",
    stack: ["React Native", "Expo", "TypeScript"],
    approach:
      "Solo build: product, UX, stack (Cursor + Claude Code), GTM, distribution.",
    link: {
      label: "Open Vibo",
      href: "https://vibo-web.vercel.app/",
    },
  },
  {
    id: "arctic",
    name: "Arctic",
    status: "Live",
    summary:
      "One of the consumer iOS apps I shipped at Rocapine. Cold-exposure breathwork: guided protocols, progressions, and daily challenges. Live on the App Store.",
    stack: ["iOS", "Rocapine", "App Store"],
    link: {
      label: "View on App Store",
      href: "https://apps.apple.com/us/app/arctic-cold-breath/id6761479659",
    },
  },
  {
    id: "scouty",
    name: "Scouty",
    status: "Internal tool",
    summary:
      "Custom CRM built from scratch for Rocapine's publishing team. Replaced scattered spreadsheets with a single source of truth for every studio interaction. Used daily by the team, scaled partner sourcing throughput ~3×.",
    stack: ["~4 weeks build", "in production", "~3× throughput"],
    problem:
      "Sourcing was scattered across spreadsheets and qualification was painfully manual.",
    approach:
      "Designed and coded Scouty in ~4 weeks: structured sourcing, outreach, qualification, follow-up. Now used daily by the publishing team.",
  },
];
