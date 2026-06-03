import { test, expect } from "@playwright/test";

// The desktop horizontal chapter track relies on `position: sticky` to pin the
// viewport while chapters slide horizontally. `overflow-x: hidden` on html/body
// used to turn the body into a scroll container, which silently broke sticky:
// the track scrolled diagonally (down + sideways) instead of staying pinned.
test.use({ viewport: { width: 1440, height: 900 } });

test("horizontal track stays pinned while scrolling on desktop", async ({ page }) => {
  await page.goto("/");

  const track = page.locator("[data-horizontal-track]");
  await expect(track).toBeVisible();

  // The sticky pane is the direct child of the track wrapper.
  const sticky = track.locator(":scope > div").first();

  // Scroll so we're partway through the track's scroll range.
  const box = await track.boundingBox();
  if (!box) throw new Error("no track box");
  await page.evaluate((y) => window.scrollTo(0, y), box.y + box.height / 2);
  await page.waitForTimeout(200);

  // While pinned, the sticky pane's top must sit at the top of the viewport.
  const top = await sticky.evaluate((el) => el.getBoundingClientRect().top);
  expect(Math.abs(top)).toBeLessThan(2);

  // And it must be a full-height viewport pane (h-screen), not collapsed.
  const height = await sticky.evaluate((el) => el.getBoundingClientRect().height);
  expect(height).toBeGreaterThan(800);
});
