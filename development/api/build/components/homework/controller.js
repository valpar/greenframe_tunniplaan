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
const homeworkController = {
    getAllHomeworks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const homeworks = yield service_1.default.getAllhomeworks();
        if (!homeworks) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            homeworks,
        });
    }),
    getHomeworkById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id or subjectCode provided',
            });
        }
        const homework = yield service_1.default.gethomeworkId(id);
        if (homework === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No homework found with id: ${id}`,
            });
        }
        if (!homework) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            homework,
        });
    }),
    getHomeworkByCode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subjectCode = req.params.code;
        let { actualDate } = req.params;
        if (actualDate === undefined) {
            actualDate = '3000-12-12'; // tähtaeg kuni selle kuupäevani juhul kui kuupäeva pole
        }
        else {
            actualDate = formatDate_1.default.forSql(actualDate);
        }
        if (!subjectCode) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No subjectCode provided',
            });
        }
        const homework = yield service_1.default.gethomeworkBySubjectCode(subjectCode, actualDate);
        if (homework === undefined) {
            return res.status(responseCodes_1.default.ok).json({
            // error: `No homework found with id: ${subjectCode}`,
            });
        }
        if (!homework) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            homework,
        });
    }),
    addHomework: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { description, subjectCode, extrasLink, } = req.body;
        let { dueDate, subjects_id } = req.body;
        // console.log(description, dueDate, subjectCode, subjects_id, extrasLink);
        if (!description) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'homework description is missing',
            });
        }
        if (!dueDate) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'homework dueDate is missing',
            });
        }
        dueDate = formatDate_1.default.forSqlDateTime(dueDate);
        if (!subjectCode && !subjects_id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'homework subjectCode or subjects_id is missing',
            });
        }
        if (!subjects_id) {
            const subjectId = yield service_1.default.getSubjectByCode(subjectCode);
            subjects_id = subjectId.id;
        }
        const id = yield service_1.default.createhomework(description, dueDate, subjects_id, extrasLink);
        if (!id) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.created).json({
            id,
        });
    }),
    deleteHomework: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        const subjectExists = yield service_1.default.deletehomework(id);
        if (subjectExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                message: `homework not found with id: ${id}`,
            });
        }
        if (!subjectExists) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
    updateHomeworkById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { description, subjectCode, extrasLink, } = req.body;
        let { dueDate, subjects_id } = req.body;
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!dueDate) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'homework dueDate is missing',
            });
        }
        dueDate = formatDate_1.default.forSqlDateTime(dueDate);
        if (!description && !dueDate && !subjects_id && !subjectCode) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Nothing to update',
            });
        }
        if (!subjects_id) {
            const subjectId = yield service_1.default.getSubjectByCode(subjectCode);
            subjects_id = subjectId.id;
        }
        const homeworkExists = yield service_1.default.updatehomework(id, description, dueDate, subjects_id, extrasLink);
        if (homeworkExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No homework found with id: ${id}`,
            });
        }
        if (!homeworkExists) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
};
exports.default = homeworkController;
