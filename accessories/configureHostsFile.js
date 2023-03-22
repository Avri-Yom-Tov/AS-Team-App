const fs = require('fs');
const { dialog } = require('electron');

const HOSTS_FILE_PATH = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

function addToHostsFile(ip, hostname) {
  const content = fs.readFileSync(HOSTS_FILE_PATH, 'utf8');

  const pattern = new RegExp(`^${ip}\\s+${hostname}$`, 'm');
  if (pattern.test(content)) {
    throw new Error(`The line "${ip} ${hostname}" already exists in the hosts file !`);
  }

  const line = `${ip} ${hostname}\n`;
  fs.appendFileSync(HOSTS_FILE_PATH, line);

  return `SUCCESS! The line "${ip} ${hostname}" has been added to the hosts file !`;
}

async function configureHostsFile() {
  try {
    const message = addToHostsFile('127.0.0.1', 'na1.dev.localhost');
    await dialog.showMessageBox({
      type: 'info',
      title: 'Add to hosts file',
      message,
      buttons: ['OK'],
    });
  } catch (error) {
    await dialog.showMessageBox({
      type: 'info',
      title: 'Add to hosts file',
      message: error.message,
      buttons: ['OK'],
    });
  }
}

module.exports = configureHostsFile;
