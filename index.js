const chalk = require("chalk");
const boxen = require("boxen");
const { Observable } = require("rxjs");
const Listr = require("listr");
const program = require("commander");
const takeScreenshot = require("./src/main");

(async () => {
  program
    .option("-p, --port <port> (defaults to 3333)", "localhost port", parseInt)
    .option(
      "-u, --url <url> (defaults to localhost)",
      "url of webpage, if url is passed, port is ignored"
    );

  program.parse(process.argv);

  let url;

  if (program.port) {
    url = `http://localhost:${program.port}/`;
  }

  if (program.url) {
    url = program.url;
  }

  if (!url) {
    url = `http://localhost:3333/`;
  }

  console.log(chalk.green(boxen("starting", { padding: 1, margin: 2 })));

  const tasks = new Listr([
    {
      title: chalk.white.italic("working..."),
      task: () => {
        return new Observable(observer => {
          takeScreenshot(url, observer).catch(err => {
            observer.error(err);
          });
        });
      }
    }
  ]);

  try {
    await tasks.run();
    console.log(chalk.green(boxen("  done  ", { padding: 1, margin: 2 })));
  } catch (_) {
    process.exit();
  }
})();
