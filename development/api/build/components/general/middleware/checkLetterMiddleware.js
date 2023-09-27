"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes_1 = __importDefault(require("../responseCodes"));
const service_1 = __importDefault(require("../services/service"));
const checkAlphabet = (req, res, next) => {
    const { firstName, lastName } = req.body;
    let testFirst = true;
    let testLast = true;
    if (firstName) {
        testFirst = service_1.default.testName(firstName);
    }
    if (lastName) {
        testLast = service_1.default.testName(lastName);
    }
    if (testFirst && testLast) {
        return next();
    }
    return res.status(responseCodes_1.default.badRequest).json({
        error: 'Insert only letters, space or -',
    });
};
exports.default = checkAlphabet;
