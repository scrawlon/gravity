const chalk = require('chalk');
var { spawn } = require('child_process');

const wpengine = require('../wpengine');

const Gravity = {
  Utils: require('../utils')
}

/* Use WPEngine DevKit to create project folder, install WordPress and config Docker */
module.exports = function(project) {
  return new Promise((resolve, reject) => {
    const command = wpengine.commands('create', project);
    const newProject = spawn(command[0], command.slice(1), {stdio:['inherit','pipe','pipe']});

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
        || output.toLowerCase().includes('wpe start')
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
