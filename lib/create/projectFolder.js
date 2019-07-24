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
      resolve();
    });
  });
}

function wpeMessage(project, data) {
  var output = data.toString();
  var error = output.toLowerCase().includes('error');

  if ( !error ) {
    let message = output.toLowerCase().includes('your site is ready')
      ? '\n'
      : output;
    process.stdin.write(message);
  } else {
    let message = output.toLowerCase().includes('exists')
      ? `Install directory (${project}) already exists.\n`
      : output;

    Gravity.Utils.spinner.fail(chalk.red(message));
    process.exit(0);
  }
}
