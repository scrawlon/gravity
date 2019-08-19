const inquirer = require('inquirer');

// const {bitbucket, wpengine} = require('../../helpers');

const Gravity = {
  Utils: require('../../utils')
}

module.exports = function gatherParameters(project) {
  let installExists;

  return new Promise((resolve, reject) => {
    console.log();

    inquirer.prompt([
      {
        type: 'confirm',
        name: 'repoExists',
        message: 'Is there already a Bitbucket repository?',
      },{
        type: 'input',
        name: 'repoUpstreamUrl',
        message: 'Upstream repo url? (starts with \'git@bitbucket.org\')',
        validate: (input) => {
          const answer = input.trim();
          const validUpstreamRepo = /^git@bitbucket.org:sinclairdigitalsolutions.*\.git$/.test(answer)

          if (!validUpstreamRepo) {
            return `${answer} is not a valid upstream repo url.`
          }

          return true;
        },
        when: (response) => {
          return response.repoExists;
        }
      },{
        type: 'input',
        name: 'repoNewName',
        message: `Name for new Bitbucket repo? (Enter to use "${project}"):`,
        validate: (input) => {
          const answer = input.trim();
          const validRepoNewName = /^[A-Za-z0-9 _-]*$/.test(answer)

          if (answer && !validRepoNewName) {
            return `${answer} is invalid. Use only letters, numbers, hyphens and underscores.`
          }

          return true;
        },
        default: project,
        when: (response) => {
          return !response.repoExists;
        }
      },{
        name: 'install',
        message: 'What is the install name? (alphanumeric 9-15 characters)',
        validate: (input) => {
          let answer = input.trim();
          const validNameChars = /^[\w]*$/.test(answer);

          if (answer === '') {
            return "Install name cannot be blank";
          }

          if (answer.length < 9) {
            return `${answer} is too short (9 character min)`;
          }

          if (answer.length > 15) {
            return `${answer} is too long (15 character max)`;
          }

          if (!validNameChars) {
            return `${answer} is invalid. Use only letters and numbers.`;
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
          installExists = await Gravity.Utils.helpers.wpengine.doesInstallExist(response.install);

          if ( installExists ) {
            return `${response.install}.wpengine.com found. Is this correct?`;
          } else {
            return `${response.install}.wpengine.com not found. Create new install?`;
          }
        },
        when: async (response) => {
          return response.install;
        }
      }, {
        type: 'confirm',
        name: 'woocommerce',
        message: 'WooCommerce?',
        default: false,
        when: (response) => {
          return !installExists;
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
      // }, {
      //   type: 'confirm',
      //   name: 'starter',
      //   message: 'Use the starter theme?',
      //   when: (response) => {
      //     return !response.repoExists;
      //   }
      // }, {
      //   type: 'list',
      //   name: 'buildtool',
      //   message: 'Preferred Build Tool?',
      //   choices: ['Webpack', 'Gulp'],
      //   when: (response) => {
      //     return !response.repoExists;
      //   }
      // }, {
      //   type: 'list',
      //   name: 'js',
      //   message: 'JavaScript style?',
      //   choices: ['ES6', 'jQuery', 'Vanilla'],
      //   when: function (response) {
      //     return response.buildtool == 'Webpack';
      //   }
      }
    ]).then(answers => {
      answers.installExists = installExists;

      resolve(answers);
    });
  })
}
