const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

const spinner = new ora({
  indent: 4,
  spinner: 'dots',
  text: 'Checking node version'
});

const tab = '\xa0\xa0\xa0\xa0';

/**
 * Creates the banner at the top of the terminal for branding purposes.
 */
function initialize() {
  clear();
  console.log('\n');

  console.log(
    chalk.bold.rgb(248, 76, 0)(figlet.textSync('Compulse', { font: 'ANSI Shadow', horizontalLayout: 'full' }))
  );

  console.log(chalk.bold.rgb(248, 76, 0)(`${tab}Powered by Scott™\n`));

  return new Promise(resolve => resolve());
}

/**
 * Checks to make sure that users have the latest version of node.
 */
function checkNodeVersion() {
  const currentVersion = process.versions.node;
  const semver = currentVersion.split('.');
  const currentMajorVersion = semver[0];

  spinner.start();

  if (currentMajorVersion < 8) {
    spinner.fail('Invalid node version\n');

    console.error(
      chalk.red(`${tab}You are running Node Version: ${currentMajorVersion}.\n` +
                `${tab}Compulse CLI requires Node 8 or higher.\n`+
                `${tab}Please update your version of Node.\n`
                )
    )

    process.exit(0);
  }

  return new Promise(resolve => {
    setTimeout(() => {
      spinner.succeed(`Running node version: ` + chalk.green(`${currentVersion}`));
      resolve();
    }, 1000);
  })
}

module.exports = {
  initialize: initialize,
  checkNodeVersion: checkNodeVersion,
  
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filepath) => {
    try {
      return fs.statSync(filepath).isDirectory();
    } catch (error) {
      return false
    }
  }
};