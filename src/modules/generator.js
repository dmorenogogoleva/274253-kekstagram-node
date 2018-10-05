module.exports = {
  name: `generator`,
  description: `Generates mock json`,
  generateEntity() {
    return {
      url: `http://placecorgi.com/600/300`,
      scale: 1,
      effect: `none`,
      hashtags: [`#hashtag1`, `#hashtag2`],
      description: `это больничный мистер черепах Генрих с самыми мерзкими ноздрями эвэр`,
      likes: 99,
      comments: [`comment1`, `comment2`],
      date: 1538767371423,
    };
  }
};
