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
const lecturerController = {
    getAllLecturersById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lecturers = yield service_1.default.getAllLecturers();
        // console.log(lecturers);
        if (lecturers) {
            return res.status(responseCodes_1.default.ok).json({ lecturers });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    getLecturersSubjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lecturersActiveSubjects = yield service_1.default.getLecturersSubjects();
        if (lecturersActiveSubjects) {
            return res.status(responseCodes_1.default.ok).json({
                lecturersActiveSubjects,
            });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    getLecturerById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const lecturer = yield service_1.default.getLecturerById(id);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (lecturer === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No lecturer found with id: ${id}`,
            });
        }
        if (!lecturer) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            lecturer,
        });
    }),
    // Õppejõu kustutamine ainult siis kui tal antavaid ained pole.
    deleteLecturerWhenNoSubjectsById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        const subjectExists = yield service_1.default.deleteLecturerById(id);
        if (subjectExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                message: `Lecturer not found with id: ${id}`,
            });
        }
        if (subjectExists) {
            return res.status(responseCodes_1.default.noContent).send();
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    // Uue Õppejõu lisamine
    addLecturer: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email } = req.body;
        // console.log(firstName, lastName, email);
        if (!firstName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'First name is required',
            });
        }
        if (!lastName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Last name is required',
            });
        }
        if (!email) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Email is required',
            });
        }
        const newLecturer = {
            firstName,
            lastName,
            email,
        };
        const id = yield service_1.default.createlecturer(newLecturer);
        if (id) {
            return res.status(responseCodes_1.default.created).json({
                id,
            });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    updateLecturerById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { firstName, lastName, email } = req.body;
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!firstName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Provide firstname',
            });
        }
        if (!lastName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Provide lastname',
            });
        }
        if (!email) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Email is required',
            });
        }
        const newLecturer = {
            firstName,
            lastName,
            email,
        };
        const lecturerExists = yield service_1.default.updateLecturerById(newLecturer, id);
        if (lecturerExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No user found with id: ${id}`,
            });
        }
        if (lecturerExists) {
            return res.status(responseCodes_1.default.noContent).send();
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
};
exports.default = lecturerController;
