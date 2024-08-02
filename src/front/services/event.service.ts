import { CalendarEvent } from '../interfaces/CalendarEvent';
import { MyDate } from '../utils/MyDate.class';

export class EventService {
  private getAllEvents(month?: number, year?: number): Promise<CalendarEvent[]> {
    // @ts-ignore
    return window.electron.getAllEvents(month, year);
  }

  loadEvents(calendar: HTMLElement, myDate: MyDate) {
    this.getAllEvents(myDate.monthIndex, myDate.year).then(events => {
      events.forEach(event => {
        const eventStartDate: Date = new Date(event.start);
        const eventDay: number = eventStartDate.getDate();
        const dayElements: NodeListOf<Element> = calendar.querySelectorAll('.day');
        const dayElement: Element = dayElements[eventDay - 1];

        if (dayElement) {
          const eventDiv: HTMLDivElement = document.createElement('div');
          eventDiv.className = 'event';

          const eventTitle: HTMLParagraphElement = document.createElement('p');
          eventTitle.innerText = event.title;
          const eventTime: HTMLParagraphElement = document.createElement('p');
          eventTime.innerText = `${eventStartDate.getHours()}:${eventStartDate.getMinutes().toString().padStart(2, '0')}`;

          eventDiv.appendChild(eventTitle);
          eventDiv.appendChild(eventTime);

          dayElement.appendChild(eventDiv);
        }
      });
    }).catch(error => {
      console.error('Erreur lors de la récupération des événements:', error);
    });
  }
}