import PricingRule from "./PricingRule.js";
import ProductCatalogue from "../ProductCatalogue.js";

// Applies discount if the customer buys a certain number of products
// and gets a free one of the same product
// buy 3 get 1 free equals buy 3 for the price of 2
class BuyXForYFreeDiscount extends PricingRule {
  constructor({ priorityLevel = 0, productCode, buyCount, freeCount }) {
    super(priorityLevel);
    this.buyCount = buyCount;
    this.freeCount = freeCount;
    this.productCode = productCode;
  }

  isApplicable(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    return productCount >= this.buyCount;
  }

  applyRule(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    const freeItems = Math.floor(productCount / this.buyCount) * this.freeCount;
    const itemPrice = ProductCatalogue.getProductByCode(this.productCode).price;
    const discount = freeItems * itemPrice;
    cart.discounts.push({ type: 'fixed', value: discount });
  }
}

export default BuyXForYFreeDiscount;