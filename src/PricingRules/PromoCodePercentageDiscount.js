import PricingRule from "./PricingRule.js";
import { VALID_PROMO_DISCOUNTS } from "../validPromoCodes.js";

// Applies a percentage discount to the whole cart when a certain promocode is used
class PromoCodePercentageDiscount extends PricingRule {
  constructor({ priorityLevel = 0, promoCode, percent}) {
    super(priorityLevel);
    this.promoCode = promoCode;
    this.percent = percent;
  }
  static isValidPromoCode(promoCode) {
    return VALID_PROMO_DISCOUNTS[promoCode];
  }
  isApplicable(cart) {
    // check if the user activated the promocode
    const isPromoCodeActivated = cart.activatedPromoCodes[this.promoCode];
    // check if the promocode has already been used
    const isPromoCodeUsed = Object.values(cart.appliedRules)
      .filter(rule => rule instanceof PromoCodePercentageDiscount)
      .some(rule => rule.promoCode === this.promoCode);
    return isPromoCodeActivated && !isPromoCodeUsed;
  }
  applyRule(cart) {
    cart.discounts.push({ type: 'percentage', value: this.percent });
  }
}

export default PromoCodePercentageDiscount;