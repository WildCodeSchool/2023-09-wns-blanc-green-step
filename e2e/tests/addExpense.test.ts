import {test, expect} from "@playwright/test";

function dateFormat(date) {
    const year = date.substring(4);
    const month = date.substring(2, 4);
    const day = date.substring(0, 2);
    return `${year}-${month}-${day}`;
}
const dateFormated = dateFormat('01012024');

test("login, action the buton CO², fill the form and submit the expense", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.getByRole('button', { name: 'Se connecter' });

    expect(page.goto("http://localhost:3000/login"));

    await page.getByPlaceholder('Nom d\'utilisateur ou Email').fill("123@gmail.com");

    await page.getByPlaceholder('Mot de passe').fill("123");

    await page.getByRole('button', { name: 'Se connecter' }).click()

    // expect(page.goto("http://localhost:3000/my-expenses"))

    await page.getByRole("button", { name: "+ CO²" }).click();

    expect(page.getByRole('heading', { name: 'Balance ta dépense' }));

    await page.getByLabel('Titre :').fill("Test by Playwrightt");

    // Ici nous sommes obligé de gérer le format car sinon le test échoue | Voir doc https://playwright.dev/docs/input
    await page.getByLabel('Date :').fill(dateFormated);

    await page.getByLabel('Émission :').fill("013");

    await page.locator('#carbon_saving').fill("013");

    await page.getByRole('combobox').selectOption("Logement");

    // Cette ligne nous permet de simuler une interaction humain pour nous permettre d'afficher le boutton de soumission
    await page.getByText('×Balance ta dépenseTitre :').press("Backspace");

    expect(page.getByRole('button', { name: 'soumettre la dépense' }));

    await page.getByRole('button', { name: 'soumettre la dépense' }).click();

    expect(page.getByRole('heading', { name: 'Balance ta dépense' })).not.toBeVisible();

    // await page.pause();

    //await page.getByText("×").click();



})