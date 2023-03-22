const sudo = require("sudo-prompt");


function runAsAdmin(cmd) {
  return new Promise((resolve, reject) => {
    const options = {
      name: "Electron App",
    };
    sudo.exec(cmd, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}


module.exports = runAsAdmin