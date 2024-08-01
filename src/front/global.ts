import { CalendarEvent } from './interfaces/CalendarEvent';

export {};
declare global {
  interface Window {
    'electron': {
      addEvent: (event: CalendarEvent) => Promise<string>
      getAllEvents: () => Promise<CalendarEvent[]>
      getEventsByMonth: (month?: number, year?: number) => Promise<CalendarEvent[]>
      deleteEvent: (id: number) => Promise<string>
      openAddEventWindow: (startDate: string, endDate: string) => void,
      prefillDates: (callback: (startDate: string, endDate: string) => void) => void,
      refreshCalendar: () => void,
      onRefreshCalendar: (callback: () => void) => void,
    };
  }
}
