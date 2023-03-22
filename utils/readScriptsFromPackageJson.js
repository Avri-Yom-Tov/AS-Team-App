const fs = require("fs");

function readScriptsFromPackageJson(path) {
  const myScripts = [];

  try {
    // Read the contents of the package.json file
    const packageJsonContent = fs.readFileSync(path + "/package.json", "utf8");

    // Parse the JSON content to an object
    const packageJson = JSON.parse(packageJsonContent);

    // Extract the scripts object from the package.json object
    const scripts = packageJson.scripts || {};

    // Add each script to the myScripts array
    for (const script in scripts) {
      myScripts.push(script);
    }
  } catch (error) {
    console.error("Error reading package.json file:", error);
  }

  // Return the list of scripts
  return myScripts;
}

module.exports = readScriptsFromPackageJson;
