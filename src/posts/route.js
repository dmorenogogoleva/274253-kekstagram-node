const express = require(`express`);
const multer = require(`multer`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const postsGenerator = require(`../modules/generator`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const validate = require(`./validation`);
const queryParametrsValidation = require(`./queryParametrsValidation`);

const posts = postsGenerator.generateEntity(10);
const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();


postsRouter.get(``, (req, res) => {
  const {skip, limit} = req.query;
  const requestedPosts = queryParametrsValidation(posts, skip, limit);
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

// TODO: не работает
postsRouter.post(``, jsonParser, upload.single(`filename`), (req, res) => {
  const body = req.body;
  const photo = req.file;
  if (photo) {
    body.photo = {url: photo.originalname};
  }
  res.send(body);
});

postsRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  }
});

module.exports = postsRouter;
