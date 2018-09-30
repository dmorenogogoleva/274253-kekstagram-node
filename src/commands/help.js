require(`colors`);

module.exports = {
  name: `help`,
  description: `Shows available comands`,
  execute() {
    console.log(`Доступные команды: \n ${`--help`.gray} — ${`печатает этот текст`.green}; \n ${`--version`.gray} — ${`печатает версию приложения`.green}; \n ${`--description`.gray} — ${`печатает описание приложения`.green}; \n ${`--license`.gray} — ${`печатает лицензию приложения`.green}; \n ${`--author`.gray} — ${`печатает автора приложения`.green};`);
  }
};
