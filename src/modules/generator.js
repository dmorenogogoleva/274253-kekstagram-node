const utils = require(`../utils`);

const {EFFECTS, MILLISECONDS_IN_WEEK} = utils;

const DESCRIPTION_MAX_LENGTH = 140;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_ARRAY_MAX_LENGTH = 5;

const getRandomNum = (min, max) => {
  return Math.abs(Math.round(min - 0.5 + Math.random() * (max - min + 1)));
};

const getRandomString = (length) => {
  let text = ``;
  const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const getCommentsArray = () => {
  const arr = [];
  for (let i = 0; i < getRandomNum(0, 5); i++) {
    arr.push(getRandomString(getRandomNum(1, COMMENT_MAX_LENGTH)));
  }
  return arr;
};

const getHashtagsArray = () => {
  const arr = [];
  for (let i = 0; i < getRandomNum(0, HASHTAGS_ARRAY_MAX_LENGTH); i++) {
    arr.push(`#${getRandomString(getRandomNum(1, HASHTAG_MAX_LENGTH))}`);
  }
  return arr;
};

const generateEntity = () => {
  const url = `http://placecorgi.com/600/${getRandomNum(200, 800)}`;
  const scale = getRandomNum(0, 100);
  const effect = EFFECTS[getRandomNum(0, EFFECTS.length - 1)];
  const hashtags = getHashtagsArray();
  const description = getRandomString(getRandomNum(1, DESCRIPTION_MAX_LENGTH));
  const likes = getRandomNum(0, 1000);
  const comments = getCommentsArray();
  const date = getRandomNum(Date.now() - MILLISECONDS_IN_WEEK, Date.now());
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
};


module.exports = {generateEntity};
