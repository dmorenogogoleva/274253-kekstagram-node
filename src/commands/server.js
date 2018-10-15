const express = require(`express`);
const app = express();

app.use(express.static(`${__dirname}/../../static`));

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
