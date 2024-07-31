import { CalendarEvent } from "./interfaces/CalendarEvent";

export { }
declare global {
  interface Window {
    "electron": {
      addEvent: (event: any) => Promise<string>
      getAllEvents: () => Promise<CalendarEvent[]>
      deleteEvent: (id: number) => Promise<string>
    }
  }
}
