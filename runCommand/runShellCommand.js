const runShellCommand = (
  script = "",
  closeAfterCompletion = false,
  scriptLocationBase = `start cmd /${
    closeAfterCompletion ? "c" : "k"
  } "cd /d C:\\Works\\webapp-as && "`
) => {
  const commandString = `${scriptLocationBase}${script}`;
  const childProcess = require("child_process").spawn(commandString, [], {
    shell: true,
  });
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

module.exports = runShellCommand;
