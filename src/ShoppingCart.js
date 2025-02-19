import reconcileDiscountStack from './utils/reconcileDiscountStack.js';

class ShoppingCart {
  constructor(pricingRules = []) {
    this._items = [];
    this.freeItems = [];
    this.productCount = {};
    this.appliedRules = {};
    this.activatedPromoCodes = {};
    this.discounts = [];
    this._totalDiscount = 0;
    this._total = 0;
    this.pricingRules = pricingRules;
  }

  static new(pricingRules = []) {
    return new ShoppingCart(pricingRules);
  }

  add(item, promoCode) {
    // only add to product count if item is not free
    if (item.price > 0) {
      this.productCount[item.product.code] = (this.productCount[item.product.code] || 0) + 1;
    }

    if (promoCode) {
      this.activatedPromoCodes[promoCode] = true;
    }

    this._items.push(item);

    // reset pricing rule related properties
    this.appliedRules = {};
    this.freeItems = [];
    this._totalDiscount = 0;
    this.discounts = [];
  }

  addFreeItem(item) {
    this.freeItems.push(item);
  }

  isRuleApplied(rule) {
    return this.appliedRules[rule.id];
  }

  applyPricingRules() {
    // sort rules by priority
    const sortedRules = this.pricingRules.sort((a, b) => b.priorityLevel - a.priorityLevel);

    // apply rules based on priority
    // the discount stack will be populated
    sortedRules.forEach(rule => {
      if (rule.isApplicable(this) && !this.isRuleApplied(rule)) {
        rule.applyRule(this);
        this.appliedRules[rule.id] = true;
      }
    });

    // reconcile discount type such as percentage discounts
    const discountStack = reconcileDiscountStack(this.discounts);

    this._total = this.subtotal;
    this._totalDiscount = 0;
    for (const discount of discountStack) {
      let discountValue = 0;
      if (discount.type === 'percentage') {
        discountValue = this._total * (discount.value / 100);
      }
      else {
        discountValue = discount.value;
      }

      this._total -= discountValue;
      this._totalDiscount += discountValue;
    }
  }

  get subtotal() {
    return this._items.reduce((total, item) => total + item.price, 0);
  }

  get totalDiscount() {
    this.applyPricingRules();
    return this._totalDiscount;
  }

  get total() {
    this.applyPricingRules();
    return this._total;
  }

  get items() {
    this.applyPricingRules();
    return this._items.concat(this.freeItems);
  }
}

export default ShoppingCart;