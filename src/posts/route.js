const express = require(`express`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const postsGenerator = require(`../modules/generator`);

const posts = postsGenerator.generateEntity(10);

postsRouter.get(``, (req, res) => {
  res.send(posts);
});

postsRouter.get(`/:date`, (req, res) => {
  const date = req.params.date;
  const found = posts.find((post) => +(post.date) === +(date));

  if (!found) {
    throw new Error(`Пост с датой "${date}" не найден`);
  }

  res.send(found);
});

module.exports = postsRouter;
