const path = require("path");
const fs = require("fs");

const openConfigFile = () => {
  exec(`git branch --list ${query}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }

    const branches = stdout
      .split("\n")
      .map((branch) => branch.trim())
      .filter((branch) => branch !== "");

    // Send search results to renderer process
    event.sender.send("searchResults", branches);
  });
};

module.exports = openConfigFile;
