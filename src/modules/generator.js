const crypto = require(`crypto`);
const utils = require(`../utils`);

const {effects} = utils;

module.exports = {
  name: `generator`,
  description: `Generates mock json`,
  descriptionMaxLength: 140,
  commentMaxLength: 140,
  hashtagMaxLength: 20,
  hashtagsArrayMaxLength: 5,
  getRandomNum(min, max) {
    return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
  },
  getRandomString(length) {
    return length < 2
      ? crypto.randomBytes(1).toString(`hex`)
      : crypto.randomBytes(length / 2).toString(`hex`);
  },
  getCommentsArray() {
    const arr = [];
    for (let i = 0; i < this.getRandomNum(0, 5); i++) {
      arr.push(this.getRandomString(this.getRandomNum(1, this.commentMaxLength)));
    }
    return arr;
  },
  getHashtagsArray() {
    const arr = [];
    for (let i = 0; i < this.getRandomNum(0, this.hashtagsArrayMaxLength); i++) {
      arr.push(`#${this.getRandomString(this.getRandomNum(1, this.hashtagMaxLength))}`);
    }
    return arr;
  },
  generateEntity() {
    const url = `http://placecorgi.com/600/${this.getRandomNum(200, 800)}`;
    const scale = this.getRandomNum(0, 100);
    const effect = effects[this.getRandomNum(0, effects.length - 1)];
    const hashtags = this.getHashtagsArray();
    const description = this.getRandomString(this.getRandomNum(1, this.descriptionMaxLength));
    const likes = this.getRandomNum(0, 1000);
    const comments = this.getCommentsArray();
    const date = this.getRandomNum(Date.now() - utils.millisecondsInWeek, Date.now());
    return {
      url,
      scale,
      effect,
      hashtags,
      description,
      likes,
      comments,
      date,
    };
  }
};
