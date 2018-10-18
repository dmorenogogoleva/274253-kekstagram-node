const express = require(`express`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const postsGenerator = require(`../modules/generator`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const validate = require(`./validation`);

const posts = postsGenerator.generateEntity(10);

postsRouter.get(``, (req, res) => {
  const queriesParams = [req.query.skip, req.query.limit];

  const invalidQuery = queriesParams.find((que) => isNaN(que));

  if (invalidQuery) {
    throw new ValidationError(`Field ${invalidQuery} should be a number!`);
  }

  const requestedPosts = posts.slice(queriesParams[0], queriesParams[1]);

  res.send(requestedPosts || posts);
});

postsRouter.get(`/:date`, (req, res) => {
  const date = req.params.date;

  if (!date) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }

  const found = posts.find((post) => +(post.date) === +(date));

  if (!found) {
    throw new NotFoundError(`Пост с датой "${date}" не найден`);
  }

  res.send(validate(found));
});

postsRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  }
});

module.exports = postsRouter;
