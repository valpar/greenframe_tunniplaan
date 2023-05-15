import { createPool, Pool, PoolConnection, PoolOptions } from 'mysql2/promise';
import winston from 'winston';

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

  
export default pool;