#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const ora = require('ora');
const portfinder = require('portfinder');

const start = require('./lib/start');
const files = require('./lib/files');
const spinner = ora({
  text: 'Testing',
  indent: 4
});

setTimeout(() => {
  portfinder.getPortPromise()
    .then(port => {
      spinner.succeed(`Port found at ${port}`);
      console.log('\n');
      start.gatherParameters();
    }).catch(err => console.error(err));
}, 1000);

program
  .version('0.1.0')
  .option('create <project>', 'Create')
  .parse(process.argv);

// console.log(process.argv);
// console.log(program.create);

start.checkNodeVersion();
start.initialize();
spinner.start();


if (program.create !== undefined) {
  if (files.directoryExists(program.create)) {
    console.log(chalk.red('There is already a directory that exists for: ' + program.create));
    process.exit();
  } else {
    console.log(chalk.green('Creating new project directory...'));
  }
} else {

}
