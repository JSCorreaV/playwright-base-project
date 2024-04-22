import { expect } from "@playwright/test"

export class CheckoutPage {
    constructor(page){
        this.page = page
        this.productPriceList = page.locator('[data-qa="basket-item-price"]')
        this.removeProductButtonList = page.locator('[data-qa="basket-card-remove-item"]')
    }

    removeCheapestProduct = async () => {
        await this.productPriceList.first().waitFor()
        await this.removeProductButtonList.first().waitFor()
        const itemsBeforeRemoval = await this.removeProductButtonList.count()
        const cheaperProductIndex = await this.findCheapestProductIndex()
        const cheapestProductButton =  await this.removeProductButtonList.nth(cheaperProductIndex)
        await cheapestProductButton.waitFor()
        await cheapestProductButton.click()
        await expect(this.removeProductButtonList).toHaveCount(itemsBeforeRemoval-1)
    }

    findCheapestProductIndex = async () => {
        const pricesAsStrings = await this.productPriceList.allInnerTexts()
        const pricesAsNumbers = pricesAsStrings.map(price => Number(price.slice(0, -1)))
        const lowestPrice = Math.min(...pricesAsNumbers)
        return await pricesAsNumbers.indexOf(lowestPrice)
    }

}