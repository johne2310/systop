import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'

import { tray } from './tray'
import path from 'path'
import log from 'electron-log'

import { cpuUsage, setDynamicData, setStaticData, showCPUWarning } from './data'

const si = require('systeminformation')
nativeTheme.themeSource = 'system'

const isMac = process.platform === 'darwin'
const isDev = !process.env.PROD

try {
  if ( process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true ) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
}
catch (_) {
}

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if ( process.env.PROD ) {
  // global.__statics = __dirname
  global.__statics = path.join(__dirname, 'statics')   //.replace(/\\/g, '\\\\')
}

export let mainWindow
// let cpuUsageRead = cpuUsage
export let warningLevel
export let alertLevel

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: isDev ? 800 : 350,
    height: 400,
    useContentSize: true,
    opacity: 0.9,
    resizable: isDev,
    webPreferences: {
      // Change from /quasar.conf.js > electron > nodeIntegration;
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: process.env.QUASAR_NODE_INTEGRATION,
      nodeIntegrationInWorker: process.env.QUASAR_NODE_INTEGRATION,

      //use preload to access ipcRenderer in App.vue
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, 'electron-preload.js')
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // run data functions after loading is finished in order to capture all data
  mainWindow.webContents.on('did-finish-load', () => {

    //create tray
    tray()

    //run the dynamic system info function at 2 second intervals(from data.js)
    setDynamicData()

    //run the static system info function once (from data.js)
    setStaticData()

    log.info('Alert from did finish', alertLevel)
    // check alert level exists before running warning function (from data.js)
    // if alertlevel is undefined then notication will fire repeatedly
    if ( alertLevel ) {
      showCPUWarning()
    }
  })
}

app.on('ready', () => {

    //create mainWindow
    createWindow()

  }
)

app.on('window-all-closed', () => {
  if ( process.platform !== 'darwin' ) {
    app.quit()
  }
})

app.on('activate', () => {
  if ( mainWindow === null ) {
    createWindow()
  }
})

ipcMain.on('sysinfo:warning', (e, warning) => {
  warningLevel = warning
  log.info('warning: ', warningLevel, cpuUsage)
})

ipcMain.on('sysinfo:alert', (e, alert) => {
  alertLevel = alert * 60 * 1000
  log.info('Alert frequency: ', alertLevel)
})






