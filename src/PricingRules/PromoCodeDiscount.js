// Applies a percentage discount to the whole cart when a certain promocode is used
class PromoCodeDiscount {
  constructor(promoCode, percent) {
    this.promoCode = promoCode;
    this.percent = percent;
  }

  isApplicable(cart) {
    return cart.appliedRules
      .filter(rule => rule instanceof PromoCodeDiscount)
      .find(rule => rule.promoCode === this.promoCode);
  }

  applyRule(cart) {
    const discount = subtotal * (this.percent / 100);
    // return resulting discount and new cart items
    return [discount, []];
  }
}

export default PromoCodeDiscount;