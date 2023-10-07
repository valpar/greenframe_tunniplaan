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
const subjectServices = {
    getAllSubjects: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [subjects] = yield database_1.default.query('SELECT * FROM subjects WHERE dateDeleted is NULL');
            return subjects;
        }
        catch (error) {
            return false;
        }
    }),
    getSubjectById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [subject] = yield database_1.default.query('SELECT id, subject, subjectCode, creditPoint, dateCreated, dateUpdated, dateDeleted FROM subjects WHERE id = ? AND dateDeleted is NULL', [id]);
            return subject[0];
        }
        catch (error) {
            return false;
        }
    }),
    createSubject: (subjectData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('INSERT INTO subjects (subject, subjectCode, creditPoint) VALUES (?, ?, ?)', [subjectData.subject, subjectData.subjectCode, subjectData.creditPoint]);
            return result.insertId;
        }
        catch (error) {
            return false;
        }
    }),
    deleteSubject: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE subjects SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    updateSubjectById: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE subjects SET  ? WHERE id = ?', [data, data.id]);
            // [{ ...data }, data.id]  - subject = ?, subjectCode = ?, creditPoint = ?
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }),
    getSubjectByCode: (code) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [subject] = yield database_1.default.query('SELECT id, subject, subjectCode, creditPoint, dateCreated, dateUpdated, dateDeleted FROM subjects WHERE subjectCode = ? AND dateDeleted is NULL', [code]);
            return subject[0];
        }
        catch (error) {
            return false;
        }
    }),
};
exports.default = subjectServices;
