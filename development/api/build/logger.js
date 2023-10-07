"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabaseConnection = exports.logToDatabase = exports.logger = void 0;
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const winston_1 = __importDefault(require("winston"));
const database_1 = __importDefault(require("./database"));
// Loome Winston'i loggeri
exports.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' }),
        new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }),
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
function logToDatabase(level, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield createDatabaseConnection();
        yield connection.execute('INSERT INTO log (level, message) VALUES (?, ?)', [level, message]);
        connection.release();
    });
}
exports.logToDatabase = logToDatabase;
function createDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.getConnection();
        // Logime päringud
        connection.on('enqueue', (query) => {
            exports.logger.info(`Executing query: ${query}`);
            logToDatabase('info', `Executing query: ${query}`);
        });
        // Käitleme vead
        connection.on('error', (error) => {
            exports.logger.error(`MySQL Error: ${error.message}`);
            logToDatabase('error', `MySQL Error: ${error.message}`);
        });
        return connection;
    });
}
exports.createDatabaseConnection = createDatabaseConnection;
exports.default = exports.logger;
