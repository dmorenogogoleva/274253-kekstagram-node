const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generator = require(`../modules/generator`);
require(`colors`);

const writeToFile = promisify(fs.writeFile);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const generateData = () => {
  rl.question(`Сколько элементов хочешь создать? `.cyan, (answer) => {
    const data = generator.generateEntity(answer);

    rl.question(`Укажи путь до файла в котором ты хочешь сохранить данные `.cyan, (path) => {
      fs.readFile(path, `utf-8`, (err, file) => {
        if (err) {
          writeToFile(path, JSON.stringify(data));
          console.log(`Данные записаны в файл ${path}`);
          rl.close();
        }
        if (file) {
          overwriteFile(path, data);
        }
      });
    });
  });
};

const overwriteFile = (path, data) => {
  rl.question(`Такой файл уже существует. Перезаписать? `.cyan, (answer) => {
    switch (answer) {
      case `yes`:
        writeToFile(path, JSON.stringify(data));
        console.log(`Перезаписан файл ${path}`);
        break;
      case `no`:
        console.log(`Не перезаписывать файл`);
        break;
      default:
        console.log(`Нет такой команды ${answer}`);
        break;
    }
    rl.close();
  });
};

module.exports = {
  name: `default`,
  description: `Shows default message`,
  execute() {
    rl.question(`Привет! Хочешь сгенерировать данные?))00) `.cyan, (answer) => {
      switch (answer.toLowerCase()) {
        case `yes`:
          generateData();
          break;
        case `no`:
          console.log(`Очень жаль`);
          rl.close();
          break;
        default:
          console.log(`До встречи`);
          rl.close();
      }
    });
  }
};
