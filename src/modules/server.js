const express = require(`express`);
const postsRouter = require(`../posts/route`);
const app = express();

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

app.use(express.static(`${__dirname}/../../static`));

app.use(`/api/posts`, postsRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

const runServer = (port) => {

  port = parseInt(port, 10);

  app.listen(port, () => console.log(`Сервер запущен: http://localhost:${port}`));
};

module.exports = {
  name: `server`,
  description: `Starts keksogram server`,
  execute(args) {
    const port = args[1] || 3000;
    runServer(port);
  },
  app
};
