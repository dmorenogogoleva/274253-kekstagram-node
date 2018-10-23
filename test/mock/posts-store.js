const Cursor = require(`./cursor`);
const postsGenerator = require(`../../src/modules/generator`);

class MockPostsStore {
  constructor(data) {
    this.data = data;
  }

  async getPost(date) {
    return this.data.filter((it) => it.date === date)[0];
  }

  async getAllPosts() {
    return new Cursor(this.data);
  }

  async save() {
    return {
      insertedId: 10
    };
  }

}

module.exports = new MockPostsStore(postsGenerator.generateEntity());
