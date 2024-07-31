// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import { createWindow } from './utils/createWindow';
import { windows } from './utils/windows';
import './service/ipcService';

app.whenReady().then(() => {
  const win: BrowserWindow = createWindow();
  windows.push(win);
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
