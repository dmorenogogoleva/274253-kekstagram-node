require(`colors`);
const packageInfo = require(`../../package.json`);
const logger = require(`../logger`);

module.exports = {
  name: `description`,
  description: `Shows program description`,
  execute() {
    logger.info(packageInfo.description.yellow);
    process.exit(0);
  }
};
