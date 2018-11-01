const express = require(`express`);
const asyncMiddleware = require(`./async-middleware`);
const multer = require(`multer`);
const upload = multer({storage: multer.memoryStorage()});
const validate = require(`../validation`);
const toStream = require(`buffer-to-stream`);
const jsonParser = express.json();

const PHOTOS_DEFAULT_LIMIT = 50;

const toPage = async (cursor, skip = 0, limit = PHOTOS_DEFAULT_LIMIT) => {
  const packet = await cursor.skip(parseInt(skip, 10)).limit(parseInt(limit, 10)).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

module.exports = (postsRouter) => {
  postsRouter.get(``, asyncMiddleware(async (req, res) => {
    const skip = parseInt(req.query.skip || 0, 10);
    const limit = parseInt(req.query.limit || PHOTOS_DEFAULT_LIMIT, 10);

    res.send(await toPage(await postsRouter.postsStore.getAll(), skip, limit));
  }));

  postsRouter.post(``, jsonParser, upload.single(`filename`), asyncMiddleware(async (req, res) => {
    const body = req.body;
    const image = req.file;

    if (image) {
      body.filename = image.originalname;
    }

    const validated = validate(body);
    const result = await postsRouter.postsStore.save(validated);

    const insertedId = result.insertedId;

    if (image) {
      await postsRouter.imagesStore.save(insertedId, toStream(image.buffer));
    }
    res.send(body);
  }));
};
