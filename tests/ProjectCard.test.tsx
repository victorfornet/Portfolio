import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("renders collapsed by default with summary", () => {
    render(<ProjectCard project={fixture} />);
    expect(screen.getByText("Vibo")).toBeInTheDocument();
    expect(screen.getByText("Mobile learning app.")).toBeInTheDocument();
    expect(screen.queryByText("Tutorials are scattered.")).toBeNull();
  });

  it("expands on click and reveals problem/approach", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={fixture} />);
    await user.click(screen.getByRole("button", { name: /read more/i }));
    expect(screen.getByText("Tutorials are scattered.")).toBeInTheDocument();
    expect(screen.getByText("Short interactive lessons.")).toBeInTheDocument();
  });

  it("collapses again on second click", async () => {
    const user = userEvent.setup();
    render(<ProjectCard project={fixture} />);
    const toggle = screen.getByRole("button", { name: /read more/i });
    await user.click(toggle);
    const problem = screen.getByText("Tutorials are scattered.");
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    await waitForElementToBeRemoved(problem);
  });
});
