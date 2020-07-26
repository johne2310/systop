import { alertLevel, mainWindow, warningLevel } from './electron-main'

import si from 'systeminformation'
import { Notification } from 'electron'
import log from 'electron-log'

export let cpuUsage

export function setDynamicData() {
  log.info('alertLevel from Data: ', alertLevel)

  //run the dynamic system info function at 2 second intervals
  setInterval(() => {
    //define object we need
    const valueObject = {
      currentLoad: 'currentload_user',
      mem: 'total, free, used',
      time: 'uptime',
      cpu: '*'
    }

    // send system info object to ipcRenderer in App.vue
    si.get(valueObject).then(data => {
      mainWindow.webContents.send('sysinfo:dynamic', data)
      cpuUsage = data.currentLoad.currentload_user
    })

  }, 2000)
}

export function setStaticData() {
//define object we need
  const valueObject = {
    osInfo: 'platform, release, codename',
  }

  // send system info object to ipcRenderer in App.vue
  si.get(valueObject).then(data => {
    mainWindow.webContents.send('sysinfo:static', data)
  })
}

export function showCPUWarning() {

  log.info('alertLevel from Data: ', alertLevel)

  setInterval(() => {
    const cpuNotification = new Notification({
      title: 'CPU Warning',
      body: 'The CPU is operating above the set warning threshold',
      urgency: 'critical'
    })
    if ( cpuUsage >= warningLevel ) {
      log.info('Compare: ', cpuUsage, warningLevel, alertLevel)
      cpuNotification.show()
    }
  }, alertLevel )


}

