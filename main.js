const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const runNpmScript = require("./runCommand/runNpmScript");

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
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.webContents.openDevTools()
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
  runNpmScript(script);
});
