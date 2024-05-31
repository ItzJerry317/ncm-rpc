//Dependencies
const chalk = require("chalk")
const DiscordRPC = require('discord-rpc');
const clientId = '1137949966921371738';
const ncm = require("./ncm.js")

var state, detail, ncmpid, ncmSong, songname
function songFetch() {
  //ncm song fetch
  ncmpid = ncm.getNCMPid()
  ncmSong = ncm.getSong(ncmpid)
  if (ncmSong != undefined) {
    //rpc detail, state管理
    if (ncmSong == "网易云音乐" && ncmSong.length == 1){
      state = "Finding music"
      detail = "hmm"
    } else {
      state = "Listening to music"
      detail = ncmSong //歌曲信息
    }
    return ncmSong
  }
  return -1
}

//rich presence initialization
DiscordRPC.register(clientId);

var rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function setActivity() {
  var startTimestamp = new Date();
  console.log(chalk.green("[Function setActivity()] 正在尝试设置discord activity……"))
  console.log(chalk.yellow("[Function setActivity()] 歌曲信息："+detail+", state: "+state))
  rpc.setActivity({
    details: detail,
    state: state,
    startTimestamp,
    largeImageKey: 'netease',
    largeImageText: detail,
    instance: false,
  });
}

rpc.on('ready', () => {
  //定时监听网易云标题变化
  var prevSongName = undefined
  var compare
  setInterval(() => {
    compare = songFetch()
    if (compare === -1) {
      console.log(chalk.red("设置DiscordRPC失败"))
      rpc.clearActivity()
    } else {
      if (prevSongName === undefined) {
        prevSongName = compare
        setActivity()
      } else if (prevSongName != compare) {
        console.log(chalk.green("检测到歌曲状态变化"))
        prevSongName = compare
        setActivity()
      }
    }
  }, 1000);
  // setActivity();
});

rpc.login({ clientId }).catch(console.error);