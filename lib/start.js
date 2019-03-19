const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

function initialize() {
  clear();
  console.log('\n');

  console.log(
    chalk.bold.rgb(248, 76, 0)(figlet.textSync('Compluse', { font: 'ANSI Shadow', horizontalLayout: 'full' }))
  );

  console.log(chalk.bold.rgb(248, 76, 0)('\tPowered by Scott™\n\n\n'));
}

function checkNodeVersion() {
  const currentVersion = process.versions.node;
  const semver = currentVersion.split('.');
  const currentMajorVersion = semver[0];

  if (currentMajorVersion < 8) {
    console.error(
      chalk.red(`You are running Node Version: ${currentMajorVersion}.\n` +
                `Compulse CLI requires Node 8 or higher.\n`+
                `Please update your version of Node.\n`
                )
    )

    process.exit(1);
  }
}

module.exports = {
  initialize: initialize,
  checkNodeVersion: checkNodeVersion
};
