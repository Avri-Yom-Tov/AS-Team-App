const ProgressBar = require("electron-progressbar");

function popUpProgressBar(
  timeToClose,
  message = "Preparing data...",
  completedMessage = "Task completed. Exiting...",
  indeterminate = false
) {
  let value = 1;

  const progressBar = new ProgressBar({
    indeterminate,
    text: message,
    detail: "Wait...",
  });

  progressBar.on("progress", () => {
    if (!indeterminate) {
      progressBar.detail = `In process ${value} from ${timeToClose - 1}...`;
    }
  });

  const intervalOfCounter = setInterval(() => {
    value += 1;
    if (value > timeToClose) {
      clearInterval(intervalOfCounter);
      clearInterval(intervalOfProgressBar);
      if (!indeterminate) {
        progressBar.detail = completedMessage;
      }
      progressBar.setCompleted();
    }
  }, 1000);

  const intervalOfProgressBar = setInterval(() => {
    if (!progressBar.isCompleted() && !indeterminate) {
      progressBar.value += 1;
    }
  }, 1000);
}

module.exports = popUpProgressBar;
