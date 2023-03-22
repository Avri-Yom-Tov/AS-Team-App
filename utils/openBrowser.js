const { shell } = require("electron");

function openBrowser(
  repositoryUrl = "https://github.com/nice-cxone/webapp-as"
) {
  shell.openExternal(repositoryUrl);
}

module.exports = openBrowser;
