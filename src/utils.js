module.exports = {
  REGEXP_URL: /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/,
  REGEXP_HASHTAG: /^#[а-яa-z0-9]{1,20}$/i,
  effects: [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`],
  lengthOfRightHashtagsArr(array) {
    return array.filter((hashtag) => this.REGEXP_HASHTAG.test(hashtag)).length;
  },
  lengthOfRightCommentsArr(array) {
    return array.filter((comment) => typeof comment === `string` && comment.length < 140).length;
  }
};
