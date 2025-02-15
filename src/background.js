'use strict'

import { app, protocol, BrowserWindow, ipcMain,Tray,Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
let path = require('path');
let dbus = require("dbus-next")
let probject , bus, ahenk, message
async function getObject(){
  bus= dbus.sessionBus();
  probject = await bus.getProxyObject("org.ahenkdesk.dbus.Daemon","/org/ahenkdesk/dbus/Daemon");
  ahenk = probject.getInterface("org.ahenkdesk.dbus.Daemon")
}

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow,tray;
async function createWindow() {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // frame:false,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})
function delay(waitTime){
  return new Promise((resolve) => setTimeout(function(){resolve();}, waitTime))
}

async function getMessage(){
  while(true){
    if(ahenk !== undefined){
      message = await ahenk.messageIncome();
    }
    console.log(message)
    await delay(3000)
  }
}

app.whenReady().then(()=>{
  getObject(); // dbus objesi tanımlanıyor
  getMessage(); //  ahenk tarafından gelen mesajlar kontrol ediliyor
  tray = new Tray('./src/assets/tray.png')
  const contextMenu = Menu.buildFromTemplate([
   {
    label:"çıkış yap",
    role: 'quit'
   }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.addListener("click",()=>{
    mainWindow.show()
  })
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


ipcMain.on("topright:min",()=>{
    mainWindow.minimize()
})
ipcMain.on("topright:close",()=>{
  mainWindow.hide();
})
ipcMain.on("topright:max",()=>{
  if(mainWindow.fullScreen == true){
    mainWindow.setFullScreen(false);
  }else{
    mainWindow.setFullScreen(true);  
    mainWindow.webContents.toggleDevTools();
  }
  })
  ipcMain.on("dbus:send",(e,array)=>{
    console.log(ahenk.messageSend(array));
  })

