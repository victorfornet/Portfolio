export type ProjectStatus = "Building" | "Internal tool";

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
  },
  {
    id: "scouty",
    name: "Scouty",
    status: "Internal tool",
    summary:
      "Custom CRM built from scratch for Rocapine's publishing team. Replaced scattered spreadsheets with a single source of truth for every studio interaction. Used daily by the team, scaled partner sourcing throughput ~3x.",
  },
];
