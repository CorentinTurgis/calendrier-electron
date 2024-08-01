import { CalendarEvent } from '../interfaces/CalendarEvent';

type evtCb = () => void

export function printList(trRes: HTMLElement, events: CalendarEvent[], cbDel: (id: number) => evtCb): void {
  if (trRes) {
    trRes.innerHTML = '';
  }
  for (const event of events) {
    printLine(event, events, trRes, cbDel);
  }
}

export function printLine(event: CalendarEvent, events: CalendarEvent[], trRes: HTMLElement, cbDel: (id: number) => evtCb): void {
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