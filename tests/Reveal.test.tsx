import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Reveal } from "@/components/motion/Reveal";

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <span>hello</span>
      </Reveal>,
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
