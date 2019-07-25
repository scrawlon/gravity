const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const os = require('os');

const Gravity = {
  Utils: require('../utils')
}

async function start(project) {
  let currentWorkingDirectory = process.cwd();

  // ------------------------------------------------------------------------------------ //
  // Ensure that gravity is not being run within its own directory
  // ------------------------------------------------------------------------------------ //
  const testMode = Gravity.Utils.isTestMode(currentWorkingDirectory);

  if ( testMode ) {
    createTestFolder(currentWorkingDirectory, project);
    currentWorkingDirectory += '/test';
  }

  // ------------------------------------------------------------------------------------ //
  // Create project folder phase
  // ------------------------------------------------------------------------------------ //
  await require('./projectFolder')(project);

  // ------------------------------------------------------------------------------------ //
  // Prompt user for Build Tools and JS preference
  // ------------------------------------------------------------------------------------ //
  await require('./userConfig')(project);

  // ------------------------------------------------------------------------------------ //
  // Move theme files into current working directory
  // ------------------------------------------------------------------------------------ //
  Gravity.Utils.spinner.text = chalk.yellow('Copying theme files into project folder');
  Gravity.Utils.spinner.start();
  Gravity.Utils.spinner.succeed(`Successfully copied theme files into the project folder`);

  // ------------------------------------------------------------------------------------ //
  // Setup NPM scripts to run build tool i.e. 'nebula start'
  // ------------------------------------------------------------------------------------ //
  Gravity.Utils.spinner.text = chalk.yellow('Setting up package.json scripts');
  Gravity.Utils.spinner.start();

  const buildTool = useWebpack ? 'nebula' : 'cosmos';
  const packageJSONpath = path.join(currentWorkingDirectory, project, 'package.json');
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

  Gravity.Utils.spinner.succeed(`Successfully setup scripts in package.json`);

  // ------------------------------------------------------------------------------------ //
  // Generate pipelines.yml file
  // ------------------------------------------------------------------------------------ //
  Gravity.Utils.spinner.text = chalk.yellow('Generating pipelines.yml file');
  Gravity.Utils.spinner.start();
  Gravity.Utils.spinner.succeed(`Generated pipelines.yml file`);

  // ------------------------------------------------------------------------------------ //
  // Create a README.md
  // ------------------------------------------------------------------------------------ //
  Gravity.Utils.spinner.text = chalk.yellow('Creating README.md file');
  Gravity.Utils.spinner.start();
  Gravity.Utils.spinner.succeed(`Created README.md file`);

  // ------------------------------------------------------------------------------------ //
  // Verify successful installation
  // ------------------------------------------------------------------------------------ //
  Gravity.Utils.spinner.text = chalk.yellow('Validating new project installation');
  Gravity.Utils.spinner.start();
  Gravity.Utils.spinner.succeed(`Project validation successfully completed`);
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

function createTestFolder(currentWorkingDirectory, project) {
  try {
    Gravity.Utils.spinner.succeed('Gravity running in TEST mode.\n' +
                                  'Project will be installed in ./test/' + chalk.green(`${project}`));
    fs.mkdirSync(`${currentWorkingDirectory}/test`, { recursive: true });
  } catch (err) {
    Gravity.Utils.spinner.fail(chalk.red('Create test directory failed with error: ' + err));
    process.exit(0);
  }
}
// function checkGitInit(projectPath) {
//   let gitInit = false;

//   try {
//     execSync('git --version', { stdio: 'ignore' });

//   } catch (e) {

//   }
// }

module.exports = start;
