const combineDiscounts = (discount1, discount2) => {
  // Handle PromoCodePercentageDiscount
  if (discount1.type === 'percentage') {
    // compute multiplicative discount
    const remaining1 = 1 - discount1.value / 100;
    const remaining2 = 1 - discount2.value / 100;
    return { type: discount1.type, value: (1 - remaining1 * remaining2) * 100 };
  }
  else {
    return { type: discount1.type, value: discount1.value + discount2.value };
  }
}

export default combineDiscounts;