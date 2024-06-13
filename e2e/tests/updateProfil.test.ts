import { test, expect } from "@playwright/test";

test("Login, update profil and reconnect", async ({ page }) => {
    await page.goto("http://localhost:3000/register");

    await page.getByPlaceholder('Nom d\'utilisateur').fill("1");

    await page.pause();

    await page.getByPlaceholder('Email').fill("1");
    await page.pause();

    await page.getByPlaceholder('Mot de passe').fill("1");
    await page.pause();

    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    await page.pause();

    await page.goto("http://localhost:3000/login");

    await page.getByPlaceholder('Nom d\'utilisateur ou email').fill("1");
    await page.pause();

    await page.getByPlaceholder('Mot de passe').fill("1");
    await page.pause();

    await page.getByRole('button', { name: 'Se connecter' }).click();
    await page.pause();


    await page.goto('http://localhost:3000/profil');
    await page.pause();


    await page.locator('[data-test-id="username"]').click();
    await page.locator('[data-test-id="username"]').fill("2");
    await page.pause();


    await page.locator('[data-test-id="email"]').click();
    await page.locator('[data-test-id="email"]').fill("2");
    await page.pause();


    await page.getByRole("button", {name: 'Sauvegarder'}).click();
    await page.pause();

    await page.getByRole('link', { name: 'Signout Icon Déconnexion' }).click();
    await page.pause();
    
    await page.goto("http://localhost:3000/login");
    await page.getByPlaceholder('Nom d\'utilisateur ou Email').fill("2");

    await page.getByPlaceholder('Mot de passe').fill("1");

    await page.getByRole('button', { name: 'Se connecter' }).click();

    await page.waitForLoadState("networkidle");

    await page.waitForSelector('text="Bienvenue 2 !"');

    const welcomeElement = await page.$('text="Bienvenue 2 !"');
    expect(welcomeElement).not.toBeNull();
})