const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const runCommand = require("./runCommand/runCommand");

const mainMenuTemplate = require("./window/mainMenu");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    title: "Automation Studio",
    center: true,
    icon: "./img/NICE-LOGO.jpg",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  // mainWindow.webContents.openDevTools();
  mainWindow.loadFile("./html/index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", function () {
  createWindow();
});

ipcMain.on("get-scripts", (event) => {
  event.reply("scripts", "scripts");
});

ipcMain.on("run-script", (_, script) => {
  runCommand(script, "npm run ");
});
