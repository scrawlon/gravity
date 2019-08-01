const chalk = require('chalk');
const fs = require('fs');
// const fs = require('fs-extra');
// const spawn = require('cross-spawn');

const Gravity = {
  gatherParameters: require('./gatherParameters'),
  Utils: require('../../utils')
}

module.exports = async function(project) {
  const currentWorkingDirectory = process.cwd();
  let projectConfig = await Gravity.gatherParameters();
  console.log(projectConfig);
  console.log(currentWorkingDirectory);

  // // TODO: Prompt users for actual answers
  // let useWebpack = true;
  // let useGulp = false;
  // let useStarter = false;
  //
  // // ------------------------------------------------------------------------------------ //
  // // Setup install command and args
  // // ------------------------------------------------------------------------------------ //
  // let command, args;
  //
  // // The user will not be allowed to use yarn right now. So just fall back to NPM
  // command = 'npm';
  // args = ['install', '--save'];
  //
  // // Push basic packages the user will need
  // args.push('bootstrap', 'swiper', 'object-fit-images');
  //
  // // Webpack
  // if (useWebpack) {
  //   args.push('@compulse/nebula');
  // }
  //
  // // Gulp
  // if (useGulp) {
  //   args.push('@compulse/cosmos');
  // }
  //
  // // Setup boostrap starter theme Photon (Bootstrap)
  // // TODO: Add this as a dependency once Kevin completes his starter theme
  // if (useStarter) {
  //   args.push('@compulse/photon');
  // }
  //
  // // ------------------------------------------------------------------------------------ //
  // // Move template files into current working directory
  // // ------------------------------------------------------------------------------------ //
  // Gravity.Utils.spinner.text = chalk.yellow('Copying template into project directory');
  // Gravity.Utils.spinner.start();
  //
  // const testMode = Gravity.Utils.isTestMode(currentWorkingDirectory);
  // const testDirectory = testMode ? '/test' : '';
  // const appPath = `${currentWorkingDirectory}${testDirectory}/${project}`;
  // let templatePath = __dirname + '/../../template';
  //
  // if (testMode) {
  //   templatePath = `${currentWorkingDirectory}/template`;
  // }
  //
  // if (fs.existsSync(templatePath)) {
  //   fs.copySync(templatePath, appPath);
  //   Gravity.Utils.spinner.succeed('Successfully copied template into project directory');
  // } else {
  //   Gravity.Utils.spinner.fail(`Could not locate the necessary template folder: ${chalk.red(templatePath)}`);
  //   process.exit(0);
  // }
  //
  // // ------------------------------------------------------------------------------------ //
  // // Create package.json
  // // ------------------------------------------------------------------------------------ //
  // Gravity.Utils.spinner.text = chalk.yellow('Creating package.json');
  // Gravity.Utils.spinner.start();
  //
  // const spawnOptions = { stdio: 'ignore', cwd: `${currentWorkingDirectory}${testDirectory}/${project}` };
  // const npmInitStatus = spawn.sync(command, ['init', '-y'], spawnOptions);
  //
  // if (npmInitStatus.status !== 0) {
  //   console.error('Package could not be initialized');
  //   process.exit(0);
  // }
  //
  // Gravity.Utils.spinner.succeed('Successfully created package.json');
  //
  // // ------------------------------------------------------------------------------------ //
  // // Install build tools Nebula (Webpack) or Cosmos (Gulp)
  // // ------------------------------------------------------------------------------------ //
  // const buildToolName = useWebpack ? 'Webpack' : 'Gulp';
  // Gravity.Utils.spinner.text = chalk.yellow(`Installing core libraries with ${buildToolName} as the primary build tool`);
  // Gravity.Utils.spinner.start();
  // Gravity.Utils.spinner.succeed(`Successfully setup ${chalk.green(buildToolName)} as the default module bundler`);
  //
  // const npmInstallStatus = spawn.sync(command, args, spawnOptions);
  //
  // console.log(npmInstallStatus);
  //
  // if (npmInstallStatus.status !== 0) {
  //   console.error('Packages could not be installed into current project.');
  //   process.exit(0);
  // }
  //
  // return new Promise(resolve => resolve());
}
