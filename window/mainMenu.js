const configureHostsFile = require("../accessories/configureHostsFile");
const { BrowserWindow } = require("electron");
const path = require("path");
const { dialog } = require("electron");
const openFile = require("../accessories/openFile");
const restartService = require("../accessories/restartService");
const runScriptInWorksFolder = require("../runCommand/runScriptInWorksFolder");
const runScriptInOnCmd = require("../runCommand/runScriptInOnCmd");
const showGenericDialog = require("../utils/showGenericDialog");
const openBrowser = require("../utils/openBrowser");
const copyToClipboard = require("../utils/copyToClipboard");
const openAppDataPath = require("../utils/openAppDataPath");
const getAllCypressTestFiles = require("../accessories/getAllCypressTestFiles");

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
          copyToClipboard
        );
      } catch (error) {
        showGenericDialog(
          "Error !",
          "An error occurred while retrieving the branch name.",
          error.message,
          ["OK"],
          console.error,
          console.error
        );
      }
    },
  },
  {
    label: "Open Git Repository .. ( Browser ) ",
    click: () => openBrowser(),
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
  {
    label: "Configure Hosts File ..  ( Drivers, etc ) ",
    click: configureHostsFile,
  },
];
const test = [
  {
    label: "Open Cypress Interface .. ( Npx cypress open ) ",
    click: () => runScriptInOnCmd("npx cypress open"),
  },
  {
    label: "Start Specific Cypress Test .. ( Invoke Test File ) ",
    click: () => {
      getAllCypressTestFiles()
        .then(async (specFiles) => {
          const folderPath =
            "npx cypress run --browser chrome --headed --no-exit --spec cypress/tests/integration/e2e/";
          const options = {
            type: "info",
            title: "Cypress's Test !",
            message: "Choose to Run a Specific Test .. ",
            detail: " ( Will Run On Chrome Browser .. ) ",
            buttons: specFiles,
            defaultId: -555,
            cancelId: -1,
          };
          const response = await dialog.showMessageBox(options);
          console.log(response);
          if (response.response === -1) {
            return;
          } else {
            runScriptInOnCmd(folderPath + specFiles[response.response]);
          }
        })
        .catch((err) => {
          showGenericDialog(
            "Error !",
            "An error occurred while retrieving the branch name.",
            err.message,
            ["OK"],
            console.error,
            console.error
          );
        });
    },
  },
  {
    label: "Edit Cypress Test File .. ( Set Cypress File ) ",
    click: () => {
      getAllCypressTestFiles()
        .then(async (specFiles) => {
          const options = {
            type: "info",
            title: "Cypress's Test !",
            message: "Choose to Edit a test file .. ",
            detail: "( Copying common Commands at the bottom ↓ )",
            buttons: specFiles,
            defaultId: -555,
            cancelId: -1,
            checkboxLabel: 'Copy " Screenshot Configuration " To Clipboard ..',
          };
          const response = await dialog.showMessageBox(options);
          console.log(response);
          if (response.response === -1) {
            return;
          } else {
            if (response.checkboxChecked) {
              copyToClipboard("Cypress.config('numTestsKeptInMemory', 5)");
            }
            openFile(specFiles[response.response], true);
          }
        })
        .catch((err) => {
          showGenericDialog(
            "Error !",
            "An error occurred while retrieving the branch name.",
            err.message,
            ["OK"],
            console.error,
            console.error
          );
        });
    },
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
];

const menu = [
  { label: "Git", submenu: gitMenu },
  { label: "Test", submenu: test },
  { label: "Developer Tools", submenu: devToolsMenu },
  { label: "Application", submenu: appMenu },
];

module.exports = menu;
