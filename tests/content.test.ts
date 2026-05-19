import { describe, it, expect } from "vitest";
import { CHAPTERS } from "@/content/chapters";
import { PROJECTS } from "@/content/projects";

describe("content/chapters", () => {
  it("has exactly 8 chapters indexed 0..n-1", () => {
    expect(CHAPTERS.length).toBe(8);
    CHAPTERS.forEach((c, i) => expect(c.index).toBe(i));
  });

  it("every chapter has required fields", () => {
    for (const c of CHAPTERS) {
      expect(c.id).toBeTruthy();
      expect(c.label).toBeTruthy();
      expect(c.title).toBeTruthy();
    }
  });
});

describe("content/projects", () => {
  it("has at least 2 projects", () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(2);
  });

  it("every project has required fields", () => {
    for (const p of PROJECTS) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.summary).toBeTruthy();
    }
  });
});
