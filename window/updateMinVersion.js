const readConfigurationJson = require("../accessories/readConfigurationJson");
const updateVersions = require("../accessories/editMinVersion");
const { ipcRenderer } = require('electron');
const path = require("path");
const Swal = require('sweetalert2');

(async function () {
    let configurationData = await readConfigurationJson();
    function generateHTML() {
        var html = "";

        configurationData.forEach(function (obj, innerIndex) {
            html += '<div id="row">';

            html +=
                '<p id="version' +
                innerIndex +
                '" data-version="' +
                obj.version +
                '" class="center"><strong>Edit Version ' +
                obj.version +
                "  : </strong></p>     ";

            html +=
                '<label for="minimumNativeVersionMain' + innerIndex + '"></label>';
            html +=
                '<input type="txt" id="minimumNativeVersionMain' +
                innerIndex +
                '" value="' +
                obj.minimumNativeVersion.substring(
                    0,
                    obj.minimumNativeVersion.lastIndexOf(".")
                ) +
                '">               &         ';
            html +=
                '           <input type="number" id="minimumNativeVersionLast' +
                innerIndex +
                '" value="' +
                obj.minimumNativeVersion.match(/\d+$/)[0] +
                '">';
            html += "</div>";
        });

        return html;
    }

    function updateData() {
        var updatedData = [];

        configurationData.forEach((obj, innerIndex) => {
            var versionElement = document.getElementById("version" + innerIndex);
            var version = versionElement.dataset.version;
            var minimumNativeVersionMain = document.getElementById(
                "minimumNativeVersionMain" + innerIndex
            ).value;
            var minimumNativeVersionLast = document.getElementById(
                "minimumNativeVersionLast" + innerIndex
            ).value;

            updatedData.push({
                version: version,
                minimumNativeVersion: `${minimumNativeVersionMain}.${minimumNativeVersionLast}`,
            });
        });

        const pathSrc = path.join(
            "C:",
            "Works",
            "webapp-as",
            "src",
            "assets",
            "conf",
            "configuration.json"
        );
        const pathModules = path.join(
            "C:",
            "Works",
            "webapp-as",
            "modules",
            "infrastructure",
            "configuration",
            "configuration.json"
        );
        const pathApprovedInstaller = path.join(
            "C:",
            "Works",
            "webapp-as",
            "s3",
            "approvedInstaller",
            "AutomationStudio.json",
        );

        const updatePromises = [
            updateVersions(pathSrc, updatedData,"configuration.json" ),
            updateVersions(pathModules, updatedData, "configuration.json"),
            updateVersions(pathApprovedInstaller, updatedData, " AutomationStudio.json"),
        ];

        Promise.all(updatePromises)
            .then((messages) => {
                console.log(messages);
                Swal.fire({
                    title: 'Success!',
                    text: 'Configuration.json updated successfully ! ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    var html = generateHTML();
    var output = document.getElementById("output");
    var style = document.createElement("style");

    style.innerHTML = `
    .input-field {
      margin-bottom: 10px;
      text-align: center;
    }
    #row
    {
        margin-bottom : 10px;
    }
    p {
        display: contents;
    }
    .input-field label {
      font-weight: bold;
      text-align: center;
    }
  
    .input-field input {
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
    }
  

  
    body {
        font-family: "Roboto", sans-serif;
        font-size: 16px;
        line-height: 1.5;
        background-color: #f1f1f1;
        text-align: center;
      }
    }
  `;
    document.head.appendChild(style);
    output.innerHTML = html;

    document.getElementById("updateButton").addEventListener("click", updateData);


    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        ipcRenderer.send('navigate-to-main');
    });
})();
