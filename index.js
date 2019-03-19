const chalk = require('chalk');
const program = require('commander');

const start = require('./lib/start');
const files = require('./lib/files');

program
  .version('0.1.0')
  .option('create <project>', 'Create')
  .parse(process.argv);

// console.log(process.argv);
// console.log(program.create);

start.checkNodeVersion();
start.initialize();

if (program.create !== undefined) {
  if (files.directoryExists(program.create)) {
    console.log(chalk.red('There is already a directory that exists for: ' + program.create));
    process.exit();
  } else {
    console.log(chalk.green('Creating new project directory...'));
  }
} else {

}
