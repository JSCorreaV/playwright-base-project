import { expect, test } from "@playwright/test"

test("Art Shopping Store", async ({page}) => {
    await page.goto("/")
    await page.pause();
    
    const addAstronaut = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    const checkoutButton = page.getByRole('link', {name: 'Checkout' })

    await addAstronaut.waitFor()
    await basketCounter.waitFor()
    await expect(addAstronaut).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")
    await addAstronaut.click()
    await expect(addAstronaut).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")
    await checkoutButton.waitFor()
    await checkoutButton.click()
    await page.waitForURL("/basket")


})