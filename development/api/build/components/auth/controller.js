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
const axios_1 = __importDefault(require("axios"));
const service_1 = __importDefault(require("./service"));
const responseCodes_1 = __importDefault(require("../general/responseCodes"));
const authController = {
    googleAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            const googleToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
            if (!googleToken) {
                return res.status(responseCodes_1.default.notAuthorized).json({
                    error: 'No googleToken provided',
                });
            }
            const response = yield axios_1.default.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: {
                    Authorization: `Bearer ${googleToken}`,
                },
            });
            // console.log('Google response:', response.data.email);
            const loginProfile = yield service_1.default.googleLogin(response.data.email);
            return res.status(responseCodes_1.default.ok).json(loginProfile);
        }
        catch (error) {
            // console.error('External API error:', error);
            return res.status(500).send('Google autenth error');
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const token = yield service_1.default.login(email, password);
        if (token === undefined) {
            return res.status(responseCodes_1.default.notAuthorized).json({
                error: 'Check credentials',
            });
        }
        if (!token) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        if (token === '0') {
            return res.status(responseCodes_1.default.notAuthorized).json({
                error: 'Check password',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            token,
        });
    }),
};
exports.default = authController;
