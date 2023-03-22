

const { exec } = require("child_process");


const openConfigFile = () => {
  const filePath = path.join(
    process.env.APPDATA,
    "Nice_Systems",
    "AutomationStudio",
    "AutomationStudio.exe.config"
  );
  fs.access(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    require("child_process").exec(`start "" "${filePath}"`);
  });
};

module.exports = openConfigFile;
