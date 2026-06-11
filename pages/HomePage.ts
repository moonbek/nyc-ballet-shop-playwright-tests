import { expect, Locator, Page} from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly viewAllButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText('NYC Ballet');
    this.viewAllButton = page.getByRole('link', { name: 'View all products in the' });
  }

  // Async

  async goto() {
    await this.page.goto('https://nycballetshop.com/');
  }

  async clickViewAllProducts() {
    await expect(this.viewAllButton).toBeVisible();
    await expect(this.viewAllButton).toContainText('View all');
    await this.viewAllButton.click();
  }

  async verifyHeaderMenuVisible() {
    await expect(this.page.getByRole('link', { name: 'HOME', exact: true })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'APPAREL' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'SOUVENIRS' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'THE NUTCRACKER' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'MEDIA' })).toBeVisible();
  }

  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async verifyHomePageOpened() {
    await expect(this.page).toHaveURL('https://nycballetshop.com/');
    await expect(this.page).toHaveTitle('The Official Store of the NYC Ballet');

  }
}
