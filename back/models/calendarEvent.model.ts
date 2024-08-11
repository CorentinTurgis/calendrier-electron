import { db } from './db.js';
import { QueryError, QueryResult } from 'mysql2';
import { CalendarEvent } from '../../front/interfaces/CalendarEvent.js';

export function getAllEvents(): Promise<CalendarEvent[] | QueryError> {
  return new Promise((resolve, reject): void => {
    db.query('SELECT * FROM events', (err: QueryError | null, res: QueryResult): void => {
      if (err) {
        reject(err);
      } else {
        const events: CalendarEvent[] = (res as CalendarEvent[]).map((event: any) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          short_desc: event.short_desc,
          color: event.color,
        }));
        resolve(events);
      }
    });
  });
}

export function getEventsByMonth(month?: number, year?: number): Promise<CalendarEvent[] | QueryError> {
  return new Promise((resolve, reject): void => {
    const now: Date = new Date();
    const currentMonth: number = month !== undefined ? month : now.getMonth() + 1;
    const currentYear: number = year !== undefined ? year : now.getFullYear();

    const startDate: string = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
    const endDate: string = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];

    const query: string = `
      SELECT * FROM events
      WHERE start >= ? AND start < DATE_ADD(?, INTERVAL 1 MONTH);
    `;
    const values: string[] = [startDate, startDate];

    db.query(query, values, (err: QueryError | null, res: QueryResult): void => {
      if (err) {
        reject(err);
      } else {
        const events: CalendarEvent[] = (res as CalendarEvent[]).map((event: any) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          short_desc: event.short_desc,
          color: event.color,
        }));
        resolve(events);
      }
    });
  });
}

export function getEventById(id: number): Promise<CalendarEvent[] | QueryError> {
  return new Promise((resolve, reject): void => {
    db.query('SELECT * FROM calendarEvents WHERE id=?',
      [id],
      (err: QueryError | null, res: QueryResult): void => {
        if (err) {
          reject(err);
        } else {
          resolve(res as CalendarEvent[]);
        }
      });
  });
}

export function addEvent(event: CalendarEvent): Promise<any> {
  console.log(JSON.stringify(event));
  return new Promise((resolve, reject): void => {
    const query: string = `
      INSERT INTO events (title, start, end, short_desc, color)
      VALUES (?, ?, ?, ?, ?);
    `;
    const values: string[] = [event.title, event.start, event.end, event.short_desc, event.color];

    db.query(query, values, (err: QueryError | null, res: QueryResult): void => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function deleteEvent(id: number): Promise<any> {
  return new Promise((resolve, reject): void => {
    db.query('DELETE FROM calendarEvents WHERE id=?',
      [id],
      (err: QueryError | null, res: QueryResult): void => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}
