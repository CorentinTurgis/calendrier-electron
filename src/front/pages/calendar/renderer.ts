import { CalendarService } from './calendar.service.js';

const calendar: HTMLElement | null= document.getElementById('calendar');

if (calendar) {
  const calendarService: CalendarService = new CalendarService(calendar);

  // @ts-ignore
  window.electron.onRefreshCalendar(calendarService.loadCalendar);
  calendarService.loadCalendar();
}
