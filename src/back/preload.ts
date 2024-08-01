import { contextBridge, ipcRenderer } from 'electron';
import { CalendarEvent } from '../front/interfaces/CalendarEvent';

contextBridge.exposeInMainWorld('electron', {
  addEvent: (event: CalendarEvent) => ipcRenderer.invoke('add-event', event),
  getAllEvents: () => ipcRenderer.invoke('get-all-events'),
  getEventsByMonth: (event: CalendarEvent) => ipcRenderer.invoke('get-event-by-month'),
  deleteEvent: (id: number) => ipcRenderer.invoke('delete-event', id),
});
