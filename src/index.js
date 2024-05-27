//Dependencies
const chalk = require("chalk")
const DiscordRPC = require('discord-rpc');
const hmc = require('hmc-win32');
const clientId = '1137949966921371738';

//rich presence initialization
DiscordRPC.register(clientId);

var rpc = new DiscordRPC.Client({ transport: 'ipc' });
var startTimestamp = new Date();

async function setActivity() {
  rpc.setActivity({
    details: `ok`,
    state: 'Listening to music',
    startTimestamp,
    largeImageKey: 'netease',
    largeImageText: 'wow',
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);