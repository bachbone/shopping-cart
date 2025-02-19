import PricingRule from "./PricingRule.js";
import ProductCatalogue from "../ProductCatalogue.js";
class FreeItemPerPurchase extends PricingRule {

  constructor({
    priorityLevel = 0,
    productCode,
    freeProductCode,
    freeProductCount
  }) {
    super(priorityLevel);
    this.productCode = productCode;
    this.freeProductCode = freeProductCode;
    this.freeProductCount = freeProductCount;
  }

  isApplicable(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    return productCount > 0;
  }

  applyRule(cart) {
    const productCount = cart.productCount[this.productCode] || 0;

    if (productCount === 0) {
      return;
    }

    const freeItems = productCount * this.freeProductCount;
    for (let i = 0; i < freeItems; i++) {
      // set price to zero since its free
      const cartItem = ProductCatalogue
        .createCartItemFromProductCode(this.freeProductCode, { price: 0 });
      cart.addFreeItem(cartItem);
    }
  }
}

export default FreeItemPerPurchase;