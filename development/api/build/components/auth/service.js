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
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const service_1 = __importDefault(require("../users/service"));
const hashService_1 = __importDefault(require("../general/services/hashService"));
const jwtService_1 = __importDefault(require("../general/services/jwtService"));
const loginService = {
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield service_1.default.getUserByEmail(email);
        if (user === undefined)
            return undefined;
        if (!user)
            return false;
        const match = yield hashService_1.default.match(password, user.password);
        if (!match)
            return '0';
        const token = yield jwtService_1.default.sign(user);
        return token;
    }),
    googleLogin: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield service_1.default.getUserByEmail(email);
        if (user === undefined)
            return undefined;
        if (!user)
            return false;
        const token = yield jwtService_1.default.sign(user);
        return { token, user };
    }),
};
exports.default = loginService;
