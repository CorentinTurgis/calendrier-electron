import { CalendarEvent } from '../../interfaces/CalendarEvent';

export class EventService {
  getAllEvents(month?: number, year?: number): Promise<CalendarEvent[]> {
    // @ts-ignore
    return window.electron.getAllEvents(month, year);
  }
}