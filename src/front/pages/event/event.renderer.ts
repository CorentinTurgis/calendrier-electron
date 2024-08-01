import { CalendarEvent } from '../../interfaces/CalendarEvent';
import { printList } from '../../utils/index.js';

const trRes: HTMLElement | null = document.getElementById('res');

function renewAff() {
  // @ts-ignore
  window.electron.getAllEvents().then((events: CalendarEvent[]) => {
    if (trRes) {
      printList(trRes, events);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renewAff();
});

