import mysql from "mysql2";

const pool = mysql
  .createPool({
  host: "mysql_server",
  user: "admin",
  password: "parool",
  database: "scheduleDb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "UTF8MB4",
  })
  .promise();


export default pool;