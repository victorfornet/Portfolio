import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TaskCard } from "@/components/ui/TaskCard";

describe("TaskCard", () => {
  it("renders status and label", () => {
    render(<TaskCard status="Currently building" label="Vibo" />);
    expect(screen.getByText("Currently building")).toBeInTheDocument();
    expect(screen.getByText("Vibo")).toBeInTheDocument();
  });

  it("renders body if provided", () => {
    render(<TaskCard status="Open to" label="Collabs" body="Building together." />);
    expect(screen.getByText("Building together.")).toBeInTheDocument();
  });
});
