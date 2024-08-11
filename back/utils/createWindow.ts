import { BrowserWindow } from 'electron';
import { join } from 'path';

export function createWindow(parent?: BrowserWindow): BrowserWindow {
  const mainWindow: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 400,
    minWidth: 600,
    maxHeight: 768,
    maxWidth: 1024,
    minimizable: false,
    parent: parent,
    webPreferences: {
      preload: join(__dirname, '../preload.js'),
    },
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('./src/front/pages/calendar/calendar.html');

  return mainWindow;
}

export function createAddEventWindow(parent?: BrowserWindow, startDate?: string, endDate?: string): BrowserWindow {
  const addEventWindow: BrowserWindow = new BrowserWindow({
    width: 400,
    height: 700,
    minHeight: 700,
    minWidth: 400,
    parent: parent,
    webPreferences: {
      preload: join(__dirname, '../preload.js'),
    },
  });

  addEventWindow.webContents.on('did-finish-load', () => {
    addEventWindow.webContents.send('pre-fill-dates', { startDate, endDate });
  });

  addEventWindow.webContents.openDevTools();
  addEventWindow.loadFile('./src/front/pages/addEvent/addEvent.html');

  return addEventWindow;
}
