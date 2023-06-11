/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import winston from 'winston';
import { PoolConnection } from 'mysql2/promise';
import pool from './database';

// Loome Winston'i loggeri

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
  //
  // - Write all logs with importance level of `error` or less to `error.log`
  // - Write all logs with importance level of `info` or less to `combined.log`
  //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// export const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(), // Logime konsooli
//     new winston.transports.File({ filename: 'queries.log' })
//     new winston.transports.File({ filename: 'errors.log'})// Logime faili
//   ],
//   format: winston.format.simple()
// });

export async function logToDatabase(level: string, message: string): Promise<void> {
  const connection = await createDatabaseConnection();

  await connection.execute('INSERT INTO log (level, message) VALUES (?, ?)', [level, message]);

  connection.release();
}

export async function createDatabaseConnection(): Promise<PoolConnection> {
  const connection = await pool.getConnection();

  // Logime päringud
  connection.on('enqueue', (query: string) => {
    logger.info(`Executing query: ${query}`);
    logToDatabase('info', `Executing query: ${query}`);
  });

  // Käitleme vead
  connection.on('error', (error: Error) => {
    logger.error(`MySQL Error: ${error.message}`);
    logToDatabase('error', `MySQL Error: ${error.message}`);
  });

  return connection;
}

export default logger;
