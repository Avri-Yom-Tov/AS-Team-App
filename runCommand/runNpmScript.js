const runNpmScript = (script, startCommand = "npm run") => {
  const commandString = `start cmd /k "cd /d C:\\Works\\webapp-as && ${startCommand} ${script}"`;
  const cwd = "C:\\Works\\webapp-as";
  const childProcess = require("child_process").spawn(commandString, [], {
    cwd,
    shell: true,
  });

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};


module.exports = runNpmScript ;
