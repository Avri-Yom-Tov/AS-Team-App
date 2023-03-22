const runNpmScript = (script, command = "run") => {
  const commandString = `start cmd /k "cd /d C:\\Works\\webapp-as && npm ${command} ${script}"`;
  const cwd = "C:\\Works\\webapp-as";
  const childProcess = require("child_process").spawn(commandString, [], {
    cwd,
    shell: true,
  });

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};


module.exports = runNpmScript ;
