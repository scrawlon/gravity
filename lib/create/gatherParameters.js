const inquirer = require('inquirer');

function gatherParameters() {
  const defaultUsername = 'duynguye';

  return new Promise((resolve, reject) => {
    console.log();

    inquirer.prompt([
      {
        type: 'input',
        name: 'install',
        message: 'What is the install name?',
        validate: (input) => {
          let answer = input.trim();
  
          if (answer === '') {
            return "Install name cannot be blank";
          }
  
          if (answer.length < 9) {
            return "Install name is too short";
          }
  
          if (!isNaN(answer)) {
            return "Please enter a valid install name";
          }
  
          return true;
        }
      }, {
        type: 'list',
        name: 'js',
        message: 'JavaScript style?',
        choices: ['ES6', 'jQuery', 'Vanilla']
      }, {
        type: 'input',
        name: 'username',
        message: `Bitbucket Username: `,
        default: () => {
          return defaultUsername;
        }
      }
    ]).then(answers => {
      resolve(answers);
    });
  })
}

module.exports = gatherParameters;