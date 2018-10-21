const express = require(`express`);
const multer = require(`multer`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const postsGenerator = require(`../modules/generator`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const validate = require(`./validation`);
const queryParametrsValidation = require(`./queryParametrsValidation`);

const posts = postsGenerator.generateEntity(10);
const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();


postsRouter.get(``, (req, res) => {
  const {skip, limit} = req.query;

  const requestedPosts = skip || limit
    ? queryParametrsValidation(posts, skip, limit)
    : null;

  res.send(requestedPosts || posts);
});

postsRouter.get(`/:date`, (req, res) => {
  const data = validate(req.params);

  const found = posts.find((post) => +(post.date) === +(data.date));

  if (!found) {
    throw new NotFoundError(`Пост с датой "${data.date}" не найден`);
  }

  res.send(found);
});

postsRouter.post(``, jsonParser, upload.single(`filename`), (req, res) => {
  const body = req.body;
  const photo = req.file;

  validate(body);

  if (photo) {
    body.photo = {url: photo.originalname};
  }
  res.send(body);
});

postsRouter.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  }
  next(err, req, res);
});

module.exports = postsRouter;
