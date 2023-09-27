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
let lecturerId;
const id = 9999;
(0, mocha_1.describe)('Lecturers controller', () => {
    (0, mocha_1.describe)('GET /lecturers', () => {
        (0, mocha_1.it)('responds with code 200 and token after login', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('token');
            (0, chai_1.expect)(response.body.token).to.be.a('string');
            token = response.body.token;
        }));
        (0, mocha_1.it)('respondse with code 401 and error message because of no token provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get('/lecturers/1');
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(401);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('No token provided');
        }));
        (0, mocha_1.it)('responds with code 401 and error message because of invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/lecturers/1')
                .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(401);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Invalid token');
        }));
        (0, mocha_1.it)('responds with code 200 and lecturers information', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/lecturers')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('lecturers');
            (0, chai_1.expect)(response.body.lecturers).to.be.a('array');
            (0, chai_1.expect)(Object.keys(response.body.lecturers).length).to.greaterThan(0);
        }));
    });
    (0, mocha_1.describe)('POST /lecturers', () => {
        (0, mocha_1.it)('responds with code 201 and sources id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/lecturers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'Mari',
                lastName: 'Murimari',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(201);
            (0, chai_1.expect)(response.body).to.have.key('id');
            (0, chai_1.expect)(response.body.id).to.be.a('number');
            lecturerId = response.body.id;
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/lecturers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'Mari',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Last name is required');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/lecturers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                lastName: 'Murimari',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('First name is required');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/lecturers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: '123',
                lastName: '123',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Insert only letters, space or -');
        }));
    }),
        (0, mocha_1.describe)('PATCH /lecturers/:id', () => {
            (0, mocha_1.it)('responds with code 204 and empty object', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/lecturers/${lecturerId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: 'Uari',
                    lastName: 'Lurimari',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.body).to.be.empty;
                (0, chai_1.expect)(response.statusCode).to.equal(204);
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/lecturers/${lecturerId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: 'Mari',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Provide lastname');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/lecturers/${lecturerId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    lastName: 'Murimari',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Provide firstname');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/lecturers/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: 'Muri',
                    lastName: 'Murimari',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal(`No user found with id: ${id}`);
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch('/lecturers/0')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: 'Muri',
                    lastName: 'Murimari',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
            }));
        }),
        (0, mocha_1.describe)('GET /lecturers/activeSubjects', () => {
            (0, mocha_1.it)('responds with code 200 and all lecturers assigned subjects information', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get('/lecturers/activeSubjects')
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(200);
                (0, chai_1.expect)(response.body).to.have.key('lecturersActiveSubjects');
                (0, chai_1.expect)(response.body.lecturersActiveSubjects).to.be.a('array');
                (0, chai_1.expect)(Object.keys(response.body.lecturersActiveSubjects).length).to.greaterThan(0);
            }));
        });
    (0, mocha_1.describe)('GET /lecturers/:id', () => {
        (0, mocha_1.it)('responds with code 200 and lecturer information', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get(`/lecturers/${lecturerId}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('lecturer');
            (0, chai_1.expect)(response.body.lecturer).to.be.a('array');
            (0, chai_1.expect)(response.body.lecturer[0]).to.have.keys('firstName', 'lastName');
            (0, chai_1.expect)(response.body.lecturer[0]).to.have.property('firstName', 'Uari');
            (0, chai_1.expect)(response.body.lecturer[0]).to.have.property('lastName', 'Lurimari');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/lecturers/0')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get(`/lecturers/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal(`No lecturer found with id: ${id}`);
        }));
    });
    (0, mocha_1.describe)('DELETE /lecturers/:id', () => {
        (0, mocha_1.it)('responds with code 204 and empty object', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/lecturers/${lecturerId}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.body).to.be.empty;
            (0, chai_1.expect)(response.statusCode).to.equal(204);
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete('/lecturers/0')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/lecturers/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('message');
            (0, chai_1.expect)(response.body.message).to.equal(`Lecturer not found with id: ${id} or has active subjects`);
        }));
    });
});
