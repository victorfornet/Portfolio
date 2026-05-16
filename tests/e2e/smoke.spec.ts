import { test, expect } from "@playwright/test";

const sections = [
  "hero",
  "foundation",
  "corporate-lab",
  "builder-studio",
  "shipping",
  "whats-next",
  "contact",
];

test("all 7 chapters render", async ({ page }) => {
  await page.goto("/");
  for (const id of sections) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("hero copy is correct", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("I build consumer apps");
});

test("project card expands on click", async ({ page }) => {
  await page.goto("/");
  await page.locator("#shipping").scrollIntoViewIfNeeded();
  const firstCard = page.locator("#shipping article").first();
  await firstCard.getByRole("button", { name: /read more/i }).click();
  await expect(firstCard.getByText(/Problem\./)).toBeVisible();
});

test("contact CTAs are present", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: /email me/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /linkedin/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /github/i }).first()).toBeVisible();
});
