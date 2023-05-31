const fs = require("fs").promises;
const path = require("path");

async function readConfigurationJson() {
  let configurationJsonSrc;
  let configurationJsonModule;

  const pathSrc = path.join("C:", "Works", "webapp-as", "src", "assets", "conf");
  const pathModules = path.join("C:", "Works", "webapp-as", "modules", "infrastructure", "configuration");

  try {
    const contentSrc = await fs.readFile(path.join(pathSrc, "configuration.json"), "utf8");
    const contentModules = await fs.readFile(path.join(pathModules, "configuration.json"), "utf8");

    const jsonSrc = JSON.parse(contentSrc);
    const jsonModules = JSON.parse(contentModules);

    configurationJsonSrc = Object.entries(jsonSrc.versions).map(([version, data]) => ({ version, ...data }));
    configurationJsonModule = Object.entries(jsonModules.versions).map(([version, data]) => ({ version, ...data }));
    
    for (const version of configurationJsonModule) {
      const found = configurationJsonSrc.some(item => item.version === version.version);
      if (!found) {
        configurationJsonSrc.unshift(version);
      }
    }
    return configurationJsonSrc;
  } catch (error) {
    console.error("Error reading file:", error);
  }

  // return configurationJson;
}

module.exports = readConfigurationJson;
