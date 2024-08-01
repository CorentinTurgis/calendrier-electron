import { CalendarEvent } from '../interfaces/CalendarEvent';

export function printList(trRes: HTMLElement, events: CalendarEvent[]): void {
  if (trRes) {
    trRes.innerHTML = '';
  }
  for (const event of events) {
    printLine(event, events, trRes);
  }
}

export function printLine(event: CalendarEvent, events: CalendarEvent[], trRes: HTMLElement): void {
  const tr: HTMLTableRowElement = document.createElement('tr');
  const tdId: HTMLTableCellElement = document.createElement('td');
  const tdName: HTMLTableCellElement = document.createElement('td');
  const tdDesc: HTMLTableCellElement = document.createElement('td');

  if (event.id) {
    tdId.innerHTML = event.id.toString();
  }
  tdName.innerHTML = event.title;
  tdDesc.innerHTML = event.short_desc;
  tr.append(tdId, tdName, tdDesc);
  trRes?.appendChild(tr);
}