import { test, expect } from '@playwright/test';
import { CollectionPage } from '../pages/CollectionPage';
import { ProductPage } from '../pages/ProductPage';
import { HomePage } from '../pages/HomePage';



test.describe('POSITIVE TESTS - NYC Ballet Product Listing', () => {

  test('TC_P_001 - verify product listing is displayed', async ({ page }) => {
    const homePage = new HomePage(page);
    const collectionPage = new CollectionPage(page)

    await homePage.goto();
    await homePage.verifyHomePageOpened();

    await homePage.verifyLogoVisible();
    await homePage.verifyHeaderMenuVisible();

    await homePage.clickViewAllProducts();

    await collectionPage.verifyCollectionPageOpened();
    await collectionPage.verifyProductCardsVisible();

  });

  test('TC_P_002 - Verify that user can sort products by Best selling', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();

    await collectionPage.verifyCollectionPageOpened();
    await collectionPage.verifyLogoVisible();
    await collectionPage.verifyProductCardsVisible();

    await collectionPage.sortByBestSelling();

    console.log('Best selling page opened: Second Test Passed');
    
  });
    

  test('TC_P_003 - Verify that user can filter products by availability', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();

    await collectionPage.verifyCollectionPageOpened();
    await collectionPage.verifyLogoVisible();
    await collectionPage.verifyProductCardsVisible();

    await collectionPage.filterByInStock();

    console.log('Check box In stock selected: Third Test Passed')
    
  });
  
    
  test('TC_P_004 - Verify that each product has Add to Cart button', async ({page}) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.verifyCollectionPageOpened();
    await collectionPage.verifyLogoVisible();
    await collectionPage.verifyProductCardsVisible();
    console.log('Homepage collection page URL and Title Verifyed')
    console.log('Product cards are visible');
    
    // Verify product cards has 'ADD TO CART' button
    for (let i = 0; i < 4; i++) {
      await collectionPage.openAddToCartProductByIndex(i);
      await expect(page).toHaveURL(/products/);

      // Back to home
      await collectionPage.clikHomeLink();
      await expect(page).toHaveURL(/homepage/);
    }
    
    console.log('Each product has clickable "ADD TO CARD" button: Forth Test Passed')
  });

  test('TC_P_005 - Verify that total number of products is displayed', async ({page}) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.verifyCollectionPageOpened();
    await collectionPage.verifyLogoVisible();
    await collectionPage.verifyProductCardsVisible();

    await collectionPage.goToPage(2);
    await collectionPage.goToPage(1);

    await collectionPage.verifyProductCountDisplayed();
  })
});
  
test.describe('NEGATIVE TESTS - NYC Ballet Product Listing', () => {

  test('TC_N_001 - Verify that product without a name is not displayed', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.verifyProductCardsVisible();
    await collectionPage.verifyFirstProductsHaveNames(4);

    console.log('Product names are visible: TC_N_001 Passed');

  });
  
  test('TC_N_002 - Verify that product with missing image is not displayed', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.verifyProductCardsVisible();
    await collectionPage.verifyFirstProductsHaveImages(4);

    console.log('Product images are visible: TC_N_002 Passed');
  });

  test('TC_N_003 - Verify that out of stock product cannot be added to cart', async ({ page }) => {
    const collectionPage = new CollectionPage(page)
    const productPage = new ProductPage(page);

    await collectionPage.goto();
    await collectionPage.filterByOutOfStock();

    await expect(page).toHaveURL(/manual/)
    await page.locator('body').click();

    await collectionPage.verifyProductCardsVisible();
    await collectionPage.openOutOfStockProduct();
    
    await productPage.scrollToAddToCartButton();
    await productPage.verifySoldOutButtonVisible();

    console.log('TC_N_003 completed: Out of stock product cannot be added to cart');
    });

  test('TC_N_004 - Verify that incorrect currency symbols are not displayed for product prices', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.verifyProductCardsVisible();
    await collectionPage.verifyPricesUseOnlyDollarCurrency();

    console.log('TC_N_004 completed: Incorrect currency symbols are not displayed for product prices');
  });

  test('TC_N_005 - Verify that duplicate products are not displayed', async ({ page }) => {
    const collectionPage = new CollectionPage(page);

    await collectionPage.goto();
    await collectionPage.verifyNoDuplicateProducts(4);

    console.log('TC_N_005 completed: Duplicate products are not displayed');
  })

  
})
    

    

   
    



      

    
    
  
  
      
  



    







  

    


  


  


  