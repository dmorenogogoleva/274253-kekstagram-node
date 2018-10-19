const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/modules/server`).app;

describe(`GET /api/posts`, () => {
  it(`get all posts`, async () => {

    const response = await request(app).
      get(`/api/posts`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.length, 10);
  });

  it(`get all posts with / at the end`, async () => {

    const response = await request(app).
      get(`/api/posts/`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.length, 10);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
      get(`/api/oneone`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`Page was not found`).
      expect(`Content-Type`, /html/);
  });
});


describe(`GET /api/posts/:date`, () => {
  it(`get single post`, async () => {

    const posts = await request(app).get(`/api/posts`);
    const firstPostDate = JSON.parse(posts.text)[0].date;

    const response = await request(app).
      get(`/api/posts/${firstPostDate}`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const post = response.body;
    assert.strictEqual(post.date, firstPostDate);
  });

  it(`get unknown post with date дата`, () => {
    request(app).
      get(`/api/posts/дата`).
      set(`Accept`, `application/json`).
      expect(404);
  });
});
