const express = require(`express`);
const postsStore = require(`../posts/store`);
const imagesStore = require(`../images/store`);
const postsRouter = require(`../posts/route`)(postsStore, imagesStore);
const app = express();

app.use(express.static(`${__dirname}/../../static`));

app.use(`/api/posts`, postsRouter);

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

if (require.main === module) {
  runServer(3000);
}
