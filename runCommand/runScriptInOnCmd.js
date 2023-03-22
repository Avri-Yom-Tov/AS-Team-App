const runScriptInOnCmd = (script = "") => {
  // if you wont to close it after run .......

  // const commandString = `start cmd /c "cd /d C:\\Works\\webapp-as && ${script}"`;
  const commandString = `start cmd /k "cd /d C:\\Works\\webapp-as && ${script}"`;
  const childProcess = require("child_process").spawn(commandString, [], {
    shell: true,
  });

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

module.exports = runScriptInOnCmd;
