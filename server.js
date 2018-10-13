const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const pathUtil = require(`path`);
const {promisify} = require(`util`);

const HOSTNAME = `127.0.0.1`;
const PORT = process.argv[2] || 3000;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const readfile = promisify(fs.readFile);

const server = http.createServer((req, res) => {
  const localPath = url.parse(req.url).pathname;
  const absolutePath = `${__dirname}/static/${localPath}`;

  (async () => {
    try {
      const pathStat = await stat(absolutePath);
      console.log(pathStat);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, localPath, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`
    });
    res.end(e.message);
  });
});

const readDir = async (path, relativePath, res) => {
  const files = await readdir(path);
  res.setHeader(`content-type`, `text/html`);
  res.end(printDirectory(path, relativePath, files));
};

const readFile = async (path, res) => {
  const data = await readfile(path);
  const contentType = getConentType(path);

  res.setHeader(`content-type`, contentType);
  res.end(data);
};

const printDirectory = (path, relativePath, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${relativePath}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const getConentType = (path) => {
  const extName = pathUtil.extname(path);

  let contentType;

  switch (extName) {
    case `.css`:
      contentType = `text/css`;
      break;
    case `.html`:
      contentType = `text/html; charset=UTF-8`;
      break;
    case `.jpg`:
      contentType = `image/jpeg`;
      break;
    case `.png`:
      contentType = `image/png`;
      break;
    case `.gif`:
      contentType = `image/gif`;
      break;
    case `.ico`:
      contentType = `image/x-icon`;
      break;
    default:
      contentType = `text-html`;
      break;
  }

  return contentType;
};

server.listen(PORT, HOSTNAME, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});
