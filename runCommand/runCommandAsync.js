const { exec } = require("child_process");

const runCommandAsync = (script, location = "C:\\Works\\webapp-as") => {

  return new Promise((resolve, reject) => {
    exec(script, { location }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr.trim()));
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

module.exports = runCommandAsync;
