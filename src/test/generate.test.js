const generator = require(`../modules/generator`);
const assert = require(`assert`);

const generateEntity = generator.generateEntity;

describe(`generateEntity`, () => {
  it(`func have field url`, () => {
    assert.ok(typeof generateEntity().url, true);
  });
  it(`field url is a string`, () => {
    assert.strictEqual(typeof generateEntity().url, `string`);
  });
});

