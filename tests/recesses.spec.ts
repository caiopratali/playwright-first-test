import { test, expect } from "@playwright/test";

import { baseUrl } from "../env";

test.describe("My recesses", () => {
  test("List my recesses successfully", async ({ page }) => {
    await page.goto(`${baseUrl}/recessos/meusrecesso`);

    await expect(page.getByText("Meus recessos")).toBeVisible();
  });

  test("create a new recess", async ({ page }) => {
    await page.goto(`${baseUrl}/recessos/add`);

    await page.locator("#Descricao").fill("Criado com plawright");

    await expect(page.locator("#DataInicio")).toBeVisible();

    await expect(page.locator("#DataFinal")).toBeVisible();

    await page.fill("#DataInicio", "2024-10-09");
    await page.fill("#DataFinal", "2024-10-09");

    await page.getByRole("button", { name: "Salvar" }).click();

    await page.waitForURL(`${baseUrl}/recessos/meusrecesso`);

    expect(
      page.getByRole("alert", { name: "Cadastro realizado com sucesso!" })
    );
  });
});
