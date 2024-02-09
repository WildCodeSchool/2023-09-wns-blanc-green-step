import {test, expect} from "@playwright/test";

test("action the buton CO² and close the modal form", async ({ page }) => {
    await page.goto("http://frontend:3000");

    await page.getByRole("button", { name: "+ CO²" }).click();

    expect(page.getByRole('heading', { name: 'Balance ta dépense' }));

    await page.getByText("×").click();

    expect(page.getByRole('heading', { name: 'Balance ta dépense' })).not.toBeVisible();
    
    // await page.pause();
})