const readline = require(`readline`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generator = require(`../modules/generator`);
require(`colors`);

const writeToFile = promisify(fs.writeFile);

/* eslint-disable max-nested-callbacks */

module.exports = {
  name: `default`,
  description: `Shows default message`,
  execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`Привет! Хочешь сгенерировать данные?))00) `.cyan, (answer) => {
      switch (answer.toLowerCase()) {
        case `yes`:
          rl.question(`Сколько элементов хочешь создать? `.cyan, (ans) => {
            const data = generator.generateEntity(ans);
            rl.question(`Укажи путь до файла в котором ты хочешь сохранить данные `.cyan, (path) => {
              fs.readFile(path, `utf-8`, (err, file) => {
                if (err) {
                  writeToFile(path, JSON.stringify(data));
                  rl.close();
                }
                if (file) {
                  rl.question(`Такой файл уже существует. Перезаписать? `.cyan, (answ) => {
                    switch (answ) {
                      case `yes`:
                        writeToFile(path, JSON.stringify(data));
                        console.log(`Перезаписан файл ${path}`);
                        rl.close();
                        break;
                      case `no`:
                        console.log(`Не перезаписывать файл`);
                        rl.close();
                        break;
                      default:
                        console.log(`Нет такой команды`);
                        rl.close();
                        break;
                    }
                  });
                }
              });
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
