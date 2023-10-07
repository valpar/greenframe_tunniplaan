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
// import ISubject from "./interface";
const homeworkService = {
    getAllhomeworks: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [homeworks] = yield database_1.default.query('SELECT homeworks.id, subjects.subjectCode, subjects.id as subjects_id, subjects.subject, homeworks.description, homeworks.dueDate, homeworks.extrasLink, homeworks.dateCreated, homeworks.dateUpdated, homeworks.dateDeleted FROM scheduleDb.homeworks left join subjects ON homeworks.subjects_id = subjects.Id where homeworks.dateDeleted IS NULL order BY homeworks.id;');
            return homeworks;
        }
        catch (error) {
            return false;
        }
    }),
    gethomeworkId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const homework = yield database_1.default.query('SELECT homeworks.id, subjects.subjectCode, subjects.id as subjects_id, subjects.subject, homeworks.description, homeworks.dueDate, homeworks.extrasLink,homeworks.dateCreated, homeworks.dateUpdated, homeworks.dateDeleted FROM scheduleDb.homeworks left join subjects ON homeworks.subjects_id = subjects.Id WHERE homeworks.id = ? AND homeworks.dateDeleted IS NULL LIMIT 1', [id]);
            // console.log("proovime id järgi leida kodutööd");
            if (homework[0][0] !== undefined) {
                return homework[0];
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    createhomework: (description, dueDate, subjects_id, extrasLink) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log(
            //   "createHomework",
            //   description,
            //   dueDate,
            //   subjects_id,
            //   extrasLink
            // );
            const [id] = yield database_1.default.query('INSERT INTO homeworks (description, dueDate, subjects_id, extrasLink) VALUES (?, ?, ?, ?)', [description, dueDate, subjects_id, extrasLink]);
            return id.insertId;
        }
        catch (error) {
            // console.log(error);
            return false;
        }
    }),
    deletehomework: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE homeworks SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    updatehomework: (id, description, dueDate, subjects_id, extrasLink) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE homeworks SET description = ?, dueDate = ?, subjects_id = ? , extrasLink = ? WHERE id = ?', [description, dueDate, subjects_id, extrasLink, id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    getSubjectByCode: (code) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [subject] = yield database_1.default.query('SELECT id FROM subjects WHERE subjectCode = ? AND dateDeleted is NULL', [code]);
            return subject[0];
        }
        catch (error) {
            return false;
        }
    }),
    gethomeworkBySubjectCode: (subCode, actualDate) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const homework: [Ihomework[], FieldPacket[]] = await pool.query(
            //   `SELECT homeworks.id, homeworks.description,
            // homeworks.dueDate, homeworks.extrasLink, homeworks.dateCreated, homeworks.dateUpdated,
            //   homeworks.dateDeleted FROM scheduleDb.homeworks
            //   WHERE subjects_id = (select id from subjects where subjectCode = ? )
            //         AND homeworks.dueDate > (select scheduled.startTime from scheduleDb.scheduled
            //          WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? )
            //         AND scheduled.startTime < ? order by scheduled.startTime desc limit 1)
            //         AND homeworks.dueDate <=      (select scheduled.startTime from scheduleDb.scheduled
            //          WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? )
            //         AND scheduled.startTime > ? order by scheduled.startTime LIMIT 1 ) `,
            //   [subCode, subCode, actualDate, subCode, actualDate]
            // );
            const homework = yield database_1.default.query(`SELECT homeworks.id, homeworks.description, homeworks.dueDate, homeworks.extrasLink, homeworks.dateCreated, homeworks.dateUpdated, 
        homeworks.dateDeleted FROM scheduleDb.homeworks 
        WHERE subjects_id = (select id from subjects where subjectCode = ? )
              AND homeworks.dueDate > (select scheduled.startTime from scheduleDb.scheduled 
                                        WHERE scheduled.subjects_id = (select id from subjects where subjectCode = ? ) 
                                        AND scheduled.startTime < ? 
                                        AND homeworks.dateDeleted is NULL order by scheduled.startTime desc limit 1) `, [subCode, subCode, actualDate, subCode, actualDate]);
            // console.log(actualDate, subCode);
            if (homework[0][0] !== undefined) {
                return homework[0];
            }
            return false;
        }
        catch (error) {
            // console.log(error);
            return false;
        }
    }),
};
exports.default = homeworkService;
