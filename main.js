const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const path = require("path");
const openFile = require("./utils/openFile");
const restartService = require("./utils/restartService");
const runShellCommand = require("./runCommand/runShellCommand");
const openAppDataPath = require("./accessories/openAppDataPath");
const popUpProgressBar = require("./utils/popUpProgressBar");
const copyToClipboard = require("./utils/copyToClipboard");
const runCommandAsync = require("./runCommand/runCommandAsync");
const openBrowser = require("./utils/openBrowser");
const showGenericDialog = require("./utils/showGenericDialog");
const getAllCypressTestFiles = require("./accessories/getAllCypressTestFiles");
const npxCypressRun = "npx cypress run --browser chrome --headed --no-exit --spec cypress/tests/integration/e2e/";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    title: "Automation Studio",
    center: true,
    icon: "./img/AppLogo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
  });

  const menuBarApp = [
    {
      label: "Git",
      submenu: [
        {
          label: "Get Latest Changes ( Master )",
          click: () => runShellCommand("git pull origin master"),
        },
        {
          label: "Get Latest Changes ( Current )",
          click: () => runShellCommand("git pull"),
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
          click: () => openBrowser("https://github.com/nice-cxone/webapp-as"),
        },
      ],
    },
    {
      label: "Test",
      submenu: [
        {
          label: "Open Cypress Interface .. ( Npx cypress open ) ",
          click: () => runShellCommand("npx cypress open"),
        },
        {
          label: "Run Specific Cypress Test .. (E2E, QG) ",
          submenu: [
            {
              label: "From Folder - integration/e2e",
              click: () => {
                const folderPath =
                  "C:/Works/webapp-as/cypress/tests/integration/e2e";

                getAllCypressTestFiles(folderPath)
                  .then(async (specFiles) => {

                    const options = {
                      type: "info",
                      title: "Cypress's Test !",
                      message: "Choose to Run a Specific Test .. ",
                      detail: " The Test Will Run On Chrome Browser ..  ",
                      buttons: specFiles,
                      defaultId: -555,
                      cancelId: -1,
                      noLink: true,
                    };
                    const response = await dialog.showMessageBox(options);
                    if (response.response === -1) {
                      return;
                    } else {
                      runShellCommand(
                        npxCypressRun + specFiles[response.response]
                      );
                    }
                  })
                  .catch((err) => {
                    showGenericDialog(
                      "Error !",
                      "An Error occurred !",
                      err.message,
                      ["OK"],
                      console.error,
                      console.error
                    );
                  });
              },
            },
            {
              label: "From Folder - integration/qualityGate",
              click: () => {
                const folderPath =
                  "C:/Works/webapp-as/cypress/tests/integration/qualityGate";
                getAllCypressTestFiles(folderPath)
                  .then(async (specFiles) => {
                    const options = {
                      type: "info",
                      title: "Cypress's Test !",
                      message: "Choose to Run a Specific Test .. ",
                      detail: " The Test Will Run On Chrome Browser ..  ",
                      buttons: specFiles,
                      defaultId: -555,
                      cancelId: -1,
                      noLink: true,
                    };
                    const response = await dialog.showMessageBox(options);
                    if (response.response === -1) {
                      return;
                    } else {
                      runShellCommand(
                        npxCypressRun + specFiles[response.response]
                      );
                    }
                  })
                  .catch((err) => {
                    showGenericDialog(
                      "Error !",
                      "An Error occurred !",
                      err.message,
                      ["OK"],
                      console.error,
                      console.error
                    );
                  });
              },
            },
          ],
        },
        {
          label: "Edit Cypress Test File .. ( Open in Editor ) ",
          submenu: [
            {
              label: "From Folder - integration/e2e",
              click: () => {
                const folderPath =
                  "C:/Works/webapp-as/cypress/tests/integration/e2e";
                getAllCypressTestFiles(folderPath)
                  .then(async (specFiles) => {
                    const options = {
                      type: "info",
                      title: "Cypress's Test !",
                      message: "Choose to Edit a test file .. ",
                      detail: " The Test will Edit With Your default IDE ..",
                      buttons: specFiles,
                      defaultId: -555,
                      cancelId: -1,
                      checkboxLabel:
                        'Copy " Screenshot Configuration " To Clipboard ..',
                      noLink: true,
                    };
                    const response = await dialog.showMessageBox(options);
                    if (response.response === -1) {
                      return;
                    } else {
                      if (response.checkboxChecked) {
                        copyToClipboard(
                          "Cypress.config('numTestsKeptInMemory', 5)"
                        );
                      }
                      popUpProgressBar(
                        3,
                        "Opening File " + specFiles[response.response] + " .."
                      );
                      const folderLocation =
                        "C:/Works/webapp-as/cypress/tests/integration/e2e/";
                      openFile(specFiles[response.response], folderLocation);
                    }
                  })
                  .catch((err) => {
                    showGenericDialog(
                      "Error !",
                      "An Error occurred !",
                      err.message,
                      ["OK"],
                      console.error,
                      console.error
                    );
                  });
              },
            },
            {
              label: "From Folder - integration/qualityGate",
              click: () => {
                const folderPath =
                  "C:/Works/webapp-as/cypress/tests/integration/qualityGate";
                getAllCypressTestFiles(folderPath)
                  .then(async (specFiles) => {
                    const options = {
                      type: "info",
                      title: "Cypress's Test !",
                      message: "Choose to Edit a test file .. ",
                      detail: " The Test will Edit With Your default IDE ..",
                      buttons: specFiles,
                      defaultId: -555,
                      cancelId: -1,
                      checkboxLabel:
                        'Copy " Screenshot Configuration " To Clipboard ..',
                      noLink: true,
                    };
                    const response = await dialog.showMessageBox(options);
                    if (response.response === -1) {
                      return;
                    } else {
                      if (response.checkboxChecked) {
                        copyToClipboard(
                          "Cypress.config('numTestsKeptInMemory', 5)"
                        );
                      }
                      popUpProgressBar(
                        2,
                        "Opening File " + specFiles[response.response] + " .."
                      );
                      const folderLocation =
                        "C:/Works/webapp-as/cypress/tests/integration/qualityGate/";
                      openFile(specFiles[response.response], folderLocation);
                    }
                  })
                  .catch((err) => {
                    showGenericDialog(
                      "Error !",
                      "An Error occurred !",
                      err.message,
                      ["OK"],
                      console.error,
                      console.error
                    );
                  });
              },
            },
          ],
        },
        {
          label: "Browse the tests folder .. ( Cypress Folder ) ",
          click: () => {
            const folderLocation =
              "C:\\Works\\webapp-as\\cypress\\tests\\integration";
            require("child_process").exec("explorer " + folderLocation);
          },
        },
      ],
    },
    {
      label: "Developer",
      submenu: [
        {
          label: "Restart Automation Studio Service .. ( AS Launcher )",
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
            popUpProgressBar(
              2,
              "Opening File " + "AutomationStudio.exe.config .."
            );
            copyToClipboard("<add>http://na1.dev.localhost:8088</add>");
            openFile("AutomationStudio.exe.config", filePath);
          },
        },
        {
          label: "Update Min Version .. ( configurations ) ",
          click: () => {
            mainWindow.loadFile("./html/updateMinVersion.html");
          },
        },
        {
          label: "Open Programs and Software ..  ( Control Panel )",
          click: () => runShellCommand("control.exe appwiz.cpl", true),
        },
      ],
    },
    {
      label: "Application",
      submenu: [
        {
          label: "About ..",
          click: () => {
            mainWindow.loadFile("./html/aboutThisApp.html");
          },
        },
        {
          label: "Refresh ..",
          click: () => {
            mainWindow.reload();
          },
        },
      ],
    },
  ];

  const mainMenu = Menu.buildFromTemplate(menuBarApp);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.loadFile("./html/indexPage.html");

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}


app.on("ready", ev => {
  createWindow();
  if (process.platform == 'win32') {
    app.setAppUserModelId('Automation Studio App');
  }
})

ipcMain.on('navigate-to-main', () => {
  mainWindow.loadFile('./html/indexPage.html');
});



















