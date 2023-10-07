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
const supertest_1 = __importDefault(require("supertest"));
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const app_1 = __importDefault(require("../../app"));
const user = {
    email: 'koviid@mail.ee',
    password: 'Koviid',
};
let token;
let roomId;
const id = 9999;
(0, mocha_1.describe)('Room controller', () => {
    (0, mocha_1.describe)('GET /rooms', () => {
        (0, mocha_1.it)('responds with code 200 and token after login', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('token');
            (0, chai_1.expect)(response.body.token).to.be.a('string');
            token = response.body.token;
        }));
        (0, mocha_1.it)('responds with code 200 and rooms information', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/rooms')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('rooms');
            (0, chai_1.expect)(response.body.rooms).to.be.a('array');
            (0, chai_1.expect)(Object.keys(response.body.rooms).length).to.greaterThan(0);
        }));
    });
    (0, mocha_1.describe)('POST /rooms', () => {
        (0, mocha_1.it)('responds with code 201 and sources id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/rooms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                room: 'mingruum 200',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(201);
            (0, chai_1.expect)(response.body).to.have.key('id');
            (0, chai_1.expect)(response.body.id).to.be.a('number');
            roomId = response.body.id;
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/rooms')
                .set('Authorization', `Bearer ${token}`)
                .send({});
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Room is missing');
        }));
    }),
        (0, mocha_1.describe)('PATCH /rooms/:id', () => {
            (0, mocha_1.it)('responds with code 204 and empty object', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/rooms/${roomId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    room: 'ruum 200',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.body).to.be.empty;
                (0, chai_1.expect)(response.statusCode).to.equal(204);
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/rooms/${roomId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({});
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Nothing to update');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch('/rooms/0')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    room: 'ruum 200',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/rooms/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    room: 'ruum 200',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal(`No room found with id: ${id}`);
            }));
        }),
        (0, mocha_1.describe)('GET /rooms/:id', () => {
            (0, mocha_1.it)('responds with code 200 and room information', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/rooms/${roomId}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(200);
                (0, chai_1.expect)(response.body).to.have.key('room');
                (0, chai_1.expect)(response.body.room).to.be.a('object');
                (0, chai_1.expect)(response.body.room).to.have.property('room', 'ruum 200');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get('/rooms/0')
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/rooms/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal(`No room found with id: ${id}`);
            }));
        });
    (0, mocha_1.describe)('DELETE /rooms/:id', () => {
        (0, mocha_1.it)('responds with code 204 and empty object', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/rooms/${roomId}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.body).to.be.empty;
            (0, chai_1.expect)(response.statusCode).to.equal(204);
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete('/rooms/0')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/rooms/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('message');
            (0, chai_1.expect)(response.body.message).to.equal(`Room not found with id: ${id}`);
        }));
    });
});
