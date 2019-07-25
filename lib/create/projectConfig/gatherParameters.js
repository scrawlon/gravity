const inquirer = require('inquirer');

const wpengine = require('../../wpengine');

const Gravity = {
  Utils: require('../../utils')
}

module.exports = function gatherParameters() {
  let installExists;

  return new Promise((resolve, reject) => {
    console.log();

    inquirer.prompt([
      {
        type: 'input',
        name: 'install',
        message: 'What is the install name?',
        validate: (input) => {
          let answer = input.trim();
          const validNameChars = /^[\w]*$/.test(answer);

          if (answer === '') {
            return "Install name cannot be blank";
          }

          if (answer.length < 9) {
            return "Install name is too short";
          }

          if (!validNameChars) {
            return "Install name can only contain letters/numbers";
          }

          if (!isNaN(answer)) {
            return "Please enter a valid install name";
          }

          return true;
        }
      }, {
        type: 'confirm',
        name: 'installConfirmed',
        message: async (response) => {
          installExists = await wpengine.doesInstallExist(response.install);

          if ( installExists ) {
            return `${response.install}.wpengine.com already exists. Use that?`;
          } else {
            return `${response.install}.wpengine.com is available. Create new install?`;
          }
        },
        when: async (response) => {
          return response.install;
        }
      }, {
        type: 'confirm',
        name: 'installDenied',
        message: (response) => {
          Gravity.Utils.spinner.fail(`You'll need to start over and select a valid install name.`);
          process.exit(0);
        },
        when: (response) => {
          return !response.installConfirmed;
        }
      }, {
        type: 'confirm',
        name: 'starter',
        message: 'Use the starter theme?',
      }, {
        type: 'list',
        name: 'buildtool',
        message: 'Preferred Build Tool?',
        choices: ['Webpack', 'Gulp']
      }, {
        type: 'list',
        name: 'js',
        message: 'JavaScript style?',
        choices: ['ES6', 'jQuery', 'Vanilla'],
        when: function (response) {
          return response.buildtool == 'Webpack';
        }
      }
    ]).then(answers => {
      answers.installExists = installExists;

      resolve(answers);
    });
  })
}
