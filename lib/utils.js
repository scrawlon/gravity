const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const ora = require('ora');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const spinner = new ora({
  indent: 4,
  spinner: 'dots'
});

const dependencies = require('./dependencies');

const tab = '\xa0\xa0\xa0\xa0';

function getCurrentWorkingDirectory(project) {
  const currentWorkingDirectory = process.cwd();

  /* Create test folder if invoked from main Gravity library directory */
  if ( isTestMode(currentWorkingDirectory) ) {
    createTestFolder(currentWorkingDirectory, project);

    return `${currentWorkingDirectory}${path.sep}test`;
  }

  return currentWorkingDirectory;
}

function createTestFolder(currentWorkingDirectory, project) {
  try {
    spinner.succeed('Gravity running in TEST mode.\n' +
                                  'Project will be installed in ./test/' + chalk.green(`${project}`));
    fs.mkdirSync(`${currentWorkingDirectory}${path.sep}test`, { recursive: true });
  } catch (err) {
    spinner.fail(chalk.red('Create test directory failed with error: ' + err));
    process.exit(0);
  }
}

/**
 * Creates the banner at the top of the terminal for branding purposes.
 */
function initialize() {
  clear();
  console.log('\n');

  console.log(
    chalk.bold.rgb(248, 76, 0)(figlet.textSync('Compulse', { font: 'ANSI Shadow', horizontalLayout: 'full' }))
  );

  console.log(chalk.bold.rgb(248, 76, 0)(`${tab}Powered by Scott™\n`));

  return new Promise(resolve => resolve());
}


/**
 * Checks to make sure that users have all required dependencies to run Create command
 */
function checkDependencies() {
  const dependencyTypes = Object.keys(dependencies);

  spinner.text = 'Verifying Gravity dependencies.';
  spinner.start();

  dependencyTypes.forEach(function(dependencyType) {
    const dependency = dependencies[dependencyType];

    /* Check that dependency is installed */
    exec(`which ${dependency.command}`, (err, stdout, stderr) => {
      if ( err ) {
        spinner.fail(`${dependency.name} not installed\n`);

        console.error(
          chalk.red(`${tab}Install ${dependency.name} ${dependency.versionMin} or higher now.\n`)
        )

        process.exit(0);
      }
    });

    /* Check that the installed dependency version meets Gravity's requirements */
    exec(`${dependency.command} ${dependency.versionCheck}`, (err, stdout, stderr) => {
      const majorVersion = stdout ? stdout.replace(/[a-zA-Z]/g, '').split('.')[0] : 0;

      if ( err || majorVersion < dependency.versionMin) {
        spinner.fail(`${tab}Gravity requires ${dependency.name} v${dependency.versionMin} or higher.\n`);

         console.error(
           chalk.red(`${tab}Please update your version of ${dependency.name}.\n`)
         )

         process.exit(0);
      }
    });

  });

  return new Promise(resolve => {
    setTimeout(() => {
      spinner.succeed('Verified Dependencies.');
      resolve();
    }, 1000);
  })
}

function getTempDirectory(project) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `gravity-${project}-`), (err, folder) => {
    if (err) {
      Gravity.Utils.spinner.fail(chalk.red('Could not create temp directory: ' + err));
      process.exit(0);
    };
  });
}

function saveProjectConfig(projectConfig, tempDirectory) {
  const jsonString = JSON.stringify(projectConfig);

  fs.writeFile(`${tempDirectory}${path.sep}config.json`, jsonString, 'utf8', (err) => {
    if (err) {
      Gravity.Utils.spinner.fail(chalk.red('Could not create config file: ' + err));
      process.exit(0);
    };
  })
}

function isTestMode(currentWorkingDirectory) {
  const currentPackageDirectory = path.join(__dirname, '../');

  return currentPackageDirectory === `${currentWorkingDirectory}${path.sep}`;
}

module.exports = {
  tab,
  spinner,
  getCurrentWorkingDirectory,
  initialize,
  checkDependencies,
  getTempDirectory,
  saveProjectConfig,

  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filepath) => {
    try {
      return fs.statSync(filepath).isDirectory();
    } catch (error) {
      return false
    }
  }
};
