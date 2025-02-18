// Applies discount if the customer buys a certain number of products
// and gets a free one of the same product
// buy 3 get 1 free equals buy 3 for the price of 2
class BuyXForYFreeDiscount {
  constructor({ productCode, buyCount, freeCount }) {
    this.buyCount = buyCount;
    this.freeCount = freeCount;
    this.productCode = productCode;
  }

  applyRule(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    if (productCount === 0) {
      return [0, []];
    }
    const freeItems = Math.floor(productCount / this.buyCount) * this.freeCount;
    const itemPrice = cart.getCartItemByProductCode(this.productCode).product.price;
    const discount = freeItems * itemPrice;
    // return resulting discount and new cart items
    return [discount, []];
  }
}

export default BuyXForYFreeDiscount;