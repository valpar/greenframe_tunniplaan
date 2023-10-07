"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes_1 = __importDefault(require("../responseCodes"));
const service_1 = __importDefault(require("../services/service"));
const checkAlphabetAndNumber = (req, res, next) => {
    const { scheduled, subject } = req.body;
    let testScheduled = true;
    let testSubject = true;
    // Järgnevad kaks rida välja kommenteeritud ja ümber kirjutatud
    // scheduled ? (testScheduled = validateField.testFields(scheduled)) : true;
    // subject ? (testSubject = validateField.testFields(subject)) : true;
    testScheduled = service_1.default.testFields(scheduled);
    testSubject = service_1.default.testFields(subject);
    if (testScheduled && testSubject) {
        return next();
    }
    return res.status(responseCodes_1.default.badRequest).json({
        error: 'Insert only letters, numbers or -.,!',
    });
};
exports.default = checkAlphabetAndNumber;
