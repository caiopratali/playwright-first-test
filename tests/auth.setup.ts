import path from "path";

import { expect, test } from "@playwright/test";
import { baseUrl, user } from "../env";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test("Auth", async ({ page }) => {
  await page.goto(`${baseUrl}/login`);

  await page.locator("#email").fill(user.email);
  await page.locator("#senha").fill(user.password);

  await expect(page.locator("#btnLogar")).toBeEnabled();

  page.locator("#btnLogar").click();

  await page.waitForURL(`${baseUrl}/home`);

  expect(page.getByText("Bem-vindo, Caio"));

  await page.context().storageState({ path: authFile });
});
