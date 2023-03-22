const { shell } = require("electron");

function playRandomPlaylist() {
  const url = `https://www.youtube.com/watch?v=kaoqCARilbA&list=RDGMEM8h-ASY4B42jYeBhBnqb3-w&start_radio=1`;

  shell.openExternal(url);
}

module.exports = playRandomPlaylist;
