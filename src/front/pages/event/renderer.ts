import { CalendarEvent } from '../../interfaces/CalendarEvent';
import { printList } from '../../utils/index.js';

const trRes: HTMLElement | null = document.getElementById('res');

function renewAff() {
  console.log("test");
  window.electron.getAllEvents().then((events: CalendarEvent[]) => {
    if (trRes) {
      printList(trRes, events, (id: number) => {
        return () => {
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
