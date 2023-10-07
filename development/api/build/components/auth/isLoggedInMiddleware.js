"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = __importDefault(require("../general/services/jwtService"));
const responseCodes_1 = __importDefault(require("../general/responseCodes"));
const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        return res.status(responseCodes_1.default.notAuthorized).json({
            error: 'No token provided',
        });
    }
    const payload = jwtService_1.default.verify(token);
    if (!payload) {
        return res.status(responseCodes_1.default.notAuthorized).json({
            error: 'Invalid token',
        });
    }
    res.locals.user = payload;
    return next();
};
exports.default = isLoggedIn;
