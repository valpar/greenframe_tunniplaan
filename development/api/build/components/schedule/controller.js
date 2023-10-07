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
const formatDate_1 = __importDefault(require("../../utils/formatDate"));
const scheduleController = {
    getEntireSchedule: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { atDate, toDate } = req.params;
        // console.log (atDate, toDate);
        if (atDate === undefined) {
            atDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-'); // tähtaeg tänasest juhul kui kuupäeva pole
        }
        else {
            atDate = formatDate_1.default.forSql(atDate);
        }
        if (toDate === undefined) {
            toDate = '3000-12-12'; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
        }
        else {
            toDate = formatDate_1.default.forSql(toDate);
        }
        // console.log (atDate, toDate);
        const schedule = yield service_1.default.getEntireSchedule(atDate, toDate);
        if (schedule) {
            return res.status(responseCodes_1.default.ok).json({ schedule });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    createSchedule: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { rooms, comment, courses, lecturers, subjectCode, distanceLink, } = req.body;
        let { startTime, endTime, subjectId } = req.body;
        if (!subjectCode && !subjectId) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'subjectCode or subjectId is missing',
            });
        }
        if (!subjectId) {
            const resultSubjectId = yield service_1.default.getSubjectByCode(subjectCode);
            subjectId = resultSubjectId.id;
        }
        if (!startTime) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'startTime is missing',
            });
        }
        startTime = formatDate_1.default.forSqlDateTime(startTime);
        if (!endTime) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'endTime is missing',
            });
        }
        endTime = formatDate_1.default.forSqlDateTime(endTime);
        const scheduleId = yield service_1.default.createSchedule(startTime, endTime, rooms, comment, courses, subjectId, lecturers, distanceLink);
        if (scheduleId) {
            return res.status(responseCodes_1.default.ok).json({ scheduleId });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    updateSchedule: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { rooms, comment, courses, subjectCode, lecturers, distanceLink, } = req.body;
        let { startTime, endTime, subjectId } = req.body;
        const id = parseInt(req.params.id, 10);
        if (!startTime) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'startTime is missing',
            });
        }
        startTime = formatDate_1.default.forSqlDateTime(startTime);
        if (!endTime) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'endTime is missing',
            });
        }
        endTime = formatDate_1.default.forSqlDateTime(endTime);
        if (!subjectCode && !subjectId) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'subjectCode or subjectId is missing',
            });
        }
        if (!subjectId) {
            const resultSubjectId = yield service_1.default.getSubjectByCode(subjectCode);
            subjectId = resultSubjectId.id;
        }
        const updated = yield service_1.default.updateSchedule(id, startTime, endTime, rooms, comment, courses, subjectId, lecturers, distanceLink);
        if (updated) {
            return res.status(responseCodes_1.default.ok).json({ updated });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    deleteSchedule: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'id is missing',
            });
        }
        const scheduleId = yield service_1.default.deleteSchedule(id);
        if (scheduleId) {
            return res.status(responseCodes_1.default.ok).json({ scheduleId });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    getgcal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { atDate } = req.params;
        let { toDate } = req.params;
        const courseId = Number(req.params.courseId);
        const lecturerId = Number(req.params.lecturerId);
        if (atDate === undefined) {
            atDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-'); // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
        }
        else {
            atDate = formatDate_1.default.forSql(atDate);
        }
        if (toDate === undefined) {
            toDate = '3000-12-12'; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
        }
        else {
            toDate = formatDate_1.default.forSql(toDate);
        }
        const schedule = yield service_1.default.getgcal(atDate, toDate, courseId, lecturerId);
        if (schedule) {
            return res.status(responseCodes_1.default.ok).json({ schedule });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
};
exports.default = scheduleController;
