import {test, expect} from "@playwright/test"
import { ProductsPage } from "../page-objects/ProductsPage"
import { NavigationPage } from "../page-objects/NavigationPage"
import { CheckoutPage } from "../page-objects/CheckoutPage"

test.only("New user full end-to-end test journey", async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    const navigationPage = new NavigationPage(page)
    await navigationPage.goToCheckout()
    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.removeCheapestProduct()

})