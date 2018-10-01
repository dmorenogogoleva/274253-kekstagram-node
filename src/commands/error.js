require(`colors`);

module.exports = {
  name: `error`,
  description: `Shows error message`,
  execute(message) {
    console.error(`Неизвестная команда ${message.red} \nЧтобы прочитать правила использования приложения, наберите ${`"--help"`.green}`);
  }
};
