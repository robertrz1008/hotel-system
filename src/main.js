const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('node:path')
const PDFWindow = require("electron-pdf-window")

Menu.setApplicationMenu(null);
function createWindow(){
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 600,
    show: false,
    icon: path.join(__dirname, '/icon/anillo.png'),
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('./src/frontend/index.html')

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize()
  })
}

function PDFWindowBuild(){
  const win = new PDFWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, '/icon/anillo.png'),
  })
 
  win.loadURL(path.join(__dirname, '/lib/report.pdf'))
}

module.exports = {
  createWindow,
  PDFWindowBuild,
}