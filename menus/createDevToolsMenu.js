const path = require("path");
const openFile = require("../accessories/openFile");
const restartService = require("../accessories/restartService");
const runShellCommand = require("../runCommand/runShellCommand");
const openAppDataPath = require("../utils/openAppDataPath");
const popUpProgressBar = require("../utils/popUpProgressBar");

const createDevToolsMenu = () => {
  return [
    {
      label: "Restart Application Service .. ( AS Launcher )",
      click: () => {
        restartService("Automation Studio Launcher");
      },
    },
    {
      label: "Run Command in Terminal ..  ( Works/webapp-as ) ",
      click: () =>
        runShellCommand(
          "cmd /k echo Type A Command and press Enter to start ..."
        ),
    },
    {
      label: "Open AppData Folder ..  ( Nice Systems ) ",
      click: openAppDataPath,
    },
    {
      label: "Edit Automation Studio Settings .. ( Config file ) ",
      click: () => {
        const filePath = path.join(
          process.env.APPDATA,
          "Nice_Systems",
          "AutomationStudio",
          "/"
        );
        popUpProgressBar(2, "Opening File " + "AutomationStudio.exe.config ..");
        openFile("AutomationStudio.exe.config", filePath);
      },
    },
    {
      label: "Open Programs and Software ..  ( Control Panel )",
      click: () => runShellCommand("control.exe appwiz.cpl", true),
    },
  ];
};

module.exports = createDevToolsMenu;
