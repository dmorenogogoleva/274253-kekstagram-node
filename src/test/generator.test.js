const generator = require(`../modules/generator`);
const assert = require(`assert`);
const utils = require(`../utils`);

const generateEntity = generator.generateEntity();

describe(`generateEntity`, () => {
  it(`func have field url`, () => {
    assert.ok(generateEntity.url, true);
  });
  it(`field url is a string`, () => {
    assert.strictEqual(typeof generateEntity.url, `string`);
  });
  it(`url have right format`, () => {
    assert.ok(utils.REGEXP_URL.test(generateEntity.url), true);
  });


  it(`func have field scale`, () => {
    assert.ok(generateEntity.scale, true);
  });
  it(`field scale is a number`, () => {
    assert.strictEqual(typeof generateEntity.scale, `number`);
  });
  it(`scale is greater than 0`, () => {
    assert.strictEqual(generateEntity.scale > 0, true);
  });
  it(`scale is less than 100`, () => {
    assert.strictEqual(generateEntity.scale < 100, true);
  });

  it(`func have field effect`, () => {
    assert.ok(generateEntity.effect, true);
  });
  it(`field effect is a string`, () => {
    assert.strictEqual(typeof generateEntity.effect, `string`);
  });
  it(`field effect is one of effects`, () => {
    assert.ok(utils.effects.includes(generateEntity.effect), true);
  });

  it(`func have field hashtags`, () => {
    assert.ok(generateEntity.hashtags, true);
  });
  it(`field hashtags is an array`, () => {
    assert.strictEqual(typeof generateEntity.hashtags, `object`);
  });
  it(`field hashtags have less than 5 hashtags`, () => {
    assert.strictEqual(generateEntity.hashtags.length <= 4, true);
  });
  it(`hashtags items have right format`, () => {
    assert.ok(utils.lengthOfRightHashtagsArr(generateEntity.hashtags) === generateEntity.hashtags.length, true);
  });

  it(`func have field description`, () => {
    assert.ok(generateEntity.description, true);
  });
  it(`field description is a string`, () => {
    assert.strictEqual(typeof generateEntity.description, `string`);
  });
  it(`description length is less than 140ch`, () => {
    assert.strictEqual(generateEntity.description.length < 140, true);
  });


  it(`func have field likes`, () => {
    assert.ok(generateEntity.likes, true);
  });
  it(`field likes is a number`, () => {
    assert.strictEqual(typeof generateEntity.likes, `number`);
  });
  it(`likes is greater than 0`, () => {
    assert.strictEqual(generateEntity.likes > 0, true);
  });
  it(`likes is less than 1000`, () => {
    assert.strictEqual(generateEntity.likes < 1000, true);
  });

  it(`func have field comments`, () => {
    assert.ok(generateEntity.comments, true);
  });
  it(`field comments is an array`, () => {
    assert.strictEqual(typeof generateEntity.comments, `object`);
  });
  it(`comments items have right format`, () => {
    assert.ok(utils.lengthOfRightCommentsArr(generateEntity.comments) === generateEntity.comments.length, true);
  });


  it(`func have field date`, () => {
    assert.ok(generateEntity.date, true);
  });
  it(`field date is an number`, () => {
    assert.strictEqual(typeof generateEntity.date, `number`);
  });
  it(`field date have right format`, () => {
    assert.ok(generateEntity.date <= Date.now(), true);
    assert.ok(generateEntity.date >= Date.now() - utils.millisecondsInWeek, true);
  });
});

