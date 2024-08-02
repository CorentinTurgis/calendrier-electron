import { MyDate } from '../../utils/MyDate.class.js';
import { EventService } from './../../services/event.service.js';

export class CalendarService {
  myDate: MyDate;
  calendar: HTMLElement | null;
  eventService: EventService;

  constructor(calendar: HTMLElement, year?: number, month?: number) {
    this.myDate = new MyDate(year, month);
    this.eventService = new EventService();
    this.calendar = calendar;
  }

  private appendDayHeaders() {
    this.myDate.daysOfWeek.forEach(day => {
      const dayHeader: HTMLDivElement = document.createElement('div');

      dayHeader.className = 'day-header';
      dayHeader.innerText = day;
      this.calendar!.appendChild(dayHeader);
    });
  }

  private appendEmptyDays() {
    for (let i = 0; i < this.myDate.firstDayOfMonth; i++) {
      const emptyDay: HTMLDivElement = document.createElement('div');

      emptyDay.className = 'empty-day';
      this.calendar!.appendChild(emptyDay);
    }
  }

  private appendDays() {
    for (let day = 1; day <= this.myDate.daysInMonth; day++) {
      const dayElement: HTMLDivElement = document.createElement('div');
      const dayNumber: HTMLParagraphElement = document.createElement('p');

      dayNumber.innerText = day.toString();
      dayElement.className = 'day';
      dayElement.appendChild(dayNumber);

      dayElement.addEventListener('click', () => {
        const startDate = new Date(this.myDate.year, this.myDate.monthIndex, day).toISOString();
        const endDate = new Date(this.myDate.year, this.myDate.monthIndex, day).toISOString();
        // @ts-ignore
        window.electron.openAddEventWindow(startDate, endDate);
      });

      this.calendar!.appendChild(dayElement);
    }
  }

  setNewDate(year?: number, month?: number) {
    this.myDate = new MyDate(year, month);
  }

  loadCalendar() {
    if (this.calendar) {
      this.calendar.innerHTML = '';
      this.appendDayHeaders();
      this.appendEmptyDays();
      this.appendDays();
      this.eventService.loadEvents(this.calendar, this.myDate);
    }
  }
}