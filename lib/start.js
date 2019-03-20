const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

function initialize() {
  clear();
  console.log('\n');

  console.log(
    chalk.bold.rgb(248, 76, 0)(figlet.textSync('Compluse', { font: 'ANSI Shadow', horizontalLayout: 'full' }))
  );

  console.log(chalk.bold.rgb(248, 76, 0)(`    Powered by Scott™\n`));
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

function gatherParameters() {
  const defaultUsername = 'duynguye';

  inquirer.prompt([
    {
      type: 'input',
      name: 'install',
      message: 'What is the install name?',
      validate: (input) => {
        let answer = input.trim();

        if (answer === '') {
          return "Install name cannot be blank";
        }

        if (answer.length < 9) {
          return "Install name is too short";
        }

        if (!isNaN(answer)) {
          return "Please enter a valid install name";
        }

        return true;
      }
    }, {
      type: 'list',
      name: 'js',
      message: 'JavaScript style?',
      choices: ['ES6', 'jQuery', 'Vanilla']
    }, {
      type: 'input',
      name: 'username',
      message: `Bitbucket Username: `,
      default: () => {
        return defaultUsername;
      }
    }
  ]).then(answers => {
    console.log(answers);
  });
}

module.exports = {
  initialize: initialize,
  checkNodeVersion: checkNodeVersion,
  gatherParameters: gatherParameters
};
