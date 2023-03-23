const fs = require("fs");

const folderPath = "C:/Works/webapp-as/cypress/tests/integration/e2e/";

const openFile = (filePath, testFolder = false) => {
  console.log(filePath);
  if (testFolder) {
    filePath = folderPath + filePath;
    console.log(filePath);
  }

  fs.access(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    require("child_process").exec(`start "" "${filePath}"`);
  });
};

module.exports = openFile;
