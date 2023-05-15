import { createPool, Pool, PoolConnection, PoolOptions } from 'mysql2/promise';
import winston from 'winscd ton';

const poolOptions: PoolOptions = {
  host: "mysql_server",
  user: "admin",
  password: "parool",
  database: "scheduleDb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "UTF8MB4",
};

const pool: Pool = createPool(poolOptions);

// Loome Winston'i loggeri
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Logime konsooli
    // new winston.transports.File({ filename: 'queries.log' }) // Logime faili
  ],
  format: winston.format.simple()
});

// Loome MySQL-ühenduse
export async function createDatabaseConnection(): Promise<PoolConnection> {
  const connection = await pool.getConnection();

  // Logime päringud
  connection.on('enqueue', (query: string) => {
    logger.info(`Executing query: ${query}`);
    });
    
    // Käitleme vead
    connection.on('error', (error: Error) => {
    logger.error(`MySQL Error: ${error.message}`);
    });
    
    return connection;
    }
    
    export default pool;