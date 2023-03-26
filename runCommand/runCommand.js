const runCommand = (script = "", startCommand = "", scriptLocation = `start cmd /k "cd /d C:\\Works\\webapp-as && "`) => {
  const commandString = scriptLocation + startCommand + script;
  const childProcess = require("child_process").spawn(commandString, [], {
    shell: true,
  });

  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
};

module.exports = runCommand;



// Old code needed ?
// const commandString = `start cmd /k "cd /d C:\\Works\\webapp-as && ${startCommand} ${script}"`;
// const cwd = "C:\\Works\\webapp-as";
// const childProcess = require("child_process").spawn(commandString, [], {
//   cwd,
//   shell: true,
// });

// if you wont to close it after run .......
// const commandString = `start cmd /c "cd /d C:\\Works\\webapp-as && ${script}"`;
