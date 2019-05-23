const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');

const Gravity = {
  Utils: require('./utils')
}

const spinner = new ora({
  indent: 4,
  spinner: 'dots'
});

function start(project) {
  const currentWorkingDirectory = process.cwd();

  // Create project folder phase
  spinner.text = `Creating project folder ${project}`
  spinner.start();

  if (Gravity.Utils.directoryExists(project)) {
    spinner.fail(chalk.red('There is already a directory that exists for: ' + project));
    process.exit(0);
  } else {
    spinner.succeed('Created new project folder: ' + chalk.green(`${project}\n`));
    fs.mkdirSync(currentWorkingDirectory + '/' + project);
  }

  // Move template files into current working directory
  
}

module.exports = start;
