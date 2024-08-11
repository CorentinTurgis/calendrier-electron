import { CalendarService } from './calendar.service.js';

const calendar = document.getElementById('calendar');

if (calendar) {
  const calendarService = new CalendarService(calendar);

  // @ts-ignore
  window.electron.onRefreshCalendar(() => calendarService.loadCalendar());
  calendarService.loadCalendar();
}
