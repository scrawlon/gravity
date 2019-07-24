
/* WP Engine Devkit commands */
const command = 'wpe';
const commands = {
  create: 'projects new'
}

function getCommand(action) {
  return `wpe ${commands[action]}`;
}

module.exports = {
  commands: getCommand
}
