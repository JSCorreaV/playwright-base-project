import { expect } from "@playwright/test"
import { NavigationPage } from "./NavigationPage"

export class ProductsPage {

    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
    }
    
    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const addButton =  this.addButtons.nth(index)
        await addButton.waitFor()
        await expect(addButton).toHaveText("Add to Basket")
        const navigationPage = new NavigationPage(this.page)
        const basketcountBefodeAdding = await navigationPage.getBasketCount()
        await addButton.click()
        await expect(addButton).toHaveText("Remove from Basket")
        const basketcountAfterAdding = await navigationPage.getBasketCount()
        expect(basketcountAfterAdding).toBeGreaterThan(basketcountBefodeAdding)
    }
}
