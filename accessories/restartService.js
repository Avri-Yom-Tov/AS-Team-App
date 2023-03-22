const { dialog } = require("electron");
const popUpProgressBar = require("../utils/popUpProgressBar");

const runAsAdmin = require("../runCommand/runAsAdmin");

async function restartService() {
  try {
    popUpProgressBar(
      2,
      "Stop Automation Studio !",
      "Confirm administrator privileges",
      true
    );
    await runAsAdmin('sc stop "Automation Studio Launcher"');
    popUpProgressBar(
      4,
      "Start Automation Studio !",
      "Confirm administrator privileges",
      true
    );
    setTimeout(async () => {
      await runAsAdmin('sc start "Automation Studio Launcher"');

      dialog.showMessageBox({
        type: "info",
        message:
          "Automation Studio Launcher Service has been Successfully restarted ! ",
        buttons: ["OK"],
        defaultId: 0,
      });
    }, 3000);
  } catch (error) {
    dialog.showErrorBox(
      "Error",
      `Failed to restart Automation Studio Launcher Service: ${error.message}`
    );
  }
}

module.exports = restartService;
