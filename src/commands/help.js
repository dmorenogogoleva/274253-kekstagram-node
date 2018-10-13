require(`colors`);

const COMMANDS = [
  {label: `help`, description: `печатает этот текст`},
  {label: `version`, description: `печатает версию приложения`},
  {label: `description`, description: `печатает описание приложения`},
  {label: `license`, description: `печатает лицензию приложения`},
  {label: `author`, description: `печатает автора приложения`},
  {label: `server`, description: `запускает сервер`}
];

module.exports = {
  name: `help`,
  description: `Shows available comands`,
  execute() {
    console.log(`Доступные команды:\n${COMMANDS.map((cmd) => `\n--${cmd.label.gray} — ${` ${cmd.description}`.green}`).join(``)}`);
    process.exit(0);
  }
};
