import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProjectCard } from "@/components/ui/ProjectCard";

const fixture = {
  id: "vibo",
  name: "Vibo",
  status: "Building" as const,
  summary: "Mobile learning app.",
  problem: "Tutorials are scattered.",
  approach: "Short interactive lessons.",
};

describe("ProjectCard", () => {
  it("renders summary and details inline", () => {
    render(<ProjectCard project={fixture} />);
    expect(screen.getByText("Vibo")).toBeInTheDocument();
    expect(screen.getByText("Mobile learning app.")).toBeInTheDocument();
    expect(screen.getByText("Tutorials are scattered.")).toBeInTheDocument();
    expect(screen.getByText("Short interactive lessons.")).toBeInTheDocument();
  });

  it("omits the details block when no problem/approach/link is provided", () => {
    render(
      <ProjectCard
        project={{
          id: "scouty",
          name: "Scouty",
          status: "Internal tool",
          summary: "CRM tool.",
        }}
      />,
    );
    expect(screen.queryByText(/Problem\./)).toBeNull();
    expect(screen.queryByText(/Approach\./)).toBeNull();
  });

  it("renders an external link when provided", () => {
    render(
      <ProjectCard
        project={{
          id: "arctic",
          name: "Arctic",
          status: "Live",
          summary: "Breathwork app.",
          link: { label: "View on App Store", href: "https://example.com" },
        }}
      />,
    );
    const link = screen.getByRole("link", { name: /view on app store/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
