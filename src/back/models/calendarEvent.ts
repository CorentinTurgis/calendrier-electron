import { db } from './db.js';
import { QueryError, QueryResult } from 'mysql2';
import { CalendarEvent } from '../../front/interfaces/CalendarEvent.js';

export function getAllEvents(): Promise<CalendarEvent[] | QueryError> {
  console.log("hey");
  return new Promise((resolve, reject): void => {
    db.query('SELECT * FROM calendarEvents', (err: QueryError | null, res: QueryResult): void => {
      if (err) {
        reject(err);
      } else {
        resolve(res as CalendarEvent[]);
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
      ["test", "test"],
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
