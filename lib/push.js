const fs = require('fs');
const path = require('path');
const node_ssh = require('node-ssh');
const os = require('os');
const ssh = new node_ssh();

console.log(os.homedir());
ssh.connect({
  host: 'krxi24134site.ssh.wpengine.net',
  username: 'krxi24134site',
  privateKey: os.homedir + '/.ssh/wpengine_rsa'
}).then(() => {
  ssh.execCommand('wp cli').then((result) => {
    console.log()
  })
});