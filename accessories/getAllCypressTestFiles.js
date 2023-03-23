const fs = require('fs');


function getAllCypressTestFiles() {
  const folderPath = "C:/Works/webapp-as/cypress/tests/integration/e2e";

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
