"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseCodes_1 = __importDefault(require("../general/responseCodes"));
const ping = (req, res) => {
    res.status(responseCodes_1.default.ok).json({
        message: 'Alive',
    });
};
exports.default = ping;
