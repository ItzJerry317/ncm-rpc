//Dependencies
const chalk = require("chalk")
const DiscordRPC = require('discord-rpc');
const hmc = require('hmc-win32');
const clientId = '1137949966921371738';
const ncm = require("./ncm.js")

//ncm song fetch
var ncmpid = ncm.getNCMPid()
var ncmSong = ncm.getSong(ncmpid)
var songname = ncmSong.split(" - ")
console.log(chalk.yellow(ncmSong))

//rpc detail, state管理
var state, detail
if (ncmSong == "网易云音乐"){
  state = "Finding music"
  detail = "hmm"
} else {
  state = "Listening to music"
  detail = ncmSong
}

//rich presence initialization
DiscordRPC.register(clientId);

var rpc = new DiscordRPC.Client({ transport: 'ipc' });
var startTimestamp = new Date();

async function setActivity() {
  rpc.setActivity({
    details: detail,
    state: state,
    startTimestamp,
    largeImageKey: 'https://p2.music.126.net/anGmYEbxBunenbY3cuLm_w==/109951169518974669.jpg',
    largeImageText: detail,
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();
});

rpc.login({ clientId }).catch(console.error);