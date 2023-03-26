const runCommand = require("../runCommand/runCommand");
const runCommandAsync = require("../runCommand/runCommandAsync");
const openBrowser = require("../utils/openBrowser");
const showGenericDialog = require("../utils/showGenericDialog");
const copyToClipboard = require("../utils/copyToClipboard");


const createGitMenu = () => {
  return [
    {
      label: "Get Latest Changes ( Master )",
      click: () => runCommand("", "git pull origin master"),
    },
    {
      label: "Get Latest Changes ( Current )",
      click: () => runCommand("", "git pull"),
    },
    { type: "separator" },
    {
      label: "What Branch am I on ? ( Git )",
      click: async () => {
        try {
          const branchName = await runCommandAsync(
            "git rev-parse --abbrev-ref HEAD"
          );

          showGenericDialog(
            "Information !",
            "You Are now in Branch name  : ",
            branchName,
            ["OK", "Copy"],
            console.log,
            copyToClipboard
          );
        } catch (error) {
          showGenericDialog(
            "Error !",
            "An error occurred while retrieving the branch name.",
            error.message,
            ["OK"],
            console.error,
            console.error
          );
        }
      },
    },
    {
      label: "Open Git Repository .. ( Browser ) ",
      click: () => openBrowser("https://github.com/nice-cxone/webapp-as"),
    },
  ];
};

module.exports = createGitMenu;
