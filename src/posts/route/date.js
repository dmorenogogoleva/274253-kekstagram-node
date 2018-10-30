const NotFoundError = require(`../../errors/not-found-error`);
const asyncMiddleware = require(`./async-middleware`);

module.exports = (postsRouter) => {
  postsRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
    const data = req.params;
    const found = await postsRouter.postsStore.getPost(data.date);
    if (!found) {
      throw new NotFoundError(`Пост с датой "${data.date}" не найден`);
    }

    res.send(found);
  }));

};
