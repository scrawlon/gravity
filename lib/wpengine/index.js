
/* WP Engine Devkit commands */
const command = 'wpe';
const commands = {
  create: 'projects new'
}

function getCommand(action) {
  return `${command} ${commands[action]}`;
}

module.exports = {
  commands: getCommand
}
