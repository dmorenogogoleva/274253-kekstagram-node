require(`colors`);
const packageInfo = require(`../../package.json`);
const logger = require(`../logger`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  execute() {
    logger.info(packageInfo.license.magenta);
    process.exit(0);
  }
};
