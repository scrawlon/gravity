const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');

const Gravity = {
  Utils: require('./utils')
}

const spinner = new ora({
  indent: 4,
  spinner: 'dots'
});

console.log(Gravity);

function start(project) {
  spinner.text = `Creating project folder ${project}`
  spinner.start();

  if (Gravity.Utils.directoryExists(project)) {
    spinner.fail(chalk.red('There is already a directory that exists for: ' + project));
    process.exit(0);
  } else {
    spinner.succeed('Created new project folder: ' + chalk.green(`${project}\n`));
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

module.exports = start;
