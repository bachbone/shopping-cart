import ProductCatalogue from '../ProductCatalogue.js';
import ShoppingCart from '../ShoppingCart.js';

import PromoCodePercentageDiscount from '../PricingRules/PromoCodePercentageDiscount.js';
import BuyXForYFreeDiscount from '../PricingRules/BuyXGetYFreeDiscount.js';
import BulkDiscount from '../PricingRules/BulkDiscount.js';
import FreeItemPerPurchase from '../PricingRules/FreeItemPerPurchase.js';

import { VALID_PROMO_DISCOUNTS } from '../validPromoCodes.js';

describe('ShoppingCart', () => {
  const pricingRules = [
    new BuyXForYFreeDiscount({
      priorityLevel: 3,
      productCode: 'ult_small',
      buyCount: 3,
      freeCount: 1,
    }),
    new BulkDiscount({
      priorityLevel: 4,
      productCode: 'ult_large',
      thresholdCount: 3,
      discountedPrice: 39.90,
    }),
    new PromoCodePercentageDiscount({
      priorityLevel: 5,
      promoCode: 'I<3AMAYSIM',
      percent: VALID_PROMO_DISCOUNTS['I<3AMAYSIM'],
    }),
    new FreeItemPerPurchase({
      priorityLevel: 0,
      productCode: 'ult_medium',
      freeProductCode: '1gb',
      freeProductCount: 1,
    }),
  ];

  const UnliSmall = ProductCatalogue.createCartItemFromProductCode('ult_small');
  const UnliMedium = ProductCatalogue.createCartItemFromProductCode('ult_medium');
  const UnliLarge = ProductCatalogue.createCartItemFromProductCode('ult_large');
  const DataPack1GB = ProductCatalogue.createCartItemFromProductCode('1gb');

  it('Scenario 1: 3 x Unlimited 1GB, 1 x Unlimited 5GB', () => {
    const cart = ShoppingCart.new(pricingRules);
    cart.add(UnliSmall);
    cart.add(UnliSmall);
    cart.add(UnliSmall);
    cart.add(UnliLarge);

    expect(cart.total).toBeCloseTo(94.70);
    expect(cart.items.map((item) => item.product.code)).toEqual([
      'ult_small',
      'ult_small',
      'ult_small',
      'ult_large',
    ]);
  });

  it('Scenario 2: 2 x Unlimited 1GB, 4 x Unlimited 5GB', () => {
    const cart = ShoppingCart.new(pricingRules);
    cart.add(UnliSmall);
    cart.add(UnliSmall);
    cart.add(UnliLarge);
    cart.add(UnliLarge);
    cart.add(UnliLarge);
    cart.add(UnliLarge);

    expect(cart.total).toBeCloseTo(209.40);
    expect(cart.items.map((item) => item.product.code)).toEqual([
      'ult_small',
      'ult_small',
      'ult_large',
      'ult_large',
      'ult_large',
      'ult_large',
    ]);
  });

  it('Scenario 3: 1 x Unlimited 1GB, 2 x Unlimited 2GB', () => {
    const cart = ShoppingCart.new(pricingRules);
    cart.add(UnliSmall);
    cart.add(UnliMedium);
    cart.add(UnliMedium);

    expect(cart.total).toBeCloseTo(84.70);
    expect(cart.items.map((item) => item.product.code)).toEqual([
      'ult_small',
      'ult_medium',
      'ult_medium',
      '1gb',
      '1gb',
    ]);
  });

  it('Scenario 4: 1 x Unlimited 1GB, 1 x 1GB Data-pack, I<3AMAYSIM Promo Applied', () => {
    const cart = ShoppingCart.new(pricingRules);
    cart.add(UnliSmall);
    cart.add(DataPack1GB, 'I<3AMAYSIM');

    expect(cart.total).toBeCloseTo(31.32);
    expect(cart.items.map((item) => item.product.code)).toEqual([
      'ult_small',
      '1gb',
    ]);
  });
});