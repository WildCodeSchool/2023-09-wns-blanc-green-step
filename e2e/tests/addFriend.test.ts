import { test, expect } from "@playwright/test";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("Register Two Users, and make them friend", async ({ page }) => {
  await page.goto("http://localhost:3000/register");

  await page.getByPlaceholder("Nom d'utilisateur").fill("Bay");

  await page.getByPlaceholder("Email").fill("bay@bay.fr");

  await page.getByPlaceholder("Mot de passe").fill("bay2");

  await page.getByRole("button", { name: "S'inscrire" }).click();

  await page.waitForLoadState("networkidle");

  await expect(page.url()).toEqual("http://localhost:3000/");

  // Register Second User

  await page.goto("http://localhost:3000/register");

  await page.getByPlaceholder("Nom d'utilisateur").fill("Bee");

  await page.getByPlaceholder("Email").fill("bee@bee.fr");

  await page.getByPlaceholder("Mot de passe").fill("bee3");

  await page.getByRole("button", { name: "S'inscrire" }).click();

  await page.waitForLoadState("networkidle");

  await expect(page.url()).toEqual("http://localhost:3000/");

  // Login User

  await page.goto("http://localhost:3000/login");

  await page.getByPlaceholder("Email").fill("bay@bay.fr");

  await page.getByPlaceholder("Mot de passe").fill("bay2");

  await page.getByRole("button", { name: "Se connecter" }).click();

  await page.waitForLoadState("networkidle");

  await expect(page.url()).toEqual("http://localhost:3000/mon-bilan-carbone");

  // Create Friend Request

  await page.goto("http://localhost:3000/friends");

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Ajouter un ami" }).click();

  await page.getByPlaceholder("Search for username!").fill("Be");

  await page.getByRole("option", { name: "Bee" }).click();

  await page.getByRole("button", { name: "Ajouter l'ami" }).click();

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Voir mes demandes" }).click();

  await page.getByRole("heading", { name: "Mes Demandes Envoyées" }).click();

  await page.getByRole("link", { name: "Signout Icon Déconnexion" }).click();

  await page.waitForLoadState("networkidle");

  await page.waitForLoadState("networkidle");

  await expect(page.url()).toEqual("http://localhost:3000/");

  // Login Second User

  await page.goto("http://localhost:3000/login");

  await page.getByPlaceholder("Email").fill("bee@bee.fr");

  await page.getByPlaceholder("Mot de passe").fill("bee3");

  await page.getByRole("button", { name: "Se connecter" }).click();

  await page.waitForLoadState("networkidle");

  await expect(page.url()).toEqual("http://localhost:3000/mon-bilan-carbone");

  // Accept Friend Request

  await page.goto("http://localhost:3000/friends");

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Voir mes demandes" }).click();

  await page.getByRole("img", { name: "Accept Bay Icon" }).first().click();

  await page.waitForLoadState("networkidle");

  await expect(page.locator("div").filter({ hasText: /^Bay$/ })).toHaveText(
    "Bay"
  );
});
