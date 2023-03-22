const { shell } = require("electron");
const path = require("path");

const openNiceSystemsFolder = () => {
   const appDataPath = process.env.APPDATA;
   const niceSystemsFolderPath = path.join(appDataPath, "Nice_Systems", "AutomationStudio");
   shell.openPath(niceSystemsFolderPath);
};

module.exports = openNiceSystemsFolder;
