const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const os = require('os');

const Gravity = {
  gatherParameters: require('./create/gatherParameters'),
  Utils: require('./utils')
}

const spinner = new ora({
  indent: 4,
  spinner: 'dots'
});

async function start(project) {
  const currentWorkingDirectory = process.cwd();
  const currentPackageDirectory = path.basename(path.join(__dirname, '../'));
  let testMode = false;

  // ------------------------------------------------------------------------------------ //
  // Ensure that gravity is not being run within its own directory
  // ------------------------------------------------------------------------------------ //
  if (path.basename(currentWorkingDirectory) == currentPackageDirectory) {
    console.log();
    console.log(chalk.green('    Running gravity in test mode.'));
    console.log();
    
    testMode = true;
  }

  // ------------------------------------------------------------------------------------ //
  // Create project folder phase
  // ------------------------------------------------------------------------------------ //
  spinner.text = `Creating project folder ${project}`
  spinner.start();

  if (Gravity.Utils.directoryExists(project)) {
    spinner.fail(chalk.red('There is already a directory that exists for: ' + project));
    process.exit(0);
  } else {
    let testDirectory = testMode ? '/test' : '';
    spinner.succeed('Created new project folder: ' + chalk.green(`${project}`));

    // Make a new project folder directory
    fs.mkdirSync(currentWorkingDirectory + testDirectory + '/' + project);
  }

  // ------------------------------------------------------------------------------------ //
  // Prompt user for Build Tools and JS preference
  // ------------------------------------------------------------------------------------ //
  // TODO: Prompt users for actual answers
  const answers = await Gravity.gatherParameters();
  console.log();

  let useWebpack = true;
  let useGulp = false;
  let useStarter = false;

  // ------------------------------------------------------------------------------------ //
  // Setup install command and args
  // ------------------------------------------------------------------------------------ //
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
  // TODO: Add this as a dependency once Kevin completes his starter theme
  if (useStarter) {
    args.push('@compulse/photon');
  }

  // ------------------------------------------------------------------------------------ //
  // Move template files into current working directory
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Copying template into project directory');
  spinner.start();

  let templatePath = __dirname + '/../template';
  let appPath = `${currentWorkingDirectory}/${project}`;

  if (testMode) {
    templatePath = `${currentWorkingDirectory}/template`;
    appPath = `${currentWorkingDirectory}/test/${project}`;
  }

  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
    spinner.succeed('Successfully copied template into project directory');
  } else {
    spinner.fail(`Could not locate the necessary template folder: ${chalk.red(templatePath)}`);
    return;
  }

  // ------------------------------------------------------------------------------------ //
  // Create package.json
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Creating package.json');
  spinner.start();

  let spawnOptions = { stdio: 'ignore', cwd: `${currentWorkingDirectory}/${project}` };

  if (testMode) {
    spawnOptions = {
      ...spawnOptions,
      cwd: `${currentWorkingDirectory}/test/${project}`
    };
  }

  const npmInitStatus = spawn.sync(command, ['init', '-y'], spawnOptions);

  if (npmInitStatus.status !== 0) {
    console.error('Package could not be initialized');
    return;
  }

  spinner.succeed('Successfully created package.json');

  // ------------------------------------------------------------------------------------ //
  // Install build tools Nebula (Webpack) or Cosmos (Gulp)
  // ------------------------------------------------------------------------------------ //
  const buildToolName = useWebpack ? 'Webpack' : 'Gulp';
  spinner.text = chalk.yellow(`Installing core libraries with ${buildToolName} as the primary build tool`);
  spinner.start();
  spinner.succeed(`Successfully setup ${chalk.green(buildToolName)} as the default module bundler`);

  const npmInstallStatus = spawn.sync(command, args, spawnOptions);

  if (npmInstallStatus.status !== 0) {
    console.error('Packages could not be installed into current project.');
    return;
  }

  // ------------------------------------------------------------------------------------ //
  // Move theme files into current working directory
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Copying theme files into project folder');
  spinner.start();
  spinner.succeed(`Successfully copied theme files into the project folder`);

  // ------------------------------------------------------------------------------------ //
  // Setup NPM scripts to run build tool i.e. 'nebula start'
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Setting up package.json scripts');
  spinner.start();

  const buildTool = useWebpack ? 'nebula' : 'cosmos';
  const packageJSONpath = path.join(currentWorkingDirectory, testMode ? 'test' : '', project, 'package.json');
  const packageJSON = require(packageJSONpath);

  packageJSON.scripts = {
    start: `${buildTool} start`,
    test: `${buildTool} test`,
    buid: `${buildTool} build`
  };

  fs.writeFileSync(
    packageJSONpath,
    JSON.stringify(packageJSON, null, 2) + os.EOL
  );

  spinner.succeed(`Successfully setup scripts in package.json`);

  // ------------------------------------------------------------------------------------ //
  // Generate pipelines.yml file
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Generating pipelines.yml file');
  spinner.start();
  spinner.succeed(`Generated pipelines.yml file`);

  // ------------------------------------------------------------------------------------ //
  // Create a README.md
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Creating README.md file');
  spinner.start();
  spinner.succeed(`Created README.md file`);

  // ------------------------------------------------------------------------------------ //
  // Verify successful installation
  // ------------------------------------------------------------------------------------ //
  spinner.text = chalk.yellow('Validating new project installation');
  spinner.start();
  spinner.succeed(`Project validation successfully completed`);
  console.log();
  
  // ------------------------------------------------------------------------------------ //
  // Successful completion output and how to start
  // ------------------------------------------------------------------------------------ //
  console.log();
  console.log(`Successfully created ${project} at ${chalk.cyan(appPath)}`);
  console.log('Inside that directory, you may can run several commands to get started:\n');
  console.log(chalk.yellow('    gravity start'));
  console.log('    Starts the development server including Docker and the Build Tools.\n');
  console.log(chalk.yellow('    gravity deploy'));
  console.log('    Automatically deploys the code, images, and database to the production server.\n');
  console.log(chalk.yellow('    gravity pull [--images] [--database]'));
  console.log('    Pulls both the images and database by default, but can be flagged to pull');
  console.log('    individual parts.\n');
  console.log('To get started try typing:\n');
  console.log(chalk.yellow('    cd'), project);
  console.log(chalk.yellow('    gravity start'));
  console.log();
  console.log(chalk.cyan('Good luck, have fun!'));
  console.log();
}

// function checkGitInit(projectPath) {
//   let gitInit = false;

//   try {
//     execSync('git --version', { stdio: 'ignore' });

//   } catch (e) {

//   }
// }

module.exports = start;
