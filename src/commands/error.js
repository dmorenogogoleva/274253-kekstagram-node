require(`colors`);
const logger = require(`../logger`);

module.exports = {
  name: `error`,
  description: `Shows error message`,
  execute(message) {
    logger.info(`Неизвестная команда ${message.red} \nЧтобы прочитать правила использования приложения, наберите ${`"--help"`.green}`);
    process.exit(0);
  }
};
