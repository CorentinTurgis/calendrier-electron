// src/main.ts
import { app, BrowserWindow } from 'electron';
import { createConnection } from 'typeorm';
import { Event } from './entity/Event';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
};

app.whenReady().then(async () => {
  await createConnection({
    type: 'sqlite',
    database: 'events.sqlite',
    synchronize: true,
    logging: false,
    entities: [Event]
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
