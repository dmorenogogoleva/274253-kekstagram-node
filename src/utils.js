module.exports = {
  REGEXP_HASHTAG,
  EFFECTS: [`none`, `chrome`, `sepia`, `marvin`, `phobos`, `heat`],
  MILLISECONDS_IN_WEEK: 604800000,
  checkScaleField,
  checkHastagsField,
  checkDescriptionField,
};


const REGEXP_HASHTAG = /^#[а-яa-z0-9]{1,20}$/i;

const isNumberInRange = (value, min, max) => {
  const num = parseInt(value, 10);
  return num > min && num < max ? true : false; // eslint-disable-line
};

const checkScaleField = (scale) => !isNumberInRange(scale, 0, 101);

const checkDescriptionField = (description) => !isNumberInRange(description.length, 0, 141);

const checkHastagsField = (hashtags) => {
  const currentHashtags = hashtags.split(`,`);
  const result = [];
  for (let hashtag of currentHashtags) {
    !REGEXP_HASHTAG.test(hashtag.trim()) && result.push(hashtag); // eslint-disable-line
  }
  return result.length > 0 ? result.join(``) : false;
};
