const { exec } = require("child_process");

const runScriptInWorksFolder = (script) => {
  const cwd = "C:\\Works\\webapp-as";

  return new Promise((resolve, reject) => {
    exec(script, { cwd }, (error, stdout, stderr) => {
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

module.exports = runScriptInWorksFolder;
