import { test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('check cart function test', async ({ page }) => {
  await page.goto(baseUrl + 'synths');
  // make sure you're on the right page
  // const title = page.locator('h1');
  // await expect(title).toHaveText('');
  // // go to the single product page - in this case the first product
  // await page.goto(baseUrl + 'synths/1');

  // // add one to cart
  // const addToCartButton = page.locator('data-test-id=product-add-to-cart');
  // await addToCartButton.click();
  // // check if the header counter is set to 1
  // const headerCartCount = page.locator('data-test-id=cart-count');
  // await expect(headerCartCount).toHaveText('🛒 1');
  // // go to cart page
  // const goToCartButton = page.locator('text=add to cart');
  // await goToCartButton.click();
  // await page.waitForNavigation({ url: baseUrl + 'cart' });
  // // make sure you're on the cart page
  // await expect(title).toHaveText('Shopping Cart');
  // // increase quantity by one
  // const addButton = page.locator('text=+');
  // await addButton.click();
  // // check if the header counter is set to 2
  // await expect(headerCartCount).toHaveText('🛒 2');
  // // remove the item from cart
  // const removeButton = page.locator('text=x');
  // await removeButton.click();
  // // check if the header counter is set back to 0
  // await expect(headerCartCount).toHaveText('🛒 0');
});
