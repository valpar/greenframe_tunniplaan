"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtPassword = 'jagj9032jfKJKJgka903dsksfjsöd';
const jwtService = {
    sign: (user) => {
        const payload = {
            id: user.id,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, jwtPassword, { expiresIn: '1h' });
        return token;
    },
    verify: (token) => {
        try {
            const verify = jsonwebtoken_1.default.verify(token, jwtPassword);
            return verify;
        }
        catch (_a) {
            return false;
        }
    },
};
exports.default = jwtService;
