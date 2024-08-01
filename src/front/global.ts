import { CalendarEvent } from "./interfaces/CalendarEvent";

export { }
declare global {
  interface Window {
    "electron": {
      addEvent: (event: CalendarEvent) => Promise<string>
      getAllEvents: () => Promise<CalendarEvent[]>
      deleteEvent: (id: number) => Promise<string>
    }
  }
}
