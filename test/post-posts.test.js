const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const postsStoreMock = require(`./mock/posts-store`);
const imagesStoreMock = require(`./mock/images-store`);
const postsRoute = require(`../src/posts/route`)(postsStoreMock, imagesStoreMock);

const app = express();

app.use(`/api/posts`, postsRoute);

const TEST_DATE = `${Date.now() - 1}`;

describe(`POST /api/posts`, () => {
  it(`send post as json`, async () => {

    const sent = {
      url: `http://placecorgi.com/600/300`,
      scale: 1,
      effect: `chrome`,
      hashtags: `['#hashtag1', '#hashtag2']`,
      description: `Emily Dickinson is one of America’s greatest and most original poets of all time`,
      likes: `276`,
      comments: `['She took definition as her province', 'and challenged the existing definitions of poetry and the poet’s work.']`,
      date: TEST_DATE,
    };

    const response = await request(app).
      post(`/api/posts`).
      send(sent).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);


    const post = response.body;
    assert.deepEqual(post, sent);
  });

  it(`send post as multipart/form-data`, async () => {

    const response = await request(app).
      post(`/api/posts`).
      field(`date`, TEST_DATE).
      attach(`filename`, `test/images/test.png`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(200).
      expect(`Content-Type`, /json/);


    const post = response.body;
    assert.deepEqual(post, {
      date: TEST_DATE,
      image: {
        url: `test.png`
      }
    });
  });

  it(`send invalid json post`, async () => {
    const response = await request(app).
      post(`/api/posts`).
      send({}).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(400);

    assert.deepEqual(response.error.text, `Field 'date' is required`);
  });

  it(`send invalid multipart/form-data post`, async () => {

    const response = await request(app).
      post(`/api/posts`).
      attach(`filename`, `test/images/test.png`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(400);

    assert.deepEqual(response.error.text, `Field 'date' is required`);
  });
});

