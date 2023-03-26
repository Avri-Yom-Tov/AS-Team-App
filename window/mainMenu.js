const createGitMenu = require("../menus/createGitMenu");
const createDevToolsMenu = require("../menus/createDevToolsMenu");
const createTestMenu = require("../menus/createTestMenu");
const createAppMenu = require("../menus/createAppMenu");


const menu = [
  { label: "Git", submenu: createGitMenu() },
  { label: "Test", submenu: createTestMenu() },
  { label: "Developer ", submenu: createDevToolsMenu() },
  { label: "Application", submenu: createAppMenu() },
];

module.exports = menu;
