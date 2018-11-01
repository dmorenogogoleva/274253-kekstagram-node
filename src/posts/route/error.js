const MongoError = require(`mongodb`).MongoError;
const NotFoundError = require(`../../errors/not-found-error`);
const ValidationError = require(`../../errors/validation-error`);
const logger = require(`../../logger`);

module.exports = (postsRouter) => {
  const errorHandler = (err, req, res, _next) => {
    logger.error(err);
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
      return;
    } else if (err instanceof MongoError) {
      res.status(400).json(err.message);
      return;
    } else if (err instanceof NotFoundError) {
      res.status(404).json(err.message);
    } else {
      res.status(err.code || 500).send(err.message);
    }
  };

  postsRouter.use(errorHandler);
};
