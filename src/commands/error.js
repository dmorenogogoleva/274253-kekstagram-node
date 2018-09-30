module.exports = {
  name: `error`,
  description: `Shows error message`,
  execute(message) {
    console.error(`Неизвестная команда ${message}. \nЧтобы прочитать правила использования приложения, наберите "--help"`);
  }
};
