const runCommand = (script = "", startCommand = "", scriptLocation = `start cmd /k "cd /d C:\\Works\\webapp-as && "`) => {
  const commandString = scriptLocation + startCommand + script;
  const childProcess = require("child_process").spawn(commandString, [], {
    shell: true,
  });

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

module.exports = runCommand;




