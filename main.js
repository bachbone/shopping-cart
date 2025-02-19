import ProductCatalogue from './src/ProductCatalogue.js';
import ShoppingCart from './src/ShoppingCart.js';

import PromoCodePercentageDiscount from './src/PricingRules/PromoCodePercentageDiscount.js';
import PromoCodeFixedAmountDiscount from './src/PricingRules/PromoCodeFixedAmountDiscount.js';
import BuyXForYFreeDiscount from './src/PricingRules/BuyXGetYFreeDiscount.js';
import BulkDiscount from './src/PricingRules/BulkDiscount.js';
import FreeItemPerPurchase from './src/PricingRules/FreeItemPerPurchase.js';

import { VALID_PROMO_DISCOUNTS } from './src/validPromoCodes.js';

const UnliLarge = ProductCatalogue.createCartItemFromProductCode('ult_large');

const fixedAmountDiscount = new PromoCodeFixedAmountDiscount({
  priorityLevel: 10,
  promoCode: 'FIXEDAMOUNT20',
  amount: VALID_PROMO_DISCOUNTS['FIXEDAMOUNT20'],
});

const percentageDiscount = new PromoCodePercentageDiscount({
  priorityLevel: 5,
  promoCode: 'I<3AMAYSIM',
  percent: VALID_PROMO_DISCOUNTS['I<3AMAYSIM'],
});

const cart = ShoppingCart.new([fixedAmountDiscount, percentageDiscount]);

cart.add(UnliLarge);
cart.add(UnliLarge);
cart.add(UnliLarge, 'FIXEDAMOUNT20');
cart.add(UnliLarge, 'I<3AMAYSIM');

// Calculate the expected total based on this order
const subtotal = 44.90 * 4;
console.log(subtotal)
console.log(fixedAmountDiscount.amount)
console.log(percentageDiscount.percent)
console.log(subtotal - fixedAmountDiscount.amount)
const expectedTotal = (subtotal - fixedAmountDiscount.amount) * (1 - percentageDiscount.percent / 100);

console.log(cart.total, expectedTotal);