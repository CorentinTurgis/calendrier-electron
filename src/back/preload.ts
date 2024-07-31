import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  addEvent: (calendarEvent: any) => ipcRenderer.invoke('add-event', { }),
  getAllEvent: () => ipcRenderer.invoke('get-all-events'),
  deleteEvent: (id: number) => ipcRenderer.invoke('delete-event', id),
});
