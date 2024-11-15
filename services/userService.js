const faker = require('faker');

class UserService {
  constructor() {
    this.users = [];
    this.generateUsers();
  }

  generateUsers() {
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      });
    }
  }

  async findAll() {
    return this.users;
  }

  async findById(id) {
    return this.users.find((user) => user.id === id);
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id, changes) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const user = this.users[index];
    this.users[index] = { ...user, ...changes };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }
}

module.exports = UserService;
