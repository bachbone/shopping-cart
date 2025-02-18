import CartItem from "../CartItem.js";

class FreeItemPerPurchase {
  constructor({ productCode, freeProduct, freeProductCount }) {
    this.productCode = productCode;
    this.freeProduct = freeProduct;
    this.freeProductCount = freeProductCount;
  }

  applyRule(cart) {
    const productCount = cart.productCount[this.productCode] || 0;
    if (productCount === 0) {
      return [0, []];
    }
    const freeItems = productCount * this.freeProductCount;
    const newItems = [];
    for (let i = 0; i < freeItems; i++) {
      newItems.push(new CartItem(this.freeProduct));
    }
    return [0, newItems];
  }
}

export default FreeItemPerPurchase;