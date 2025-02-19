import areSameDiscountType from './areSameDiscountType.js';
import combineDiscounts from './combineDiscounts.js';

const reconcileDiscountStack = (discountStack) => {
  const newDiscountStack = [];
  let currentDiscount = null;
  // reconcile discount stack
  for (const discount of discountStack) {
    // if there is no current discount, assign it
    if (currentDiscount === null) {
      currentDiscount = discount;
    }
    // if the discount are the same type, combine it.
    else if (areSameDiscountType(currentDiscount, discount)) {
      currentDiscount = combineDiscounts(currentDiscount, discount);
    }
    else {
      newDiscountStack.push(currentDiscount);
      currentDiscount = discount;
    }
  }

  if (currentDiscount) {
    newDiscountStack.push(currentDiscount);
  }

  return newDiscountStack;
}

export default reconcileDiscountStack;