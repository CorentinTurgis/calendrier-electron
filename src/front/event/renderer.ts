import { CalendarEvent } from '../interfaces/CalendarEvent';
import { printList } from '../utils';

const trRes: HTMLElement | null = document.getElementById('res');

function renewAff() {
  window.electron.getAllEvents().then((events: CalendarEvent[]) => {
    if (trRes) {
      printList(trRes, events, (id: number) => {
        return () => {
          //envoyer un message pour supp
          window.electron.deleteEvent(id);
          renewAff();
        };
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renewAff();
});
