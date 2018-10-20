const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../modules/server`).app;

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
      date: Date.now() - 1,
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

  // it(`send post as multipart/form-data`, async () => {

  //   const wizardName = `SuperWizard`;

  //   const response = await request(app).
  //     post(`/api/posts`).
  //     field(`name`, wizardName).
  //     set(`Accept`, `application/json`).
  //     set(`Content-Type`, `multipart/form-data`).
  //     expect(200).
  //     expect(`Content-Type`, /json/);


  //   const post = response.body;
  //   assert.deepEqual(post, {name: wizardName});
  // });
  // it(`send post with avatar as multipart/form-data`, async () => {

  //   const wizardName = `SuperWizard`;

  //   const response = await request(app).
  //     post(`/api/posts`).
  //     field(`name`, wizardName).
  //     attach(`avatar`, `test/fixtures/keks.png`).
  //     set(`Accept`, `application/json`).
  //     set(`Content-Type`, `multipart/form-data`).
  //     expect(200).
  //     expect(`Content-Type`, /json/);


  //   const post = response.body;
  //   assert.deepEqual(post, {name: wizardName, avatar: {name: `keks.png`}});
  // });

});

