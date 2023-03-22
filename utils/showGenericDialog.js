const { dialog } = require("electron");

async function showGenericDialog(
  title,
  message,
  detail,
  buttons = ["Yes", "No"],
  onConfirm = () => {},
  onCancel = () => {},
  defaultId = 0,
  cancelId = 1
) {
  const options = {
    type: "info",
    title: title,
    message: message,
    detail: detail,
    buttons: buttons,
    defaultId: defaultId,
    cancelId: cancelId,
  };

  const response = await dialog.showMessageBox(options);
  if (response.response === 1) {
    onCancel(detail);
    console.log("User clicked No.");
  } else {
    onConfirm();
    console.log("User clicked Yes.");
  }
}

module.exports = showGenericDialog;
