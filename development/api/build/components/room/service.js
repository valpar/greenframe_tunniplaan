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
const roomService = {
    getAllRooms: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [rooms] = yield database_1.default.query('SELECT * FROM rooms WHERE dateDeleted is NULL');
            return rooms;
        }
        catch (error) {
            return false;
        }
    }),
    getRoomId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [room] = yield database_1.default.query('SELECT room FROM rooms WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id]);
            return room[0];
        }
        catch (error) {
            return false;
        }
    }),
    createRoom: (room) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [result] = yield database_1.default.query('INSERT INTO rooms SET room = ?', [room]);
            return result.insertId;
        }
        catch (error) {
            return false;
        }
    }),
    deleteRoom: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.default.query('UPDATE rooms SET dateDeleted = ? WHERE id = ?', [
                new Date(),
                id,
            ]);
            return true;
        }
        catch (error) {
            return false;
        }
    }),
    updateRoom: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [update] = yield database_1.default.query('UPDATE rooms SET room = ? WHERE id = ?', [data.room, data.id]);
            if (update.affectedRows > 0) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    }),
};
exports.default = roomService;
