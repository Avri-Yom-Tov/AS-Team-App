const fs = require('fs');

function updateVersions(filePath, newVersions, file) {
  return new Promise((resolve, reject) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file: ${err}`);
        return;
      }

      try {
        const config = JSON.parse(data);

        newVersions.forEach((version) => {
          if (config.versions[version.version]) {
            if (file === "configuration.json") {
      
              config.versions[version.version].minimumNativeVersion = version.minimumNativeVersion;
            }
            else
            {
              config.versions[version.version].AutomationStudio_version = version.minimumNativeVersion;
            }
          }
        });
        fs.writeFile(filePath, JSON.stringify(config, null, 2), (err) => {
          if (err) {
            reject(`Error writing file: ${err}`);
            return;
          }
          resolve('File updated successfully.');
        });
      } catch (error) {
        reject(`Error parsing JSON: ${error}`);
      }
    });
  });
}

module.exports = updateVersions;
