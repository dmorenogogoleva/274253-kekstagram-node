module.exports = {
  name: `help`,
  description: `Shows available comands`,
  execute() {
    console.log(`Доступные команды: \n --help — печатает этот текст; \n --version — печатает версию приложения; \n --description — печатает описание приложения; \n --license — печатает лицензию приложения; \n --author — печатает автора приложения;`);
  }
};
