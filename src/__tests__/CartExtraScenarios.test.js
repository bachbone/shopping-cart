import ProductCatalogue from '../ProductCatalogue.js';
import ShoppingCart from '../ShoppingCart.js';

import PromoCodePercentageDiscount from '../PricingRules/PromoCodePercentageDiscount.js';
import PromoCodeFixedAmountDiscount from '../PricingRules/PromoCodeFixedAmountDiscount.js';

import { VALID_PROMO_DISCOUNTS } from '../validPromoCodes.js';

describe('ShoppingCart', () => {
  const UnliMedium = ProductCatalogue.createCartItemFromProductCode('ult_medium');
  const UnliLarge = ProductCatalogue.createCartItemFromProductCode('ult_large');

  it('should be applied multiplicatively: I<3AMAYSIM (10% off) and PERCENTAGE20 (20% off)', () => {
    const pricingRules = [
      new PromoCodePercentageDiscount({
        priorityLevel: 5,
        promoCode: 'I<3AMAYSIM',
        percent: VALID_PROMO_DISCOUNTS['I<3AMAYSIM'],
      }),
      new PromoCodePercentageDiscount({
        priorityLevel: 5,
        promoCode: 'PERCENTAGE20',
        percent: VALID_PROMO_DISCOUNTS['PERCENTAGE20'],
      }),
    ];

    const cart = ShoppingCart.new(pricingRules);

    cart.add(UnliMedium, 'I<3AMAYSIM');
    cart.add(UnliLarge, 'PERCENTAGE20');

    // 44.9 + 29.9 = 74.8
    // (1 - 0.1) * (1 - 0.2) * 74.8 = 53.856
    expect(cart.total).toBeCloseTo(53.856);
    expect(cart.items.map((item) => item.product.code)).toEqual([
      'ult_medium',
      'ult_large',
    ]);
  });

  it('should apply higher priority discount first', () => {

    // Scenario: fixedAmountDiscount then percentageDiscount
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
    const expectedTotal = (subtotal - fixedAmountDiscount.amount) * (1 - percentageDiscount.percent / 100);
    expect(cart.total).toBeCloseTo(expectedTotal);

    // Change priority and test again
    fixedAmountDiscount.priorityLevel = 5;
    percentageDiscount.priorityLevel = 10;

    const cart2 = ShoppingCart.new([percentageDiscount, fixedAmountDiscount]);

    cart2.add(UnliLarge);
    cart2.add(UnliLarge);
    cart2.add(UnliLarge, 'FIXEDAMOUNT20');
    cart2.add(UnliLarge, 'I<3AMAYSIM');

    // Expecting different result due to change in prio.
    const expectedTotal2 = (subtotal * (1 - percentageDiscount.percent / 100)) - fixedAmountDiscount.amount;
    expect(cart2.total).toBeCloseTo(expectedTotal2);
  });

});