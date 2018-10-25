const utils = require(`../src/utils`);
const {REGEXP_HASHTAG} = utils;

module.exports = {
  REGEXP_URL: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
  lengthOfRightHashtagsArr(array) {
    return array.filter((hashtag) => REGEXP_HASHTAG.test(hashtag)).length;
  },
  lengthOfRightCommentsArr(array) {
    return array.filter((comment) => typeof comment === `string` && comment.length <= 140).length;
  }
};
