
const test = {
  name: 'Test',
  command: 'abcdrf',
  versionCheck: '-v',
  versionMin: 80
}

const git = {
  name: 'Git',
  command: 'git',
  versionCheck: '--version',
  versionMin: 2
}

const node = {
  name: 'Node',
  command: 'node',
  versionCheck: '-v',
  versionMin: 8
}

const wpengineCLI = {
  name: 'WPEngine DevKit',
  command: 'wpe',
  versionCheck: 'version',
  versionMin: 0
}

module.exports = {
  git,
  node,
  wpengineCLI
}
