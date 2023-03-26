const { BrowserWindow } = require("electron");

const createAppMenu = () => {
  return [  {
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
  },];
};
module.exports = createAppMenu;
