
const bitbucket = {
  name: 'Bitbucket',
  command: 'ssh -T git@bitbucket.org',
  validResponse: 'logged in as',
  loginFunction: false
}

const apiGateway = {
  name: 'API Gateway',
  command: '',
  validResponse: '',
  loginFunction: false
}

module.exports = {
  bitbucket
}
