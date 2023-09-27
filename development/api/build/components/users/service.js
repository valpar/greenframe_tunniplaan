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
const database_1 = __importDefault(require("../../database"));
const userService = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [users] = yield database_1.default.query('SELECT id, firstName, lastName, email, role FROM users WHERE dateDeleted is NULL');
            return users;
        }
        catch (error) {
            return false;
        }
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [user] = yield database_1.default.query('SELECT id, firstName, lastName, email, role, dateCreated, dateUpdated, dateDeleted  FROM users WHERE id = ? AND dateDeleted is NULL LIMIT 1', [id]);
            if (user[0] !== undefined) {
                return user[0];
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [user] = yield database_1.default.query('SELECT firstName, lastName, email, role FROM users WHERE email = ? AND dateDeleted is NULL', [email]);
            if (user[0] !== undefined) {
                return user[0];
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    createUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('INSERT INTO users SET ?', [newUser]);
            return result.insertId;
        }
        catch (error) {
            return false;
        }
    }),
    updateUserById: (updateUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('UPDATE users SET ? WHERE Id = ?', [updateUser, updateUser.id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query("UPDATE users SET dateDeleted = ?, email = CONCAT('deleted',email) WHERE id = ?", [new Date(), id]);
            if (result.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
};
exports.default = userService;
