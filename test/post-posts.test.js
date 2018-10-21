const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/modules/server`).app;

const TEST_DATE = Date.now() - 1;

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
      photo: {
        url: `test.png`
      }
    });
  });

  it(`send invalid json post`, async () => {

    const sent = {
      url: `http://placecorgi.com/600/300`,
      scale: 1,
      effect: `chrome`,
      hashtags: `['#hashtag1', '#hashtag2']`,
      description: `Emily Dickinson is one of America’s greatest and most original poets of all time`,
      likes: `276`,
      comments: `['She took definition as her province', 'and challenged the existing definitions of poetry and the poet’s work.']`,
    };

    await request(app).
      post(`/api/posts`).
      send(sent).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(400).
      expect({
        "code": 400,
        "message": `Field 'date' is required,Field 'date' should be a number`
      }).expect(`Content-Type`, /json/);
  });

  it(`send invalid multipart/form-data post`, async () => {

    await request(app).
      post(`/api/posts`).
      attach(`filename`, `test/images/test.png`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(400).
      expect({
        "code": 400,
        "message": `Field 'date' is required,Field 'date' should be a number`
      }).
      expect(`Content-Type`, /json/);
  });
});

