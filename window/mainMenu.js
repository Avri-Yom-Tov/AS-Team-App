const { BrowserWindow } = require("electron");
const path = require("path");
const { dialog } = require("electron");
const runCommandAsync = require("../runCommand/runCommandAsync");
const openFile = require("../accessories/openFile");
const restartService = require("../accessories/restartService");
const runCommand = require("../runCommand/runCommand");
const showGenericDialog = require("../utils/showGenericDialog");
const openBrowser = require("../utils/openBrowser");
const copyToClipboard = require("../utils/copyToClipboard");
const openAppDataPath = require("../utils/openAppDataPath");
const getAllCypressTestFiles = require("../accessories/getAllCypressTestFiles");

const gitMenu = [
  {
    label: "Get Latest Changes ( Master )",
    click: () => runCommand("", "git pull origin master"),
  },
  {
    label: "Get Latest Changes ( Current )",
    click: () => runCommand("", "git pull"),
  },
  { type: "separator" },
  {
    label: "What Branch am I on ? ( Git )",
    click: async () => {
      try {
        const branchName = await runCommandAsync(
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
    label: "Run A Command ..  ( C:/Works/webapp-as ) " ,
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
const test = [
  {
    label: "Open Cypress Interface .. ( Npx cypress open ) ",
    click: () => runCommand("cypress open", "npx"),
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
            runCommand(folderPath + specFiles[response.response]);
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
  { label: "Developer ", submenu: devToolsMenu },
  { label: "Application", submenu: appMenu },
];

module.exports = menu;
