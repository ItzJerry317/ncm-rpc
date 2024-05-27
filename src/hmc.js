//Dependencies
const chalk = require("chalk")
const hmc = require("hmc-win32");

//获取所有有效窗口pid
var windowPidsArray = [];
for (let Handle of hmc.getAllWindowsHandle() ) {
  if(!Handle.exists)continue;
  if(Handle.title === "")continue;
  var windowTitles = (Handle.title+" "+Handle.pid)
  windowPidsArray.push(Handle.pid) //将所有pid数字推进数组方便读取
}

//网易云（子）进程列表获取
var namelist = hmc.getProcessNameList("cloudmusic.exe")
if (namelist.length === 0) {
  console.log(chalk.red("未检测到网易云进程。请检查网易云是否打开或网易云进程名是否为cloudmusic.exe"))
} else {
  var ncmpid = undefined
  //比对（子）进程pid与有效窗口进程pid 查找网易云pid
  for (var i = 0; i < namelist.length; i++){
    for (var j = 0; j < windowPidsArray.length; j++){
      if (namelist[i].pid == windowPidsArray[j]) {
        console.log(chalk.green("成功找到网易云窗口进程! pid:"+namelist[i].pid))
        ncmpid = namelist[i].pid
      }
    }
  }
  if (ncmpid === undefined) {
    console.log(chalk.red("已检测到网易云进程，但未检测到网易云主窗口进程，请将网易云主窗口打开"))
  }
}

//进程标题获取
if (ncmpid != undefined) {
  var ncmTitle = hmc.getProcessHandle(ncmpid)
  console.log(chalk.green("Title: "+ncmTitle.title))
}