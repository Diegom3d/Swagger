const faker = require('faker');

class productService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    for (let i = 1; i <= 5; i++) {
      this.products.push({
        productId: i,
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        categoryId: faker.datatype.uuid(),
        brandId: faker.datatype.uuid(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      productId: this.products.length + 1,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
  }

  async getById(id) {
    return this.products.find((p) => p.productId == id);
  }

  async update(id, changes) {
    const index = this.products.findIndex((p) => p.productId == id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((p) => p.productId == id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct[0];
  }
}

module.exports = productService;
