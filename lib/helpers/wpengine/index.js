
const { exec } = require('child_process');

/* WP Engine Devkit commands */
const command = 'wpe';
const commands = {
  create: 'projects new'
}

function getCommand(action, args) {
  return `${command} ${commands[action]} ${args}`.split(' ');
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

module.exports = {
  commands: getCommand,
  doesInstallExist: doesInstallExist
}
