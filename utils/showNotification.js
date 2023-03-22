const { Notification } = require("electron");

function showNotification(text1, text2 = "...") {
  const notification = new Notification({
    title: text1,
    body: text2,
    onClick: () => {
      console.log("Notification clicked!");
    },
  });

  notification.show();
}

module.exports = showNotification;
