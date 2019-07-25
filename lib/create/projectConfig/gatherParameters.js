const { exec } = require('child_process');
const inquirer = require('inquirer');

const Gravity = {
  Utils: require('../../utils')
}

module.exports = function gatherParameters() {
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
        name: 'useInstall',
        message: async (response) => {
          const installExists = await doesInstallExist(response.install);

          if ( installExists ) {
            return `${response.install}.wpengine.com already exists. Use that?`;
          } else {
            return `${response.install}.wpengine.com is available. Create new install?`;
          }
        },
        when: async (response) => {
          return response.install;
        }
        // when: async (response) => {
        //   return await doesInstallExist(response.install);
        // }
      // }, {
      //   type: 'confirm',
      //   name: 'existing',
      //   message: (response) => {
      //     return false;
      //   },
      //   when: async (response) => {
      //     return !response.existing;
      //   }
      }, {
        type: 'confirm',
        name: 'installTaken',
        message: (response) => {
          Gravity.Utils.spinner.fail(`You'll need to start over and select a valid install name.`);
          process.exit(0);
        },
        when: (response) => {
          return !response.useInstall;
        }
      }, {
        type: 'confirm',
        name: 'starter',
        message: 'Use the starter theme?',
        when: function (response) {
          return response.existing;
        }
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
      // }, {
      //   type: 'input',
      //   name: 'username',
      //   message: `Bitbucket Username: `,
      //   default: () => {
      //     return defaultUsername;
      //   }
      // }, {
      //   type: 'password',
      //   name: 'password',
      //   message: 'Bitbucket Password: ',
      //   mask: '*'
      }
    ]).then(answers => {
      resolve(answers);
    });
  })
}

function doesInstallExist(installName) {
  const installUrl = `https://${installName}.wpengine.com`;

  return new Promise((resolve, reject) => {
    exec(`curl -I ${installUrl} | head -n 1 | cut -d$' ' -f2`, (err, stdout, stderr) => {
      if ( err ) {
        console.log(err);
        process.exit(0);
      }

      resolve( Number(stdout) !== 404 );
    });
  })
}
