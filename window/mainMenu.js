const configureHostsFile = require("../accessories/configureHostsFile");
const { BrowserWindow } = require("electron");
const openConfigFile = require("../accessories/openConfigFile");
const restartService = require("../accessories/restartService");
const runScriptInWorksFolder = require("../runCommand/runScriptInWorksFolder");
const runScriptInOnCmd = require("../runCommand/runScriptInOnCmd");
const showGenericDialog = require("../utils/showGenericDialog");
const openBrowser = require("../utils/openBrowser");
const copyToClipboard = require("../utils/copyToClipboard");
const openAppDataPath = require("../utils/openAppDataPath");
const readScriptsFromPackageJson = require("../utils/readScriptsFromPackageJson");
const playRandomPlaylist = require("../accessories/playRandomPlaylist");

const gitMenu = [
  {
    label: "Get Latest Changes ( Master )",
    click: () => runScriptInOnCmd("git pull origin master"),
  },
  {
    label: "Get Latest Changes ( Current )",
    click: () => runScriptInOnCmd("git pull"),
  },
  { type: "separator" },
  {
    label: "What Branch am I on ? ( Git )",
    click: async () => {
      try {
        const branchName = await runScriptInWorksFolder(
          "git rev-parse --abbrev-ref HEAD"
        );

        showGenericDialog(
          "Information !",
          "You Are now in Branch name  : ",
          branchName,
          ["OK", "Copy"],
          console.log,
          copyToClipboard,
          1,
          0
        );
      } catch (error) {
        showGenericDialog(
          "Error !",
          "An error occurred while retrieving the branch name.",
          error.message,
          ["OK"],
          console.error,
          console.error,
          0,
          0
        );
      }
    },
  },
  {
    label: "Open Git Repository .. ( Browser ) ",
    click: () => openBrowser(),
  },
  {
    label: "Open Git Fff .. ( Browser ) ",
    click: () => {

    },
  },
];

const devToolsMenu = [
  {
    label: "Restart AS Application .. ( Services )",
    click: restartService,
  },
  {
    label: "Run a Command on Works .. ( CMD )",
    click: runScriptInOnCmd,
  },
  {
    label: "Open AppData Folder ..  ( Drivers, etc ) ",
    click: openAppDataPath,
  },
  { type: "separator" },
  {
    label: "Edit Allow Origins .. ( Config file ) ",
    click: openConfigFile,
  },
  {
    label: "Configure Hosts File ..  ( Drivers, etc ) ",
    click: configureHostsFile,
  },
];

const appMenu = [
  {
    label: "About ..",
    click: () => {
      const aboutWindow = new BrowserWindow({
        width: 500,
        height: 250,
        modal: true,
        webPreferences: {
          nodeIntegration: true,
        },
      });
      aboutWindow.loadFile("./html/about.html");
      aboutWindow.setMenu(null);
    },
  },
  {
    label: "Play .. ",
    click: playRandomPlaylist,
  },
];

const menu = [
  { label: "Git", submenu: gitMenu },
  { label: "Developer Tools", submenu: devToolsMenu },
  { label: "Application", submenu: appMenu },
];

module.exports = menu;

