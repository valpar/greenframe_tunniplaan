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
const userController = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield service_1.default.getAllUsers();
        if (users) {
            return res.status(responseCodes_1.default.ok).json({
                users,
            });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const user = yield service_1.default.getUserById(id);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        // if (id === res.locals.user.id || res.locals.user.role === "Admin") {
        if (user === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No user found with id: ${id}`,
            });
        }
        if (!user) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            user,
        });
        // }
        // return res.status(responseCodes.badRequest).json({
        //   error: `You have no permission for this`,
        // });
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        const userExists = yield service_1.default.deleteUser(id);
        if (userExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                message: `User not found with id: ${id}`,
            });
        }
        if (!userExists) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
    addUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, role, email, } = req.body;
        if (!firstName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'First name is required',
            });
        }
        if (!lastName) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Last name is required',
            });
        }
        if (!role) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Role is required',
            });
        }
        if (!email) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Email is required',
            });
        }
        const newUser = {
            firstName,
            lastName,
            email,
            role,
        };
        const id = yield service_1.default.createUser(newUser);
        if (!id) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.created).json({
            id,
        });
    }),
    updateUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { firstName, lastName, email, role, } = req.body;
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!firstName && !lastName && !email && !role) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Nothing to update',
            });
        }
        const updateUser = {
            id,
            firstName,
            lastName,
            email,
            role,
        };
        const userExists = yield service_1.default.updateUserById(updateUser);
        if (userExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No user found with id: ${id}`,
            });
        }
        if (!userExists) {
            return res.status(responseCodes_1.default.ServerError).json({
                error: 'Server error',
            });
        }
        return res.status(responseCodes_1.default.noContent).send();
    }),
};
exports.default = userController;
