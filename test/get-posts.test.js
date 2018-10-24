const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const postsStoreMock = require(`./mock/posts-store`);
const imagesStoreMock = require(`./mock/images-store`);
const postsRoute = require(`../src/posts/route`)(postsStoreMock, imagesStoreMock);

const app = express();

app.use(`/api/posts`, postsRoute);


describe(`GET /api/posts`, () => {
  it(`get all posts`, async () => {

    const response = await request(app).
      get(`/api/posts`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, 10);
  });

  it(`get all posts with / at the end`, async () => {

    const response = await request(app).
      get(`/api/posts/`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const posts = response.body;
    assert.equal(posts.data.length, 10);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
      get(`/api/oneone`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`Content-Type`, /json/);
  });
});


describe(`GET /api/posts/:date`, () => {
  it(`get single post`, async () => {

    const posts = await request(app).get(`/api/posts`);
    const firstPostDate = JSON.parse(posts.text).data[0].date;
    const response = await request(app).
      get(`/api/posts/${firstPostDate}`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const post = response.body;
    assert.strictEqual(post.date, firstPostDate);
  });


  it(`get unknown post with date unknownPost`, () => {
    request(app).
      get(`/api/posts/unknownPost`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`Content-Type`, /json/);
  });
});
