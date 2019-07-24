const chalk = require('chalk');
const fs = require('fs-extra');
var { spawn } = require('child_process');

const wpengine = require('../wpengine');

const Gravity = {
  Utils: require('../utils')
}

module.exports = function(project, currentWorkingDirectory) {
  return new Promise((resolve, reject) => {
    let newProject = spawn('wpe', ['projects', 'new', project], {stdio:['inherit','pipe','pipe']});

    newProject.stdout.on('data', (data) => {
      wpeMessage(project, data);
    });

    newProject.stderr.on('data', (data) => {
      wpeMessage(project, data);
    });

    newProject.on('close', (data) => {
      var output = data.toString();

      Gravity.Utils.spinner.succeed(chalk.yellow(output));
      resolve();
    });
  });
}

function wpeMessage(project, data) {
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
}
