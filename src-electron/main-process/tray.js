import { Menu, Tray } from 'electron'
import { mainWindow } from './electron-main'

import path from 'path'
import log from 'electron-log'

const isDev = !process.env.PROD

export function tray() {
  // set tray
  let tray
  const icon = isDev ? path.join(__dirname, 'tray_icon.png')  : path.join(__statics, '/tray_icon.png')
  log.info('icon path: ', icon)

  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    {
      role: 'quit'
    }
  ])

  tray.setToolTip('Toggle SysInfo Window')
  tray.setContextMenu(contextMenu)

  tray.on('click', e => {
    if ( !mainWindow.isVisible() ) {
      mainWindow.show()
    } else {
      mainWindow.hide()
    }
  })

}
