import express, { Request, Response, Application } from "express"; // import express
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi.json";
import cors from "cors";
import winston from 'winston';
import authController from "./components/auth/controller";
import userController from "./components/users/controller";
import lecturerController from "./components/lector/controller";
import subjectController from "./components/subjects/controller";
import courseController from "./components/course/controller";
import roomController from "./components/room/controller";
import scheduleController from "./components/schedule/controller";
import homeworkController from "./components/homework/controller";
// import middlewareshomework
import isAdmin from "./components/auth/isAdminMiddleware";
import isLoggedIn from "./components/auth/isLoggedInMiddleware";
import checkAlphabet from "./components/general/middleware/checkLetterMiddleware";
import checkAlphabetAndNumber from "./components/general/middleware/checkLetterAndNumberMiddleware";
import ping from "./components/ping/controller";
import courseService from "./components/course/service";
import { logger } from './logger';

const app: Application = express(); // create express app
// app.use(cors()); //use cors
app.use(cors({
  origin: '*'
}));
app.use(express.json()); // For creating body object inside middleware request object
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

const port: number = 3000; // Port number, where API works




app.get("/ping", ping); 

app.use(async (req, res, next) => {
  // Log request details
  logger.info(`Request from ${req.ip} using ${req.headers['user-agent']}`);
  logger.info(`Request method and URL: ${req.method} ${req.originalUrl}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  console.log(req.ip);


  next();
});
// Schedule API

//----LOGIN AND USER ENDPOINTS NOT IN USE----

// Login

app.post("/login", authController.login);

// User endpoints
app.post("/users", checkAlphabet, userController.addUser);
// login middelware from this point
//app.use(isLoggedIn);
//isAdmin,
//-------
// app.get("/users", isAdmin, userController.getAllUsers);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.delete("/users/:id", userController.deleteUser);
app.patch("/users/:id", userController.updateUserById);
// app.patch("/users/:id", checkAlphabet, userController.updateUserById);


app.post("/googleauth", authController.googleAuth);


//Schedule endpoints
app.get("/schedule/", scheduleController.getEntireSchedule);
app.get("/schedule/:atDate", scheduleController.getEntireSchedule);
app.get("/schedule/:atDate/:toDate", scheduleController.getEntireSchedule);
app.post("/schedule", scheduleController.createSchedule);
app.patch("/schedule/:id", scheduleController.updateSchedule);
app.delete("/schedule/:id", scheduleController.deleteSchedule);
app.get("/gcal/:atDate/:toDate/:courseId/:lecturerId", scheduleController.getgcal);

// Lecturer endpoints
app.get("/lecturers", lecturerController.getAllLecturersById);
app.get("/lecturers/activeSubjects", lecturerController.getLecturersSubjects);
app.get("/lecturers/:id", lecturerController.getLecturerById);
app.post("/lecturers", checkAlphabet, lecturerController.addLecturer);
app.delete(
  "/lecturers/:id",
  lecturerController.deleteLecturerWhenNoSubjectsById
);
app.patch(
  "/lecturers/:id",
  checkAlphabet,
  lecturerController.updateLecturerById
);


// Subjects endpoints
app.get("/subjects", subjectController.getAllSubjects);
app.get("/subjects/:id", subjectController.getSubjectById);
app.post("/subjects", subjectController.addSubject);
app.delete("/subjects/:id", subjectController.deleteSubject);
app.patch("/subjects/:id", subjectController.updateSubjectById);

// Course endpoints

app.get("/courses", courseController.getAllCourses);
app.get("/courses/:id", courseController.getCourseById);
app.post("/courses", courseController.addCourse);
app.delete("/courses/:id", courseController.deleteCourse);
app.patch("/courses/:id", courseController.updateCourseById);

// Room endpoints

app.get("/rooms", roomController.getAllRooms);
app.get("/rooms/:id", roomController.getRoomById);
app.post("/rooms", roomController.addRoom);
app.delete("/rooms/:id", roomController.deleteRoom);
app.patch("/rooms/:id", roomController.updateRoomById);

// homework

app.get("/homeworks", homeworkController.getAllHomeworks);
app.get("/homeworks/:id", homeworkController.getHomeworkById);
app.post("/homeworks", homeworkController.addHomework);
app.delete("/homeworks/:id", homeworkController.deleteHomework);
app.patch("/homeworks/:id", homeworkController.updateHomeworkById);

app.get("/homeworkbycode/:code/:actualDate", homeworkController.getHomeworkByCode);




export default app;
