const portfinder = require('portfinder');
const commandExists = require('command-exists');

// setTimeout(() => {
//   portfinder.getPortPromise()
//     .then(port => {
//       spinner.succeed(`Port found at ${port}`);
//       console.log('\n');
//       start.gatherParameters();
//     }).catch(err => console.error(err));
// }, 1000);