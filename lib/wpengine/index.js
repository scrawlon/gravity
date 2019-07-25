
/* WP Engine Devkit commands */
const command = 'wpe';
const commands = {
  create: 'projects new'
}

function getCommand(action, args) {
  return `${command} ${commands[action]} ${args}`.split(' ');
}

module.exports = {
  commands: getCommand
}
