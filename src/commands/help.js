require(`colors`);

const COMMANDS = [
  {label: `help`, description: `этот текст`},
  {label: `version`, description: `версию приложения`},
  {label: `description`, description: `описание приложения`},
  {label: `license`, description: `лицензию приложения`},
  {label: `author`, description: `автора приложения`}
];

module.exports = {
  name: `help`,
  description: `Shows available comands`,
  execute() {
    console.log(`Доступные команды:\n${COMMANDS.map((cmd) => `\n--${cmd.label.gray} — ${`печатает ${cmd.description}`.green}`).join(``)}`);
  }
};
