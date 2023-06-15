


const runShellCommand = require("../runCommand/runShellCommand");

window.onload = function () {

  const scriptsList = document.getElementById("scripts");


  [
    "build",
    "builddev",
    "dev",
    "dev-serve",
    "test",
    "jest",
    "cy",
    "cy:dev",
    "cy:component",
    "cy:integration",
    "cy:sanity",
    "cy:qualityGate",
    "cy:e2e1",
    "cy:e2e2",
    "cy:e2e3",
    "cy:e2e4",
    "cy:e2e5",
    "cy:e2e6",
    "cy:e2e7",
    "cy:e2e",
    "cy:nightly"
  ].forEach(element => {
    const card = document.createElement("li");
    card.classList.add("collection-item");

    const title = document.createElement("h4");
    title.innerHTML =
      element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();

    title.classList.add("card-title");

    const body = document.createElement("p");

    card.appendChild(title);
    card.appendChild(body);

    card.onclick = function () {
      runShellCommand("npm run " + element);
    };

    scriptsList.appendChild(card);
  });

};



























// const { ipcRenderer } = require("electron");
// ipcRenderer.send("run-script", script);