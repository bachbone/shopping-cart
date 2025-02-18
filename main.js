import ShoppingCart from './src/ShoppingCart.js';
import Product from './src/Product.js';
import CartItem from './src/CartItem.js';

import PromoCodeDiscount from './src/PricingRules/PromoCodeDiscount.js';
import BuyXForYFreeDiscount from './src/PricingRules/BuyXGetYFreeDiscount.js';
import BulkDiscount from './src/PricingRules/BulkDiscount.js';
import FreeItemPerPurchase from './src/PricingRules/FreeItemPerPurchase.js';

import { VALID_PROMO_DISCOUNTS } from './src/validPromoCodes.js';

const UnliSmall = new Product({ code: 'ult_small', name: 'Unlimited 1GB', price: 24.90 });
const UnliMedium = new Product({ code: 'ult_medium', name: 'Unlimited 2GB', price: 29.90 });
const UnliLarge = new Product({ code: 'ult_large', name: 'Unlimited 5GB', price: 44.90 });
const DataPack1GB = new Product({ code: '1gb', name: '1GB Data-pack', price: 9.90 });

const pricingRules = [
  // A 3 for 2 deal on UnliSmall
  // new BuyXForYFreeDiscount({ productCode: 'ult_small', buyCount: 3, freeCount: 1 }),
  // Bulk Discount on UnliLarge
  // new BulkDiscount({ productCode: 'ult_large', thresholdCount: 3, discountedPrice: 39.90 }),
  // apply I<3AMAYSIM promo code discount
  new PromoCodeDiscount('I<3AMAYSIM', VALID_PROMO_DISCOUNTS['I<3AMAYSIM']),
  // new PromoCodeDiscount('TESTING123', VALID_PROMO_DISCOUNTS['TESTING123']),
  // new FreeItemPerPurchase({ productCode: 'ult_medium', freeProduct: DataPack1GB, freeProductCount: 1 })
];

const cart = ShoppingCart.new(pricingRules);

cart.add(new CartItem(UnliSmall), 'I<3AMAYSIM');

console.log(cart.items);
console.log(cart.pricingRules);
console.log("Subtotal:", cart.subtotal);
console.log("Total Discount:", cart.totalDiscount);
console.log("Total:", cart.total);
