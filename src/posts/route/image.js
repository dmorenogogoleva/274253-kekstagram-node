const asyncMiddleware = require(`./async-middleware`);
const ValidationError = require(`../../errors/validation-error`);
const NotFoundError = require(`../../errors/not-found-error`);
const logger = require(`../../logger`);

module.exports = (postsRouter) => {
  postsRouter.get(`/:date/image`, asyncMiddleware(async (req, res) => {
    const postDate = req.params.date;

    if (!postDate) {
      throw new ValidationError(`В запросе не указана дата`);
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

    res.on(`error`, (e) => logger.error(e));
    res.on(`end`, () => res.end());
    const stream = result.stream;
    stream.on(`error`, (e) => logger.error(e));
    stream.on(`end`, () => res.end());
    stream.pipe(res);
  }));
};
