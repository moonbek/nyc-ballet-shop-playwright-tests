import { expect, Locator, Page } from "@playwright/test";

export class CollectionPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly productCards: Locator;
  readonly sortDropdown: Locator;
  readonly availabilityDropdown: Locator;
  readonly inStockCheckbox: Locator;
  readonly productCount: Locator;
  readonly homeLink: Locator;
  readonly filters: Locator;
  readonly outOfStockOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText('NYC Ballet');
    this.productCards = page.locator('#product-grid li');
    this.sortDropdown = page.locator('#SortBy');
    this.availabilityDropdown = page.locator('.icon.icon-caret').first();
    this.inStockCheckbox = page.locator('.facet-checkbox > svg').first();
    this.productCount = page.locator('#ProductCountDesktop');
    this.homeLink = page.getByRole('link', { name: 'HOME' })
    this.filters = page.locator('#FacetsWrapperDesktop');
    this.outOfStockOption = page.locator('#FacetsWrapperDesktop').getByText('Out of stock');
  }

  // Async

  async goToPage(pageNumber: number) {
    await this.page.getByRole('link', { name: `Page ${pageNumber}` }).click();
    
  }

  async verifyNoDuplicateProducts(count: number) {
    const productCards = this.page.locator('.grid__item');
    
    const productData: string[] = [];
    for (let i = 0; i < 3; i++) {
        const productName = await productCards.nth(i).locator('h3').textContent();
        const productImage = await productCards.nth(i).locator('img.motion-reduce').first().getAttribute('src');
  
        productData.push(`${productName?.trim()} - ${productImage}`);
      }

      const uniqueProducts = new Set(productData);
  
      expect(uniqueProducts.size).toBe(productData.length);
  }
  
      
  

  async verifyPricesUseOnlyDollarCurrency() {
    const productGrid = this.page.locator('#product-grid');

    await expect(productGrid).toContainText('S');

    // 4. Verify incorrect currency symbols are not displayed
    await expect(productGrid).not.toContainText('€');
    await expect(productGrid).not.toContainText('£');
    await expect(productGrid).not.toContainText('¥');


  }

  async verifyFirstProductsHaveImages(count: number) {
    const productCards = this.page.locator('.grid__item');

    for (let i = 0; i < 4; i++) {
      const productImage = productCards.nth(i).locator('img.motion-reduce');

      await expect(productImage).toBeVisible();
      await expect(productImage).toHaveAttribute('src', /.+/);
    }
  }

  async verifyFirstProductsHaveNames(count: number) {
    const productCards = this.page.locator('.grid__item');

    for (let i = 0; i < 4; i++) {
      const productName = productCards.nth(i).locator('h3');

      await expect(productName).toBeVisible();
      await expect(productName).toHaveText(/\S+/);
    }
  }

  async openOutOfStockProduct() {
    const outOfStockPoduct = this.page.getByRole('link', { name: 'New York City Ballet 2025-' }).nth(1);
    
    await expect(outOfStockPoduct).toBeVisible();
    await outOfStockPoduct.click();
  }

  async filterByOutOfStock() {
    await expect(this.filters).toContainText('Availability');

    await this.filters.getByText('Availability').click();

      
    await this.outOfStockOption.click();
  }

  async goto() {
    await this.page.goto('https://nycballetshop.com/collections/homepage')
  }

  async verifyCollectionPageOpened() {
    await expect(this.page).toHaveURL('https://nycballetshop.com/collections/homepage');
    await expect(this.page).toHaveTitle('Homepage – NYC Ballet');
  }

  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async verifyProductCardsVisible() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async sortByBestSelling() {
    await expect(this.sortDropdown).toBeVisible();
    await this.sortDropdown.selectOption('best-selling');
    await expect(this.page).toHaveURL(/sort_by=best-selling/);
  }

  async filterByInStock() {
    await expect(this.availabilityDropdown).toBeVisible();
    await this.availabilityDropdown.click();

    await expect(this.inStockCheckbox).toBeVisible();
    await this.inStockCheckbox.click();
  }

  async verifyProductCountDisplayed() {
    await expect(this.productCount).toBeVisible();

  }

  async clikHomeLink() {
    await this.homeLink.click();
  }

  async openAddToCartProductByIndex(index: number) {
    const productCard = this.page.getByRole('link', { name: 'Add to cart' }).nth(index);

    await expect(productCard).toBeVisible();
    await productCard.hover();
    await productCard.click();

  }

}