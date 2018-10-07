const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generator = require(`../modules/generator`);
require(`colors`);

const writeToFile = promisify(fs.writeFile);

module.exports = {
  name: `default`,
  description: `Shows default message`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Привет! Хочешь сгенерировать данные?))00)`.cyan, (answer) => {
      switch (answer.toLowerCase()) {
        case `yes`:
          rl.question(`Сколько элементов хочешь создать?`.cyan, (ans) => {
            const data = generator.generateEntity(ans);
            rl.question(`Укажи путь до файла в котором ты хочешь сохранить данные`.cyan, (path) => {
              writeToFile(path, JSON.stringify(data));
              rl.close();
            });
          });
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
