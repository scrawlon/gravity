const chalk = require('chalk');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const wpengine = require('../wpengine');

const Gravity = {
  Utils: require('../utils')
}

module.exports = async function(project, currentWorkingDirectory) {

  // Make a new project folder directory
  await exec(`${wpengine.commands('create')} ${project}`, {
    cwd: currentWorkingDirectory
  }, (err, stdout, stderr) => {
    if ( !err ) {
      Gravity.Utils.spinner.succeed('Creating (' + chalk.green(`${project}`) + ') folder and installing WordPress');
      util.puts(stdout);
    } else {
      Gravity.Utils.spinner.fail(chalk.red(`Install directory (${project}) already exists.\n`));
      process.exit(0);
    }
  });

  // try {
  //
  // } catch (err) {
  //   Gravity.Utils.spinner.fail(chalk.red(`Install directory (${project}) already exists.\n`));
  //   process.exit(0);
  //
  // }

  // exec(`${wpengine.commands('create')} ${project}`, {
  //   cwd: currentWorkingDirectory
  // }, (err, stdout, stderr) => {
  //   if ( err ) {
  //     Gravity.Utils.spinner.fail(chalk.red(`Install directory (${project}) already exists.\n`));
  //     process.exit(0);
  //   } else {
  //     console.log('project created', stdout, '\n');
  //     Gravity.Utils.spinner.succeed('Created new project folder: ' + chalk.green(`${project}`));
  //     return new Promise(resolve => resolve());
  //   }
  // });
}
