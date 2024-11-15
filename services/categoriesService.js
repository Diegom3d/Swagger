const faker = require('faker');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generateCategories();
  }

  generateCategories() {
    for (let i = 0; i < 6; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        categoryName: faker.commerce.department(),
        description: faker.lorem.sentence(),
        active: faker.datatype.boolean(),
      });
    }
  }

  async findAll() {
    return this.categories;
  }

  async findById(id) {
    return this.categories.find((category) => category.id === id);
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
      active: data.active !== undefined ? data.active : faker.datatype.boolean(),
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = { ...category, ...changes };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const deletedCategory = this.categories.splice(index, 1);
    return deletedCategory[0];
  }
}

module.exports = CategoriesService;
