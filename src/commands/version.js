require(`colors`);
const appVersion = require(`../../package.json`).version;
const logger = require(`../logger`);

const splittedAppVersion = appVersion.split(`.`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    logger.info(`v ${splittedAppVersion[0].red}.${splittedAppVersion[1].green}.${splittedAppVersion[2].blue}`);
    process.exit(0);
  }
};
