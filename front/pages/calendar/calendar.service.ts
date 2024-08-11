import { MyDate } from '../../utils/MyDate.class.js';
import { EventService } from './../../services/event.service.js';

export class CalendarService {
  myDate: MyDate;
  calendar: HTMLElement | null;
  eventService: EventService;
  monthNavigation: HTMLElement | null;

  constructor(calendar: HTMLElement, year?: number, month?: number) {
    this.myDate = new MyDate(year, month);
    this.eventService = new EventService();
    this.calendar = calendar;
    this.monthNavigation = document.createElement('div');
    this.monthNavigation.className = 'month-navigation';
    if (this.calendar.parentElement) {
      this.calendar.parentElement.insertBefore(this.monthNavigation, this.calendar);
    }
    this.appendMonthNavigation(); 
  }

  private appendMonthNavigation() {
  
    this.monthNavigation!.innerHTML = '';

    const prevButton: HTMLButtonElement = document.createElement('button');
    prevButton.className = 'prev-button';
    prevButton.textContent = '←';
    prevButton.addEventListener('click', () => this.changeMonth(-1));

    const nextButton: HTMLButtonElement = document.createElement('button');
    nextButton.className = 'next-button';
    nextButton.textContent = '→';
    nextButton.addEventListener('click', () => this.changeMonth(1));

    const monthLabel: HTMLSpanElement = document.createElement('span');
    monthLabel.className = 'month-label';
    monthLabel.textContent = `${this.myDate.monthName} ${this.myDate.year}`;

    this.monthNavigation!.appendChild(prevButton);
    this.monthNavigation!.appendChild(monthLabel);
    this.monthNavigation!.appendChild(nextButton);
  }

  private updateMonthLabel() {
    const monthLabel = this.monthNavigation!.querySelector('.month-label') as HTMLSpanElement;
    if (monthLabel) {
      monthLabel.textContent = `${this.myDate.monthName} ${this.myDate.year}`;
    }
  }

  private changeMonth(offset: number) {
    const newMonthIndex = this.myDate.monthIndex + offset;
    if (newMonthIndex < 0) {
      this.setNewDate(this.myDate.year - 1, 11);
    } else if (newMonthIndex > 11) {
      this.setNewDate(this.myDate.year + 1, 0);
    } else {
      this.setNewDate(this.myDate.year, newMonthIndex);
    }
    this.updateMonthLabel();
    this.loadCalendar();
  }

  private appendDayHeaders() {
    this.myDate.daysOfWeek.forEach(day => {
      const dayHeader: HTMLDivElement = document.createElement('div');
      dayHeader.className = 'day-header';
      dayHeader.textContent = day;
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
      dayNumber.textContent = day.toString();
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
