"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
/*
const pool = mysql
  .createPool({
    host: 'mysql_server',
    user: 'admin',
    password: 'parool',
    database: 'scheduleDb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'UTF8MB4',
  })
  .promise();
*/
const pool = mysql2_1.default.createPool({
    host: process.env.HOST,
    user: 'admin',
    password: 'parool',
    database: 'scheduleDb',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    charset: 'UTF8MB4',
}).promise();
exports.default = pool;
