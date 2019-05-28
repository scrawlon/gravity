const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const os = require('os');

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

  // Prompt user for Build Tools and JS preference
  // TODO: Prompt users for actual answers
  let useWebpack = true;
  let useGulp = false;

  // Setup install command and args
  let command, args;

  // The user will not be allowed to use yarn right now. So just fall back to NPM
  command = 'npm';
  args = ['install', '--save'];

  // Push basic packages the user will need
  args.push('bootstrap', 'swiper', 'object-fit-images');

  // Webpack
  if (useWebpack) {
    args.push('@compulse/nebula');
  }

  // Gulp
  if (useGulp) {
    args.push('@compulse/cosmos');
  }

  // Setup boostrap starter theme Photon (Bootstrap)
  args.push('@compulse/photon');

  // Create package.json
  console.log(chalk.yellow('Creating package.json.'));
  // const npmInitStatus = spawn.sync(command, ['init', '-y'], { stdio: 'inherit' });

  // if (npmInitStatus !== 0) {
  //   console.error('Package could not be initialized');
  //   return;
  // }

  // Install build tools Nebula (Webpack) or Cosmos (Gulp)
  console.log(chalk.yellow(`Installing core libraries with ${useWebpack ? 'Webpack' : 'Gulp'} as the primary build tool.`));
  // const npmInstallStatus = spawn.sync(command, args, { stdio: 'inherit' });

  // if (npmInstallStatus !== 0) {
  //   console.error('Packages could not be installed into current project.');
  //   return;
  // }

  // Move template files into current working directory
  console.log(chalk.yellow('Copying template into current working directory.'));
  const templatePath = '';

  // Move theme files into current working directory

  // Setup NPM scripts to run build tool i.e. 'nebula start'
  const buildTool = useWebpack ? 'nebula' : 'cosmos';
  const packageJSON = require(path.join(currentWorkingDirectory, 'package.json'));
  console.log(packageJSON.scripts);

  packageJSON.scripts = {
    start: `${buildTool} start`,
    test: `${buildTool} test`,
    buid: `${buildTool} build`
  };

  fs.writeFileSync(
    path.join(currentWorkingDirectory, 'package.json'),
    JSON.stringify(packageJSON, null, 2) + os.EOL
  );

  // Generate pipelines.yml file
  // Create a README.md
  
  // Successful completion output and how to start
}

function checkGitInit(projectPath) {
  let gitInit = false;

  try {
    execSync('git --version', { stdio: 'ignore' });

  } catch (e) {

  }
}

module.exports = start;
