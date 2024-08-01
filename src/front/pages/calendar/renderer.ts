import { EventService } from './event.service.js';

const container: HTMLElement | null = document.getElementById('calendar');
const eventService = new EventService();

if (container) {
  const currentDate: Date = new Date();
  const currentMonth: number = currentDate.getMonth() + 1;
  const currentYear: number = currentDate.getFullYear();
  const firstDayOfMonth: number = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth: number = new Date(currentYear, currentMonth, 0).getDate();

  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  daysOfWeek.forEach(day => {
    const dayHeader: HTMLDivElement = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.innerText = day;
    container.appendChild(dayHeader);
  });

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay: HTMLDivElement = document.createElement('div');
    emptyDay.className = 'empty_day';
    container.appendChild(emptyDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement: HTMLDivElement = document.createElement('div');
    const dayNumber: HTMLParagraphElement = document.createElement('p');

    dayElement.className = 'day';
    dayNumber.innerText = day.toString();
    dayElement.appendChild(dayNumber);

    container.appendChild(dayElement);
  }

  // Récupérer et afficher les événements
  eventService.getAllEvents(currentMonth, currentYear).then(events => {
    events.forEach(event => {
      const eventStartDate: Date = new Date(event.start);
      const eventDay: number = eventStartDate.getDate();

      const dayElements: NodeListOf<Element> = container.querySelectorAll('.day');
      const dayElement: Element = dayElements[eventDay - 1];

      if (dayElement) {
        const eventDiv: HTMLDivElement = document.createElement('div');
        const eventTitle: HTMLParagraphElement = document.createElement('p');
        const eventTime: HTMLParagraphElement = document.createElement('p');

        eventTitle.innerText = event.title;
        eventTime.innerText = `${eventStartDate.getHours()}:${eventStartDate.getMinutes().toString().padStart(2, '0')}`;

        eventDiv.className = 'event';
        eventDiv.appendChild(eventTitle);
        eventDiv.appendChild(eventTime);

        dayElement.appendChild(eventDiv);
      }
    });
  }).catch(error => {
    console.error('Erreur lors de la récupération des événements:', error);
  });
}
