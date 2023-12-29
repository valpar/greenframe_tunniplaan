/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import express, {
  Request, Response, /* Application, */ NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import openapi from './openapi.json';
import authController from './components/auth/controller';
// import userController from './components/users/controller';
import teacherController from './components/teacher/controller';
import subjectController from './components/subjects/controller';
import courseController from './components/course/controller';
import roomController from './components/room/controller';
import scheduleController from './components/schedule/controller';
import homeworkController from './components/homework/controller';

// Järgnevad ESLint errorid on keelatud teadlikult ja lähevad eemaldamisele,
// kui midllewared saavad uuesti rakendatud

// eslint-disable-next-line no-unused-vars
import isAdmin from './components/auth/isAdminMiddleware';
// eslint-disable-next-line no-unused-vars
import isLoggedIn from './components/auth/isLoggedInMiddleware';
import checkAlphabet from './components/general/middleware/checkLetterMiddleware';
// eslint-disable-next-line no-unused-vars, max-len
// import checkAlphabetAndNumber from './components/general/middleware/checkLetterAndNumberMiddleware';
import ping from './components/ping/controller';
// import courseService from './components/course/service';
import { logger } from './logger';

const app = express(); // create express app
// app.use(cors()); //use cors
app.use(cors({
  origin: '*',
}));
app.use(express.json()); // For creating body object inside middleware request object
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.get('/ping', ping);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  // Log request details
  logger.info(`Request from ${req.ip} using ${req.headers['user-agent']}`);
  logger.info(`Request method and URL: ${req.method} ${req.originalUrl}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  // eslint-disable-next-line no-console
  console.log(req.ip);

  next();
});
// Schedule API

// ----LOGIN AND USER ENDPOINTS NOT IN USE----

// Login

// User endpoints
// app.post('/users', checkAlphabet, userController.addUser);
// login middelware from this point
// app.use(isLoggedIn);
// /* isAdmin, */
//-------
// app.get("/users", /* isAdmin, */ userController.getAllUsers);

// users on vana lahendus
/* app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.delete('/users/:id', userController.deleteUser);
app.patch('/users/:id', userController.updateUserById);
app.patch('/users/updatePassword/:id', isLoggedIn,userController.updatePassword); */
// app.patch("/users/:id", checkAlphabet, userController.updateUserById);

app.post('/googleauth', authController.googleAuth);
// Schedule endpoints
app.get('/schedule/', scheduleController.getEntireSchedule);
app.get('/schedule/:atDate', scheduleController.getEntireSchedule);
app.get('/schedule/:atDate/:toDate', scheduleController.getEntireSchedule);
app.post('/schedule', /* isLoggedIn, *//* isAdmin, */ scheduleController.createSchedule);
app.patch('/schedule/:id', /* isLoggedIn, *//* isAdmin, */ scheduleController.updateSchedule);
app.delete('/schedule/:id', /* isLoggedIn, *//* isAdmin, */ scheduleController.deleteSchedule);
app.get('/gcal/:atDate/:toDate/:courseId/:teacherId', scheduleController.getgcal);

// Teacher endpoints
app.get('/teachers', teacherController.getAllTeachersById);
app.get('/teachers/activeSubjects', teacherController.getTeachersSubjects);
app.get('/teachers/:id', teacherController.getTeacherById);
app.post('/teachers', checkAlphabet, /* isLoggedIn, *//* isAdmin, */ teacherController.addTeacher);
app.delete(
  '/teachers/:id',
  isLoggedIn,
  /* isAdmin, */
  teacherController.deleteTeacherWhenNoSubjectsById,
);
app.patch(
  '/teachers/:id',
  checkAlphabet,
  isLoggedIn,
  /* isAdmin, */
  teacherController.updateTeacherById,
);

// Subjects endpoints
app.get('/subjects', subjectController.getAllSubjects);
app.get('/subjects/:id', subjectController.getSubjectById);
app.post('/subjects', /* checkAlphabetAndNumber, */ /* isLoggedIn, *//* isAdmin, */ subjectController.addSubject);
app.delete('/subjects/:id', /* isLoggedIn, *//* isAdmin, */ subjectController.deleteSubject);
app.patch('/subjects/:id', /* isLoggedIn, *//* isAdmin, */ subjectController.updateSubjectById);

// Course endpoints

app.get('/courses', courseController.getAllCourses);
app.get('/courses/:id', courseController.getCourseById);
app.post('/courses', /* isLoggedIn, *//* isAdmin, */ courseController.addCourse);
app.delete('/courses/:id', /* isLoggedIn, *//* isAdmin, */ courseController.deleteCourse);
app.patch('/courses/:id', /* isLoggedIn, *//* isAdmin, */ courseController.updateCourseById);

// Room endpoints

app.get('/rooms', roomController.getAllRooms);
app.get('/rooms/:id', roomController.getRoomById);
app.post('/rooms', /* isLoggedIn, *//* isAdmin, */ roomController.addRoom);
app.delete('/rooms/:id', /* isLoggedIn, *//* isAdmin, */ roomController.deleteRoom);
app.patch('/rooms/:id', /* isLoggedIn, *//* isAdmin, */ roomController.updateRoomById);

// homework

app.get('/homeworks', homeworkController.getAllHomeworks);
app.get('/homeworks/:id', homeworkController.getHomeworkById);
app.post('/homeworks', isLoggedIn, isAdmin, homeworkController.addHomework);
app.delete('/homeworks/:id', isLoggedIn, isAdmin, homeworkController.deleteHomework);
app.patch('/homeworks/:id', isLoggedIn, /* isAdmin, */ homeworkController.updateHomeworkById);

app.get('/homeworkbycode/:code/:actualDate', homeworkController.getHomeworkByCode);

export default app;
