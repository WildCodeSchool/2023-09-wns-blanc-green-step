import { test, expect } from "@playwright/test";

test("Login, update profil and reconnect", async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.getByPlaceholder('Nom d\'utilisateur ou Email').fill("1");

    await page.getByPlaceholder('Mot de passe').fill("1");

    await page.getByRole('button', { name: 'Se connecter' }).click();

    await page.goto('http://localhost:3000/profil');

})