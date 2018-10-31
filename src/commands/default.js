const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generator = require(`../modules/generator`);
const logger = require(`../logger`);
require(`colors`);

const writeFile = promisify(fs.writeFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const generateData = () => {
  rl.question(`Сколько элементов хочешь создать? Введи число `.cyan, (answer) => {
    const data = generator.generateEntity(answer);

    rl.question(`Укажи путь до файла в котором ты хочешь сохранить данные `.cyan, async (path) => {
      if (fs.existsSync(path)) {
        overwriteFile(path, data);
      } else {
        writeToFile(path, data);
        rl.close();
      }
    });
  });
};

const overwriteFile = (path, data) => {
  rl.question(`Такой файл уже существует. Перезаписать? 'yes' или 'no' `.cyan, (answer) => {
    switch (answer) {
      case `yes`:
        writeToFile(path, data);
        break;
      case `no`:
        logger.info(`Не перезаписывать файл`);
        break;
      default:
        logger.error(`Нет такой команды ${answer}`);
        break;
    }
    rl.close();
  });
};

const writeToFile = async (path, data) => {
  try {
    await writeFile(path, JSON.stringify(data));
  } catch (err) {
    logger.error(err.message);
  }
};

module.exports = {
  name: `default`,
  description: `Shows default message`,
  execute() {
    rl.question(`Привет! Хочешь сгенерировать данные? 'yes' или 'no'  `.cyan, (answer) => {
      switch (answer.toLowerCase()) {
        case `yes`:
          generateData();
          break;
        case `no`:
          logger.info(`Очень жаль`);
          rl.close();
          break;
        default:
          logger.info(`До встречи`);
          rl.close();
      }
    });
  }
};
