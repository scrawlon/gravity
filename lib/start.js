/**
 * This file is dedicated to the `start` command where the CLI will automatically call and watch
 * whatever build tool the user chose when setting up the development environment via the `create`
 * command.
 */

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