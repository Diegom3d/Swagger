const faker = require('faker');

class BrandsService {
  constructor() {
    this.brands = [];
    this.generateBrands();
  }

  generateBrands() {
    for (let i = 0; i < 5; i++) {
      this.brands.push({
        id: faker.datatype.uuid(),
        brandName: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        active: faker.datatype.boolean(),
      });
    }
  }

  async findAll() {
    return this.brands;
  }

  async findById(id) {
    return this.brands.find((brand) => brand.id === id);
  }

  async create(data) {
    const newBrand = {
      id: faker.datatype.uuid(),
      ...data,
      active: data.active !== undefined ? data.active : faker.datatype.boolean(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  async update(id, changes) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new Error('Brand not found');
    }
    const brand = this.brands[index];
    this.brands[index] = { ...brand, ...changes };
    return this.brands[index];
  }

  async delete(id) {
    const index = this.brands.findIndex((brand) => brand.id === id);
    if (index === -1) {
      throw new Error('Brand not found');
    }
    const deletedBrand = this.brands.splice(index, 1);
    return deletedBrand[0];
  }
}

module.exports = BrandsService;
