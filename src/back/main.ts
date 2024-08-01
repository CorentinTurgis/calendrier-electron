import { app, BrowserWindow, ipcMain } from 'electron';
import { createWindow, createAddEventWindow } from './utils/createWindow.js';
import { windows } from './utils/windows.js';
import './service/ipcService.js';

app.whenReady().then(() => {
  const win: BrowserWindow = createWindow();
  windows.push(win);

  ipcMain.on('open-add-event-window', (event, { startDate, endDate}) => {
    createAddEventWindow(win, startDate, endDate);
  });

  ipcMain.on('refresh-calendar', () => {
      win.reload();

  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
