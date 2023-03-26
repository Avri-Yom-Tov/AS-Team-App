const path = require("path");
const openFile = require("../accessories/openFile");
const restartService = require("../accessories/restartService");
const runCommand = require("../runCommand/runCommand");
const openAppDataPath = require("../utils/openAppDataPath");

const createDevToolsMenu = () => {
  return [
    {
      label: "Restart AS Application .. ( Services )",
      click: restartService,
    },
    {
      label: "Run A Command ..  ( C:/Works/webapp-as ) ",
      click: () =>
        runCommand("cmd /k echo Type A Command and press Enter to start ..."),
    },
    {
      label: "Open AppData Folder ..  ( Nice Systems ) ",
      click: openAppDataPath,
    },
    { type: "separator" },
    {
      label: "Edit AS Settings .. ( Config file ) ",
      click: () => {
        const filePath = path.join(
          process.env.APPDATA,
          "Nice_Systems",
          "AutomationStudio",
          "AutomationStudio.exe.config"
        );
        openFile(filePath);
      },
    },
  ];
};

module.exports = createDevToolsMenu;
