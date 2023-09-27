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
const database_1 = __importDefault(require("../../database"));
const lecturerService = {
    getAllLecturers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [lecturers] = yield database_1.default.query('SELECT * FROM lecturers WHERE dateDeleted IS NULL');
            return lecturers;
        }
        catch (error) {
            // console.log(error);
            return false;
        }
    }),
    getLecturersSubjects: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [activeSubjects] = yield database_1.default.query(`SELECT CONCAT(lecturers.firstName," ",lecturers.lastName) AS fullName,
          (SELECT GROUP_CONCAT(subject) FROM subjects 
          WHERE lecturers.id = lecturers_id) AS activeSubjects 
          FROM lecturers INNER JOIN subjects ON lecturers.id = subjects.lecturers_id 
          WHERE lecturers.dateDeleted IS NULL 
          GROUP BY fullName, activeSubjects ORDER BY activeSubjects DESC;`);
            return activeSubjects;
        }
        catch (error) {
            return false;
        }
    }),
    getLecturerById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const lecturer = yield database_1.default.query('SELECT firstName, lastName FROM lecturers WHERE id = ? AND dateDeleted IS NULL', [id]);
            if (lecturer[0][0] !== undefined) {
                return lecturer[0];
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    deleteLecturerById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [index] = yield database_1.default.query('UPDATE lecturers SET dateDeleted = ? WHERE dateDeleted IS NULL AND id = ?', [new Date(), id]);
            if (index.affectedRows > 0) {
                return index.affectedRows;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    createlecturer: (newLecturer) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('INSERT INTO lecturers SET ? ', [Object.assign({}, newLecturer)]);
            return result.insertId;
        }
        catch (error) {
            return false;
        }
    }),
    updateLecturerById: (newLecturer, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [update] = yield database_1.default.query('UPDATE lecturers SET ? WHERE id = ?', [Object.assign({}, newLecturer), id]);
            if (update.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
};
exports.default = lecturerService;
