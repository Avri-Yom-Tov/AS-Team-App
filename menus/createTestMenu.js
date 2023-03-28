const { dialog } = require("electron");
const openFile = require("../accessories/openFile");
const runCommand = require("../runCommand/runCommand");
const showGenericDialog = require("../utils/showGenericDialog");
const copyToClipboard = require("../utils/copyToClipboard");
const getAllCypressTestFiles = require("../accessories/getAllCypressTestFiles");
const popUpProgressBar = require("../utils/popUpProgressBar");

const createTestMenu = () => {
  return [
    {
      label: "Open Cypress Interface .. ( Npx cypress open ) ",
      click: () => runCommand("cypress open", "npx "),
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
                copyToClipboard("Cypress.config('numTestsKeptInMemory', 5)");
              }
              popUpProgressBar(4);
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
};

module.exports = createTestMenu;
