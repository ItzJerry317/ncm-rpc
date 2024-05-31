const { app, BrowserWindow, ipcMain } = require('electron')
const hmc = require("hmc-win32")
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('./web/index.html')
}

app.whenReady().then(() => {
  if (process.platform == "win32") {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
  } else {
    hmc.alert("该软件仅可在Windows系统中运行！", "错误")
    process.exit(0)
  }
})