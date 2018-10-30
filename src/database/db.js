const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);
const NotFoundError = require(`../errors/not-found-error`);

const {DB_HOST, DB_PATH} = process.env;

if (!DB_PATH.process.env) {
  throw new NotFoundError(`Не задано имя базы данных`);
}

const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url, {useNewUrlParser: true}).then((client) => client.db(DB_PATH)).catch((e) => {
  logger.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
