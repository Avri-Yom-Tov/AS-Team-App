const { shell } = require("electron");

function openBrowser(
  repositoryUrl = ""
) {
  shell.openExternal(repositoryUrl);
}

module.exports = openBrowser;
