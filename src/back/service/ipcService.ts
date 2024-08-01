import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import { CalendarEvent } from '../../front/interfaces/CalendarEvent.js';
import { addEvent, deleteEvent, getAllEvents } from '../models/calendarEvent.js';
import { QueryError } from 'mysql2';

ipcMain.handle('add-event', async (evt: IpcMainInvokeEvent, event: CalendarEvent): Promise<string> => {
  const win: BrowserWindow | null = BrowserWindow.fromWebContents(evt.sender);
  await addEvent(event);
  if (win) {
    win.close();
  }
  return 'Event added successfully.';
});

ipcMain.handle('get-all-events', async (): Promise<CalendarEvent[]> => {
  const events: CalendarEvent[] | QueryError = await getAllEvents();
  if (Array.isArray(events)) {
    return events;
  }
  return [];
});

ipcMain.handle('delete-event', async (evt: IpcMainInvokeEvent, id: number): Promise<string> => {
  await deleteEvent(id);
  return "";
});
