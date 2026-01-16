const { test, expect } = require('@playwright/test');

test('Visual Regression POC', async ({ page }) => {
  await page.goto('https://google.com');

  // Bug
//   await page.evaluate(() => {
//     document.body.style.backgroundColor = "red";
//   });

  await expect(page).toHaveScreenshot('homepage.png', {
    mask: [page.locator('[name="q"]')] 
  });
});