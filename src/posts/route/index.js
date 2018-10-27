const express = require(`express`);
// eslint-disable-next-line new-cap
const postsRouter = express.Router();

const corsRoute = require(`./cors`);
const defaultRoute = require(`./default`);
const dateRoute = require(`./date`);
const imageRoute = require(`./image`);
const errorRoute = require(`./error`);

corsRoute(postsRouter);
defaultRoute(postsRouter);
dateRoute(postsRouter);
imageRoute(postsRouter);
errorRoute(postsRouter);

postsRouter.use((err, req, res, next) => {
  next(err, req, res);
});

module.exports = (postsStore, imagesStore) => {
  postsRouter.postsStore = postsStore;
  postsRouter.imagesStore = imagesStore;
  return postsRouter;
};
