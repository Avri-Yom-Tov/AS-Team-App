const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const runShellCommand = require("./runCommand/runShellCommand");

const mainMenuTemplate = require("./window/mainMenu");

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

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.loadFile("./html/index.html");

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", function () {
  createWindow();
});

ipcMain.on("run-script", (_, script) => {
  runShellCommand("npm run " + script);
});
