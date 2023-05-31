const { Notification } = require("electron");

function showNotification(text1, text2 = "...") {

  const notification = new Notification({
    title: text1,
    body: text2,
    silent: true,
  });

  notification.show();

  setTimeout(() => {
    notification.close();
  }, 5000);
}

module.exports = showNotification;
