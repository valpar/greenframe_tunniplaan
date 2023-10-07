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
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const openapi_json_1 = __importDefault(require("./openapi.json"));
const controller_1 = __importDefault(require("./components/auth/controller"));
const controller_2 = __importDefault(require("./components/users/controller"));
const controller_3 = __importDefault(require("./components/lector/controller"));
const controller_4 = __importDefault(require("./components/subjects/controller"));
const controller_5 = __importDefault(require("./components/course/controller"));
const controller_6 = __importDefault(require("./components/room/controller"));
const controller_7 = __importDefault(require("./components/schedule/controller"));
const controller_8 = __importDefault(require("./components/homework/controller"));
const checkLetterMiddleware_1 = __importDefault(require("./components/general/middleware/checkLetterMiddleware"));
const controller_9 = __importDefault(require("./components/ping/controller"));
const logger_1 = require("./logger");
const app = (0, express_1.default)(); // create express app
// app.use(cors()); //use cors
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(express_1.default.json()); // For creating body object inside middleware request object
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_json_1.default));
app.get('/ping', controller_9.default);
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Log request details
    logger_1.logger.info(`Request from ${req.ip} using ${req.headers['user-agent']}`);
    logger_1.logger.info(`Request method and URL: ${req.method} ${req.originalUrl}`);
    logger_1.logger.info(`Request body: ${JSON.stringify(req.body)}`);
    // eslint-disable-next-line no-console
    console.log(req.ip);
    next();
}));
// Schedule API
// ----LOGIN AND USER ENDPOINTS NOT IN USE----
// Login
app.post('/login', controller_1.default.login);
// User endpoints
app.post('/users', checkLetterMiddleware_1.default, controller_2.default.addUser);
// login middelware from this point
// app.use(isLoggedIn);
// isAdmin,
//-------
// app.get("/users", isAdmin, userController.getAllUsers);
app.get('/users', controller_2.default.getAllUsers);
app.get('/users/:id', controller_2.default.getUserById);
app.delete('/users/:id', controller_2.default.deleteUser);
app.patch('/users/:id', controller_2.default.updateUserById);
// app.patch("/users/:id", checkAlphabet, userController.updateUserById);
app.post('/googleauth', controller_1.default.googleAuth);
// Schedule endpoints
app.get('/schedule/', controller_7.default.getEntireSchedule);
app.get('/schedule/:atDate', controller_7.default.getEntireSchedule);
app.get('/schedule/:atDate/:toDate', controller_7.default.getEntireSchedule);
app.post('/schedule', controller_7.default.createSchedule);
app.patch('/schedule/:id', controller_7.default.updateSchedule);
app.delete('/schedule/:id', controller_7.default.deleteSchedule);
app.get('/gcal/:atDate/:toDate/:courseId/:lecturerId', controller_7.default.getgcal);
// Lecturer endpoints
app.get('/lecturers', controller_3.default.getAllLecturersById);
app.get('/lecturers/activeSubjects', controller_3.default.getLecturersSubjects);
app.get('/lecturers/:id', controller_3.default.getLecturerById);
app.post('/lecturers', checkLetterMiddleware_1.default, controller_3.default.addLecturer);
app.delete('/lecturers/:id', controller_3.default.deleteLecturerWhenNoSubjectsById);
app.patch('/lecturers/:id', checkLetterMiddleware_1.default, controller_3.default.updateLecturerById);
// Subjects endpoints
app.get('/subjects', controller_4.default.getAllSubjects);
app.get('/subjects/:id', controller_4.default.getSubjectById);
app.post('/subjects', controller_4.default.addSubject);
app.delete('/subjects/:id', controller_4.default.deleteSubject);
app.patch('/subjects/:id', controller_4.default.updateSubjectById);
// Course endpoints
app.get('/courses', controller_5.default.getAllCourses);
app.get('/courses/:id', controller_5.default.getCourseById);
app.post('/courses', controller_5.default.addCourse);
app.delete('/courses/:id', controller_5.default.deleteCourse);
app.patch('/courses/:id', controller_5.default.updateCourseById);
// Room endpoints
app.get('/rooms', controller_6.default.getAllRooms);
app.get('/rooms/:id', controller_6.default.getRoomById);
app.post('/rooms', controller_6.default.addRoom);
app.delete('/rooms/:id', controller_6.default.deleteRoom);
app.patch('/rooms/:id', controller_6.default.updateRoomById);
// homework
app.get('/homeworks', controller_8.default.getAllHomeworks);
app.get('/homeworks/:id', controller_8.default.getHomeworkById);
app.post('/homeworks', controller_8.default.addHomework);
app.delete('/homeworks/:id', controller_8.default.deleteHomework);
app.patch('/homeworks/:id', controller_8.default.updateHomeworkById);
app.get('/homeworkbycode/:code/:actualDate', controller_8.default.getHomeworkByCode);
exports.default = app;
