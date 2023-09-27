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
const roomController = {
    getAllRooms: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rooms = yield service_1.default.getAllRooms();
        if (rooms) {
            return res.status(responseCodes_1.default.ok).json({
                rooms,
            });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    getRoomById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const room = yield service_1.default.getRoomId(id);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!room) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No room found with id: ${id}`,
            });
        }
        return res.status(responseCodes_1.default.ok).json({
            room,
        });
    }),
    addRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { room } = req.body;
        if (!room) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Room is missing',
            });
        }
        const id = yield service_1.default.createRoom(room);
        if (id) {
            return res.status(responseCodes_1.default.created).json({
                id,
            });
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    deleteRoom: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        const roomExists = yield service_1.default.getRoomId(id);
        if (roomExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                message: `Room not found with id: ${id}`,
            });
        }
        const deleteRoom = yield service_1.default.deleteRoom(id);
        if (deleteRoom) {
            return res.status(responseCodes_1.default.noContent).send();
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
    updateRoomById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const { room } = req.body;
        if (!id) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'No valid id provided',
            });
        }
        if (!room) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: 'Nothing to update',
            });
        }
        const roomExists = yield service_1.default.updateRoom({
            id,
            room,
        });
        if (roomExists === undefined) {
            return res.status(responseCodes_1.default.badRequest).json({
                error: `No room found with id: ${id}`,
            });
        }
        if (roomExists) {
            return res.status(responseCodes_1.default.noContent).send();
        }
        return res.status(responseCodes_1.default.ServerError).json({
            error: 'Server error',
        });
    }),
};
exports.default = roomController;
