const fs = require('fs');


function getAllCypressTestFiles(folderPath) {
 

  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, specFiles) => {
      if (err) {
        reject(err);
      } else {
        resolve(specFiles);
      }
    });
  });
}

module.exports = getAllCypressTestFiles;
