import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  readonly soldOutButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.soldOutButton = page.getByRole('button', {name: 'Sold out'});

    this.addToCartButton = page.locator('button[name="add"]');
  }

  // Async

  async scrollToAddToCartButton() {
    await this.page.mouse.wheel(0, 800);
  }

  async verifySoldOutButtonVisible() {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toContainText('Sold out');
  }

}