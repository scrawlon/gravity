const chalk = require('chalk');
const fs = require('fs-extra');
var { spawn } = require('child_process');

const wpengine = require('../wpengine');

const Gravity = {
  Utils: require('../utils')
}

module.exports = function(project, currentWorkingDirectory) {
  return new Promise((resolve, reject) => {
    let newProject = spawn('wpe', ['projects', 'new', project], { stdio: [0, 1 ,2] });

    newProject.stdout.on('data', (data) => {
      var output = data.toString();
      var error = output.toLowerCase().includes('error');

      if ( !error ) {
        Gravity.Utils.spinner.succeed(output);
      } else {
        let message = output.includes('exists')
          ? `Install directory (${project}) already exists.\n`
          : output;

        Gravity.Utils.spinner.fail(chalk.red(message));
        process.exit(0);
      }
    });

    newProject.on('exit', (data) => {
      var output = data.toString();

      Gravity.Utils.spinner.succeed(chalk.yellow(output));
      resolve();
    });

    newProject.stderr.on('data', (data) => {
      var output = data.toString();
      var error = output.toLowerCase().includes('error');

      Gravity.Utils.spinner.fail(chalk.red(output));
      process.exit(0);
    });
  });
}
