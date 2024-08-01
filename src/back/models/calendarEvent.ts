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
  return new Promise((resolve, reject): void => {
    db.query('INSERT INTO calendarEvents (name, `description`) VALUES (?,?);',
      ['test', 'test'],
      (err: QueryError | null, res: QueryResult): void => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      },
    );
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
