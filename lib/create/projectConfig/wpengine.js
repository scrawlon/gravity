var { exec } = require('child_process');

const Gravity = {
  gatherParameters: require('./gatherParameters'),
  Utils: require('../../utils')
}

module.exports = new Promise(async (resolve, reject) => {
  const installName = await Gravity.gatherParameters.installName();

  if ( installName ) {
    const installUrl = `https://${installName}.wpengine.com`;
    const installUrlStatus = exec(`curl -I ${installUrl} | head -n 1 | cut -d$' ' -f2`, (err, stdout, stderr) => {
      if ( err ) {
        console.log(err);
        process.exit(0);
      }

      resolve({
        install: installName
      });
      // console.log({installUrl});
      // console.log(Number(stdout));
    });

    // console.log({installStatus});
    // resolve(installName);
  }
});
