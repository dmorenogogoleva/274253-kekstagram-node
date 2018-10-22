const express = require(`express`);
const multer = require(`multer`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();
const postsGenerator = require(`../modules/generator`);
const NotFoundError = require(`../errors/not-found-error`);
const ValidationError = require(`../errors/validation-error`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const validate = require(`./validation`);
const toStream = require(`buffer-to-stream`);
const queryParametrsValidation = require(`./queryParametrsValidation`);

const posts = postsGenerator.generateEntity(10);
const upload = multer({storage: multer.memoryStorage()});
const MongoError = require(`mongodb`).MongoError;
const jsonParser = express.json();

const PHOTOS_DEFAULT_LIMIT = 50;

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = async (cursor, skip = 0, limit = PHOTOS_DEFAULT_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

postsRouter.get(``, asyncMiddleware(async (req, res) => {
  const {skip, limit} = req.query;
  queryParametrsValidation(posts, skip, limit);

  res.send(await toPage(await postsRouter.postsStore.getAllPosts(), skip, limit));
}));

postsRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const data = validate(req.params);

  const found = await postsRouter.postsStore.getPost(data.date);

  if (!found) {
    throw new NotFoundError(`Пост с датой "${data.date}" не найден`);
  }

  res.send(found);
}));

postsRouter.post(``, jsonParser, upload.single(`filename`), asyncMiddleware(async (req, res) => {
  const body = req.body;
  const image = req.file;
  if (image) {
    body.image = {url: image.originalname};
  }

  const validated = validate(body);
  const result = await postsRouter.postsStore.save(validated);

  const insertedId = result.insertedId;

  if (image) {
    await postsRouter.imagesStore.save(insertedId, toStream(image.buffer));
  }
  res.send(body);
}));

postsRouter.get(`/:date/image`, asyncMiddleware(async (req, res) => {
  const postDate = req.params.date;

  if (!postDate) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }

  const date = postDate;
  const found = await postsRouter.postsStore.getPost(date);

  if (!found) {
    throw new NotFoundError(`Пост с датой "${postDate}" не найден`);
  }

  const result = await postsRouter.imagesStore.get(found._id);
  if (!result) {
    throw new NotFoundError(`Фото для поста с датой "${postDate}" не найдено`);
  }

  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);

  res.on(`error`, (e) => console.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => console.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

postsRouter.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  }
  next(err, req, res);
});

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  console.error(err);
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    res.status(400).json(err.message);
    return;
  }
  res.status(err.code || 500).send(err.message);
};

postsRouter.use(ERROR_HANDLER);

postsRouter.use(NOT_FOUND_HANDLER);

module.exports = (postsStore, imagesStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imagesStore = imagesStore;
  return postsRouter;
};
