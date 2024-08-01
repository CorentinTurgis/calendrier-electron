import { contextBridge, ipcRenderer } from 'electron';
import { CalendarEvent } from '../front/interfaces/CalendarEvent';

contextBridge.exposeInMainWorld('electron', {
  addEvent: (event: CalendarEvent) =>
    ipcRenderer.invoke('add-event', event),

  getAllEvents: () =>
    ipcRenderer.invoke('get-all-events'),

  getEventsByMonth: (event: CalendarEvent) =>
    ipcRenderer.invoke('get-event-by-month'),

  deleteEvent: (id: number) =>
    ipcRenderer.invoke('delete-event', id),

  openAddEventWindow: (startDate: string, endDate: string) =>
    ipcRenderer.send('open-add-event-window', { startDate, endDate }),

  prefillDates: (callback: (startDate: string, endDate: string) => void) =>
    ipcRenderer.on('pre-fill-dates', (event, { startDate, endDate }) => callback(startDate, endDate)),

  refreshCalendar: () =>
    ipcRenderer.send('refresh-calendar'),

  onRefreshCalendar: (callback: () => void) =>
    ipcRenderer.on('refresh-calendar', callback),
});
