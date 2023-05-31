const { dialog } = require("electron");
const popUpProgressBar = require("./popUpProgressBar");
const runCommandAdmin = require("../runCommand/runCommandAdmin");



const restartService = async (serviceName) => {
  try {
    popUpProgressBar(
      2,
      `Stop ${serviceName}!`,
      "Confirm administrator privileges",
      true
    );
    await runCommandAdmin(`sc stop "${serviceName}"`);
    popUpProgressBar(
      4,
      `Start ${serviceName}!`,
      "Confirm administrator privileges",
      true
    );
    setTimeout(async () => {
      await runCommandAdmin(`sc start "${serviceName}"`);

      dialog.showMessageBox({
        type: "info",
        message: `${serviceName} Service has been Successfully Restarted!`,
        buttons: ["OK"],
        defaultId: 0,
      });
    }, 3000);
  } catch (error) {
    dialog.showErrorBox(
      "Error",
      `Failed to Restart ${serviceName} Service:  -- ${error.message}`
    );
  }
};

module.exports = restartService;
