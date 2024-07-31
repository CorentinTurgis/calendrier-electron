import { BrowserWindow, Menu } from "electron"
import { join } from 'node:path'

export function createWindow(parent?: BrowserWindow, princ: boolean = true): BrowserWindow {
  // Create the browser window.
  const modal = !princ

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 400,
    minWidth: 600,
    maxHeight: 768,
    maxWidth: 1024,
    minimizable: false,
    parent: parent,
    // modal: modal,
    webPreferences: {
      preload: join(__dirname, '../preload.js')
    }
  })
  mainWindow.webContents.openDevTools()
  if (princ) {
    mainWindow.loadFile('./pages/user.html')
  }
  else {
    mainWindow.loadFile('./pages/addUser.html')
    mainWindow.removeMenu()
  }

  mainWindow.webContents.openDevTools()
  return mainWindow
}