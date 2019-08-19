
const { execSync } = require('child_process');

function getUsername(service) {
  return execSync('ssh -T git@bitbucket.org | sed -n "s/^logged in as //p" | tr -d "\n"', {encoding: 'utf8'}, (err, stdout, stderr) => {
    if ( err ) {
      spinner.fail(`Cannot connect to Bitbucket\n`);

      console.error(
        chalk.red(`${tab}Make sure you're logged into Bitbucket and try again.\n`)
      )

      process.exit(0);
    }
  });
}

module.exports = {
  getUsername
}
