
const {execSync } = require('child_process');

const bitbucketApiUrl = process.env.BITBUCKET_API_URL;

function doesRepoExist(repoUrl) {
  try {
    return execSync(`git ls-remote -q ${repoUrl}`, {encoding: 'utf8', stdio: 'pipe'}, (err, stdout, stderr) => {
      if ( err ) {
        return false;
      }

      return true;
    });
  } catch (err) {
    return false;
  }
}

function getRepoUrls(repoName) {
  try {
    return execSync(`git ls-remote -q ${repoUrl}`, {encoding: 'utf8', stdio: 'pipe'}, (err, stdout, stderr) => {
      if ( err ) {
        return false;
      }

      return true;
    });
  } catch (err) {
    return false;
  }

}

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
  doesRepoExist,
  getUsername
}
