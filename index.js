switch (process.argv[2]) {
  case `--version`:
    console.log(`v0.0.1`);
    process.exit(0);
    break;
  case `--help`:
    console.log(`Доступные команды: \n --help — печатает этот текст; \n --version — печатает версию приложения;`);
    process.exit(0);
    break;
  default:
    console.log(`Привет! Эта программа будет запускать сервер кекстаграма`);
    console.error(`Неизвестная команда ${process.argv[2]}. \n Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
    break;
}
