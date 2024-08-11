import { Connection, createConnection } from 'mysql2';

export const db: Connection = createConnection({
  host: 'localhost',
  user: 'test',
  password: 'Rootroot51',
  database: 'my_calendar',
});
