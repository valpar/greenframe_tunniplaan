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
const subjectController = {
    getAllSubjects: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const subjects = yield service_1.default.getAllSubjects();
        if (subjects) {
            return res.status(responseCodes_1.default.ok).json({ subjects });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    getSubjectById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { subjectCode } = req.body;
        if (!subjectCode && !id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id or subjedtCode provided',
            });
        }
        if (!id) {
            const subject = yield service_1.default.getSubjectByCode(subjectCode);
            if (subject === false) {
                return res.status(responseCodes_1.default.ServerError).json({
                    error: 'Server error',
                });
            }
            if (!subject) {
                return res.status(responseCodes_1.default.badRequest).json({
                    error: `No subject found with subjectCode: ${subjectCode}`,
                });
            }
            return res.status(responseCodes_1.default.ok).json({
                subject,
            });
        }
        if (!subjectCode) {
            const subject = yield service_1.default.getSubjectById(id);
            if (subject === false) {
                return res.status(responseCodes_1.default.ServerError).json({
                    error: 'Server error',
                });
            }
            if (!subject) {
                return res.status(responseCodes_1.default.badRequest).json({
                    error: `No subject found with id: ${id}`,
                });
            }
            return res.status(responseCodes_1.default.ok).json({
                subject,
            });
        }
    }),
    addSubject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { subject, subjectCode, creditPoint } = req.body;
        if (!subject) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Subject is missing',
            });
        }
        // if (!subjectCode) {
        //   return res.status(responseCodes.badRequest).json({
        //     error: "subjectCode is missing",
        //   });
        // }
        // if (!creditPoint) {
        //   return res.status(responseCodes.badRequest).json({
        //     error: "Lecturer id is missing",
        //   });
        // } else {
        const subjectData = {
            subject,
            subjectCode,
            creditPoint,
        };
        const id = yield service_1.default.createSubject(subjectData);
        if (id) {
            return res.status(responseCodes_1.default.created).json({
                id,
            });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
        // }
    }),
    deleteSubject: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        const subjectExists = yield service_1.default.deleteSubject(id);
        if (subjectExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                message: `Subject not found with id: ${id}`,
            });
        }
        if (subjectExists) {
            return res.status(responseCodes_1.default.noContent).send();
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    updateSubjectById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { subject, subjectCode, creditPoint } = req.body;
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!subject && !subjectCode && creditPoint) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Nothing to update',
            });
        }
        const subjectData = {
            id,
            subject,
            subjectCode,
            creditPoint,
        };
        const subjectExists = yield service_1.default.updateSubjectById(subjectData);
        if (subjectExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No subject found with id: ${id}`,
            });
        }
        if (subjectExists === false) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
};
exports.default = subjectController;
