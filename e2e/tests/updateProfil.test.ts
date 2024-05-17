import { test, expect } from "@playwright/test";

test("Login, update profil and reconnect", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.getByPlaceholder('Nom d\'utilisateur ou Email').fill("1");

    await page.getByPlaceholder('Mot de passe').fill("1");

    await page.getByRole('button', { name: 'Se connecter' }).click();

    await page.goto('http://localhost:3000/profil');

    await page.locator('[data-test-id="username"]').click();
    await page.locator('[data-test-id="username"]').fill("2");

    await page.locator('[data-test-id="email"]').click();
    await page.locator('[data-test-id="email"]').fill("2");

    await page.getByRole("button", {name: 'Sauvegarder'}).click();

    //déconnexion

    //reconnexion
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder('Nom d\'utilisateur ou Email').fill("2");

    await page.getByPlaceholder('Mot de passe').fill("1");

    await page.getByRole('button', { name: 'Se connecter' }).click();

    await page.waitForLoadState("networkidle");

    await expect(page.url()).toEqual("http://localhost:3000/my-expenses");
})