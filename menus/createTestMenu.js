const { dialog } = require("electron");
const openFile = require("../accessories/openFile");
const runShellCommand = require("../runCommand/runShellCommand");
const showGenericDialog = require("../utils/showGenericDialog");
const copyToClipboard = require("../utils/copyToClipboard");
const getAllCypressTestFiles = require("../accessories/getAllCypressTestFiles");
const popUpProgressBar = require("../utils/popUpProgressBar");
const createTestMenu = () => {
  return [
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
                const npxCypressRun =
                  "npx cypress run --browser chrome --headed --no-exit --spec cypress/tests/integration/e2e/";
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
                  runShellCommand(npxCypressRun + specFiles[response.response]);
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
                const npxCypressRun =
                  "npx cypress run --browser chrome --headed --no-exit --spec cypress/tests/integration/qualityGate/";
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
                  runShellCommand(npxCypressRun + specFiles[response.response]);
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
  ];
};

module.exports = createTestMenu;
