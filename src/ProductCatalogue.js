import CartItem from './CartItem.js';
import Product from './Product.js';
class ProductCatalogueClass {
  constructor(products) {
    this.products = {};
    this.addProducts(products);
  }

  addProducts(products) {
    products.forEach(product => {
      this.products[product.code] = product;
    });
  }
  // config can be any modification to the product's property
  // example we can set price to 0
  createCartItemFromProductCode(productCode, config = {}) {
    const product = Object.assign({}, this.products[productCode], config);
    return new CartItem(product);
  }

  getProductByCode(productCode) {
    return this.products[productCode];
  }
}

const ProductCatalogue = new ProductCatalogueClass([
  new Product({ code: 'ult_small', name: 'Unlimited 1GB', price: 24.90 }),
  new Product({ code: 'ult_medium', name: 'Unlimited 2GB', price: 29.90 }),
  new Product({ code: 'ult_large', name: 'Unlimited 5GB', price: 44.90 }),
  new Product({ code: '1gb', name: '1GB Data-pack', price: 9.90 })
]);

export default ProductCatalogue;