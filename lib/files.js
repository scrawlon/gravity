const fs = require('fs');
const path = require('path');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filepath) => {
    try {
      return fs.statSync(filepath).isDirectory();
    } catch (error) {
      return false
    }
  }
}