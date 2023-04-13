const runShellCommand = require("../runCommand/runShellCommand");
const runCommandAsync = require("../runCommand/runCommandAsync");
const openBrowser = require("../utils/openBrowser");
const showGenericDialog = require("../utils/showGenericDialog");
const copyToClipboard = require("../utils/copyToClipboard");

const createGitMenu = () => {
  return [
    {
      label: "Get Latest Changes ( Master )",
      click: () => runShellCommand("git pull origin master"),
    },
    {
      label: "Get Latest Changes ( Current )",
      click: () => runShellCommand("git pull"),
    },
    { type: "separator" },
    {
      label: "What Branch am I on ? ( Git )",
      click: async () => {
        // runShellCommand("git rev-parse --abbrev-ref HEAD")
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
