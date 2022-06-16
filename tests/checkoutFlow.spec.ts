import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';
test('test the checkout flow', async ({ page }) => {
  // go to the single product page - in this case the second product
  await page.goto(baseUrl + 'products/2');
  // make sure you're on the first product page
  const title = page.locator('h1');
  await expect(title).toHaveText('LOOP');
  // add one LOOP to cart
  const addToCartButton = page.locator('data-test-id=product-add-to-cart');
  await addToCartButton.click();
  // check if the header counter is set to 1
  const headerCartCount = page.locator('data-test-id=cart-count');
  await expect(headerCartCount).toHaveText('🛒 1');
  // go to cart page
  const goToCartButton = page.locator('text=View cart →');
  await goToCartButton.click();
  await page.waitForNavigation({ url: baseUrl + 'cart' });
  // make sure you're on the cart page
  await expect(title).toHaveText('Items in cart');
  // go to checkout page
  const checkoutButton = page.locator('data-test-id=cart-checkout');
  await checkoutButton.click();
  await page.waitForNavigation({ url: baseUrl + 'checkout' });
  // make sure you're on the checkout page
  await expect(page).toHaveURL(`${baseUrl}checkout`);
  // make sure all the input fields are filled out
  await page.locator('data-test-id=checkout-first-name').fill('First');
  await page.locator('data-test-id=checkout-last-name').fill('Last');
  await page.locator('data-test-id=checkout-email').fill('name@mail');
  await page.locator('data-test-id=checkout-address').fill('Street');
  await page.locator('data-test-id=checkout-city').fill('City');
  await page.locator('data-test-id=checkout-postal-code').fill('1030');
  await page.locator('data-test-id=checkout-country').fill('Country');
  await page.locator('data-test-id=checkout-credit-card').fill('123456789123');
  await page.locator('data-test-id=checkout-expiration-date').fill('1224');
  await page.locator('data-test-id=checkout-security-code').fill('123');
  // confirm the order
  const confirmOrder = page.locator('data-test-id=checkout-confirm-order');
  await confirmOrder.click();
  // check if you're on thank you page
  await expect(page).toHaveURL(`${baseUrl}thankyou`);
  await expect(title).toHaveText('Thank you for your order!');
});
