
const bitbucket = {
  name: 'Bitbucket',
  command: 'ssh -T git@bitbucket.org',
  getUserCommand: 'ssh -T git@bitbucket.org | sed -n "s/^logged in as //p" | tr -d "\n"'
}

const apiGateway = {
  name: 'API Gateway',
  command: ''
}

module.exports = {
  bitbucket
}
