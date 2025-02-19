import PricingRule from "./PricingRule.js";
import ProductCatalogue from "../ProductCatalogue.js";
class BulkDiscount extends PricingRule {
  constructor({
    priorityLevel = 0,
    productCode,
    thresholdCount,
    discountedPrice
  }) {
    super(priorityLevel);
    this.productCode = productCode;
    this.thresholdCount = thresholdCount;
    this.discountedPrice = discountedPrice;
  }

  isApplicable(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    return productCount > this.thresholdCount;
  }

  applyRule(cart) {
    const itemPrice = ProductCatalogue.getProductByCode(this.productCode).price;
    const productCount = cart.productCount[this.productCode] || 0;
    const discount = (itemPrice - this.discountedPrice) * productCount;
    cart.discounts.push({ type: 'fixed', value: discount });
  }
}

export default BulkDiscount;