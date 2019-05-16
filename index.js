#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const Gravity = require('./lib');

/**
 * This is the core of the CLI. This creates all the commands necessary to handle the user input.
 */
program
  .version('0.1.0')
  .option('create <project>', 'Create')
  .option('start', 'Start local docker container and watch files for changes')
  .option('build', '')
  .option('deploy', '')
  .option('-v, --version', 'Check version')
  .parse(process.argv);

/**
 * Check to see if the user did not pass any parameters at all. Something is required.
 */
if (process.argv.length <= 2) {
  console.log('Please specify a project directory to create:');
  console.log(chalk.yellow('\xa0\xa0gravity create ') + chalk.green('<project-directory>\n'));
  console.log('For example:');
  console.log(chalk.yellow('\xa0\xa0gravity create ') + chalk.green('compulse-integrated-marketing\n'));
  console.log('If you need additional help run ' + chalk.yellow('gravity help') + ' to see all available options.');
}

/**
 * CREATE: This command creates a new installation on the users local filesystem and bootstraps a development environment
 * based on a questionnaire.
 */
if (program.create !== undefined) {
  const create = async () => {
    await Gravity.Utils.initialize();
    await Gravity.Utils.checkNodeVersion();
    await Gravity.Create(program.create);
  };

  create();
}
