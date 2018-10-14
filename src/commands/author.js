require(`colors`);
const packageInfo = require(`../../package.json`);

module.exports = {
  name: `author`,
  description: `Shows program author`,
  execute() {
    console.log(packageInfo.author.yellow);
    process.exit(0);
  }
};
