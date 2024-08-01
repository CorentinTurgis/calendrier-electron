import { BrowserWindow } from 'electron';
import { join } from 'path';

export function createWindow(parent?: BrowserWindow): BrowserWindow {
  // Create the browser window.

  const mainWindow: BrowserWindow = new BrowserWindow({
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
      preload: join(__dirname, '../preload.js'),
    },
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('./src/front/pages/calendar/calendar.html');

  mainWindow.webContents.openDevTools();
  return mainWindow;
}