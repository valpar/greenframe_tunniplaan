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
const courseService = {
    getAllCourses: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [courses] = yield database_1.default.query('SELECT id AS id, course AS courseCode, courseLong AS courseName  FROM courses WHERE dateDeleted IS NULL');
            return courses;
        }
        catch (error) {
            return false;
        }
    }),
    getCourseId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield database_1.default.query('SELECT course AS courseCode, courseLong AS courseName FROM courses WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id]);
            if (course[0][0] !== undefined) {
                return course[0];
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    createCourse: (course, courseLong) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [id] = yield database_1.default.query('INSERT INTO courses (course, courseLong) VALUES (?,?)', [course, courseLong]);
            return id.insertId;
        }
        catch (error) {
            return false;
        }
    }),
    deleteCourse: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE courses SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    updateCourse: (id, courseCode, courseName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE courses SET course = ?, courseLong = ? WHERE id = ?', [courseCode, courseName, id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
};
exports.default = courseService;
