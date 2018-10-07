const assert = require(`assert`);
const helpers = require(`./helpers`);
const utils = require(`../src/utils`);
const generator = require(`../src/modules/generator`);

const generateEntity = generator.generateEntity();
const {REGEXP_URL, lengthOfRightHashtagsArr, lengthOfRightCommentsArr} = helpers;
const {EFFECTS, MILLISECONDS_IN_WEEK} = utils;

describe(`generateEntity`, () => {
  it(`func returns url`, () => {
    assert.ok(generateEntity.url, true);
  });
  it(`url is a string`, () => {
    assert.strictEqual(typeof generateEntity.url, `string`);
  });
  it(`url have right format`, () => {
    assert.ok(REGEXP_URL.test(generateEntity.url), true);
  });


  it(`func have scale`, () => {
    assert.ok(generateEntity.scale, true);
  });
  it(`scale is a number`, () => {
    assert.strictEqual(typeof generateEntity.scale, `number`);
  });
  it(`scale is greater than 0`, () => {
    assert.strictEqual(generateEntity.scale > 0, true);
  });
  it(`scale is less or equal than 100`, () => {
    assert.strictEqual(generateEntity.scale <= 100, true);
  });

  it(`func returns effect`, () => {
    assert.ok(generateEntity.effect, true);
  });
  it(`effect is a string`, () => {
    assert.strictEqual(typeof generateEntity.effect, `string`);
  });
  it(`effect is one of effects`, () => {
    assert.ok(EFFECTS.includes(generateEntity.effect), true);
  });

  it(`func returns hashtags`, () => {
    assert.ok(generateEntity.hashtags, true);
  });
  it(`hashtags is an array`, () => {
    assert.strictEqual(typeof generateEntity.hashtags, `object`);
  });
  it(`hashtags have less or equal than 5 hashtags`, () => {
    assert.strictEqual(generateEntity.hashtags.length <= 5, true);
  });
  it(`hashtags items have right format`, () => {
    assert.ok(lengthOfRightHashtagsArr(generateEntity.hashtags) === generateEntity.hashtags.length, true);
  });

  it(`func returns description`, () => {
    assert.ok(generateEntity.description, true);
  });
  it(`description is a string`, () => {
    assert.strictEqual(typeof generateEntity.description, `string`);
  });
  it(`description length is less or equal than 140ch`, () => {
    assert.strictEqual(generateEntity.description.length <= 140, true);
  });


  it(`func returns likes`, () => {
    assert.ok(generateEntity.likes, true);
  });
  it(`likes is a number`, () => {
    assert.strictEqual(typeof generateEntity.likes, `number`);
  });
  it(`likes is greater than 0`, () => {
    assert.strictEqual(generateEntity.likes > 0, true);
  });
  it(`likes is less or equal than 1000`, () => {
    assert.strictEqual(generateEntity.likes <= 1000, true);
  });

  it(`func returns comments`, () => {
    assert.ok(generateEntity.comments, true);
  });
  it(`comments is an array`, () => {
    assert.strictEqual(typeof generateEntity.comments, `object`);
  });
  it(`comments items have right format`, () => {
    assert.ok(lengthOfRightCommentsArr(generateEntity.comments) === generateEntity.comments.length, true);
  });


  it(`func returns date`, () => {
    assert.ok(generateEntity.date, true);
  });
  it(`date is an number`, () => {
    assert.strictEqual(typeof generateEntity.date, `number`);
  });
  it(`date have right format`, () => {
    assert.ok(generateEntity.date <= Date.now(), true);
    assert.ok(generateEntity.date >= Date.now() - MILLISECONDS_IN_WEEK, true);
  });
});

