const { ipcRenderer } = require("electron");

const readScriptsFromPackageJson = require("../utils/readScriptsFromPackageJson");

window.onload = function () {
  const path = "C:\\Works\\webapp-as";
  const scriptsList = document.getElementById("scripts");
  
  const ScriptsJson = readScriptsFromPackageJson(path);

  const excludedScripts = [
    "webdriver",
    "modules",
    "modulesDev",
    "build-local-distribution",
    "d",
    "pretest",
    "test:clean",
    "test:watch",
    "watch",
    "format",
    "storybook",
    "build-storybook",
    "cy:pipeline-dev",
    "cy:pipeline-test",
    "cy:pipeline-staging",
    "cy:syn_monitor",
    "cypress:pipeline-dev",
    "cypress:pipeline-test",
    "cypress:pipeline-staging",
    "cypress:integration",
  ];

  const myFavoriteScripts = ScriptsJson.filter(
    (script) => !excludedScripts.includes(script)
  );

  for (const script of myFavoriteScripts) {
    const card = document.createElement("li");
    card.classList.add("collection-item");

    const title = document.createElement("h4");
    title.innerHTML =
      script.charAt(0).toUpperCase() + script.slice(1).toLowerCase();

    title.classList.add("card-title");

    const body = document.createElement("p");

    card.appendChild(title);
    card.appendChild(body);

    card.onclick = function () {
      ipcRenderer.send("run-script", script);
    };

    scriptsList.appendChild(card);
  }
};
