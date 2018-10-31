require(`colors`);
const logger = require(`../logger`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows program author`,
  execute() {
    logger.info(packageInfo.author.yellow);
    process.exit(0);
  }
};
