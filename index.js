const version = require(`./src/version`);
const description = require(`./src/description`);
const license = require(`./src/license`);
const author = require(`./src/author`);
const help = require(`./src/help`);
const error = require(`./src/error`);
const defaultMessage = require(`./src/default`);

switch (process.argv[2]) {
  case `--version`:
    version.execute();
    process.exit(0);
    break;
  case `--description`:
    description.execute();
    process.exit(0);
    break;
  case `--license`:
    license.execute();
    process.exit(0);
    break;
  case `--author`:
    author.execute();
    process.exit(0);
    break;
  case `--help`:
    help.execute();
    process.exit(0);
    break;
  case undefined:
    defaultMessage.execute();
    process.exit(0);
    break;
  default:
    error.execute(process.argv[2]);
    process.exit(1);
    break;
}
