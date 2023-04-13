const { exec } = require("child_process");

const runCommandAsync = (script, location = "C:\\Works\\webapp-as") => {
  console.log(`Running command: ${script}`);
  console.log(`Working directory: ${location}`);

  return new Promise((resolve, reject) => {
    exec(script, { cwd: location }, (error, stdout, stderr) => {
      console.log(`Command output: ${stdout}`);

      if (error) {
        console.error(`Command error: ${error}`);
        reject(error);
      } else if (stderr) {
        console.error(`Command stderr: ${stderr}`);
        reject(new Error(stderr.trim()));
      } else {
        console.log(`Command succeeded`);
        resolve(stdout.trim());
      }
    });
  });
};


module.exports = runCommandAsync;
