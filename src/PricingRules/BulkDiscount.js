class BulkDiscount {
  constructor({ productCode, thresholdCount, discountedPrice }) {
    this.productCode = productCode;
    this.thresholdCount = thresholdCount;
    this.discountedPrice = discountedPrice;

  }

  isApplicable(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    return productCount > this.thresholdCount;
  }

  applyRule(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    if (productCount <= this.thresholdCount) {
      return [0, []];
    }
    const itemPrice = cart.getCartItemByProductCode(this.productCode).product.price;
    const discount = (itemPrice - this.discountedPrice) * productCount;
    // return resulting discount and new cart items
    return [discount, []];
  }
}

export default BulkDiscount;