export class NavigationPage {
    
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutButton = page.getByRole('link', {name: 'Checkout' })
    }

    goToCheckout = async () => {
        await this.checkoutButton.waitFor()
        await this.checkoutButton.click()
        await this.page.waitForURL("/basket")
    }
    
    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        const basketCount = await this.basketCounter.innerText()
        return parseInt(basketCount, 10)
    }
}