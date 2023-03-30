const fs = require("fs");

function readScriptsFromPackageJson(path) {
  const myScripts = [];

  try {
    const packageJsonContent = fs.readFileSync(path + "/package.json", "utf8");

    const packageJson = JSON.parse(packageJsonContent);

    const scripts = packageJson.scripts || {};

    for (const script in scripts) {
      myScripts.push(script);
    }
  } catch (error) {
    console.error("Error reading package.json file:", error);
  }

  return myScripts;
}

module.exports = readScriptsFromPackageJson;
