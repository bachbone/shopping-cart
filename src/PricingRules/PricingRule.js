import generateUniqueID from "../utils/generateUniqueID.js";

class PricingRule {
  // priorityLevel: lowest priority is 0
  // determines the order in which the rules are applied
  constructor(priorityLevel = 0) {
    this.id = generateUniqueID('pricing-rule-');
    this.priorityLevel = priorityLevel;
  }
}

export default PricingRule;