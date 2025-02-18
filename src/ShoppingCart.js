class ShoppingCart {
  constructor(pricingRules = []) {
    this._items = [];
    this.productCount = {};
    this.pricingRules = pricingRules;
    this.appliedRules = [];
  }

  static new(pricingRules = []) {
    return new ShoppingCart(pricingRules);
  }

  add(item, promoCode) {
  }

  getCartItemByProductCode(productCode) {
    return this._items.find(item => item.product.code === productCode);
  }

  get subtotal() {
    return this._items.reduce((total, item) => total + item.product.price, 0);
  }

  get totalDiscount() {
  }

  get total() {
    for (const rule of this.pricingRules) {
      if (rule.isApplicable(this)) {
        this.appliedRules.push(rule);
      }
    }
    return this.subtotal - this.totalDiscount;
  }

  get items() {
  }

}
export default ShoppingCart;