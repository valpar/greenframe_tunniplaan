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
const responseCodes_1 = __importDefault(require("../general/responseCodes"));
const service_1 = __importDefault(require("./service"));
const courseController = {
    getAllCourses: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield service_1.default.getAllCourses();
        if (!courses) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            courses,
        });
    }),
    getCourseById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const course = yield service_1.default.getCourseId(id);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (course === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No course found with id: ${id}`,
            });
        }
        if (!course) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            course,
        });
    }),
    addCourse: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { courseCode, courseName } = req.body;
        if (!courseCode && !courseName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'CourseCode or CourseName is missing',
            });
        }
        const id = yield service_1.default.createCourse(courseCode, courseName);
        if (!id) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.created).json({
            id,
        });
    }),
    deleteCourse: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        const subjectExists = yield service_1.default.deleteCourse(id);
        if (subjectExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                message: `Course not found with id: ${id}`,
            });
        }
        if (!subjectExists) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
    updateCourseById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { courseCode, courseName } = req.body;
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!courseCode || !courseName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Nothing to update',
            });
        }
        const courseExists = yield service_1.default.updateCourse(id, courseCode, courseName);
        if (courseExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No course found with id: ${id}`,
            });
        }
        if (!courseExists) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
};
exports.default = courseController;
