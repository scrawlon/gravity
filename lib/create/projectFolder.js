const chalk = require('chalk');
const fs = require('fs-extra');

const Gravity = {
  Utils: require('../utils')
}

module.exports = function(project, currentWorkingDirectory) {
  const testDirectory = Gravity.Utils.isTestMode(currentWorkingDirectory) ? '/test' : '';
  if ( Gravity.Utils.isTestMode(currentWorkingDirectory) ) {
    console.log('test mode');
  }

  if (Gravity.Utils.directoryExists(project)) {
    Gravity.Utils.spinner.fail(chalk.red('There is already a directory that exists for: ' + project));
    process.exit(0);
  }

  // Make a new project folder directory
  try {
    Gravity.Utils.spinner.succeed('Created new project folder: ' + chalk.green(`${project}`));
    fs.mkdirSync(currentWorkingDirectory + testDirectory + '/' + project, { recursive: true });
  } catch (err) {
    Gravity.Utils.spinner.fail(chalk.red('Create directory failed with error: ' + err));
    process.exit(0);
  }
}
