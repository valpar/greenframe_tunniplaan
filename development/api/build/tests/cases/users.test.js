"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const faker = __importStar(require("faker"));
const app_1 = __importDefault(require("../../app"));
const user = {
    email: 'koviid@mail.ee',
    password: 'Koviid',
};
const regularUser = {
    email: 'krispi@mail.ee',
    password: 'Krispi',
};
const firstname = faker.name.firstName();
const lastname = faker.name.lastName();
const password = faker.internet.password();
const email = faker.internet.email();
let token;
let userToken;
let userId;
const id = 9999;
(0, mocha_1.describe)('User controller', () => {
    (0, mocha_1.describe)('GET /users', () => {
        (0, mocha_1.it)('responds with code 200 and token after login', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('token');
            (0, chai_1.expect)(response.body.token).to.be.a('string');
            token = response.body.token;
        }));
        (0, mocha_1.it)('responds with code 200 and token after login', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(regularUser);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('token');
            (0, chai_1.expect)(response.body.token).to.be.a('string');
            userToken = response.body.token;
        }));
        (0, mocha_1.it)('responds with code 200 and users information', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(200);
            (0, chai_1.expect)(response.body).to.have.key('users');
            (0, chai_1.expect)(response.body.users).to.be.a('array');
            (0, chai_1.expect)(Object.keys(response.body.users).length).to.greaterThan(0);
        }));
        (0, mocha_1.it)('responds with code 401 and users information', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/users')
                .set('Authorization', `Bearer ${userToken}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(401);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('You have to be admin for this operation');
        }));
    });
    (0, mocha_1.describe)('POST /users', () => {
        (0, mocha_1.it)('responds with code 201 and sources id', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: firstname,
                lastName: lastname,
                password,
                email,
            });
            console.log(firstname);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(201);
            (0, chai_1.expect)(response.body).to.have.key('id');
            (0, chai_1.expect)(response.body.id).to.be.a('number');
            userId = response.body.id;
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                lastName: 'Kati',
                password: 'Karu',
                email: 'karu@kati.ee',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('First name is required');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'Karu',
                password: 'Karu',
                email: 'karu@kati.ee',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Last name is required');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'Karu',
                lastName: 'Kati',
                email: 'karu@kati.ee',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Password is required');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'Karu',
                lastName: 'Kati',
                password: 'Karu',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Email is required');
        }));
    }),
        (0, mocha_1.describe)('PATCH /users/:id', () => {
            (0, mocha_1.it)('responds with code 204 and empty object', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/users/${userId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: firstname,
                    lastName: lastname,
                    password,
                    email,
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.body).to.be.empty;
                (0, chai_1.expect)(response.statusCode).to.equal(204);
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/users/${userId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({});
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Nothing to update');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch('/users/0')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    course: 'RIF 200',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/users/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: 'Maru',
                    lastName: 'Mati',
                    password: 'Maru',
                    email: 'maru@kati.ee',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal(`No user found with id: ${id}`);
            }));
        }),
        (0, mocha_1.describe)('GET /users/:id', () => {
            (0, mocha_1.it)('responds with code 200 and user information', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/users/${userId}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(200);
                (0, chai_1.expect)(response.body).to.have.key('user');
                (0, chai_1.expect)(response.body.user).to.be.a('object');
                (0, chai_1.expect)(response.body.user).to.have.property('firstName', firstname);
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get('/users/0')
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/users/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal(`No user found with id: ${id}`);
            }));
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/users/${userId}`)
                    .set('Authorization', `Bearer ${userToken}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(400);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('You have no permission for this');
            }));
        });
    (0, mocha_1.describe)('DELETE /users/:id', () => {
        (0, mocha_1.it)('responds with code 204 and empty object', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.body).to.be.empty;
            (0, chai_1.expect)(response.statusCode).to.equal(204);
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete('/users/0')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('No valid id provided');
        }));
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/users/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(400);
            (0, chai_1.expect)(response.body).to.have.key('message');
            (0, chai_1.expect)(response.body.message).to.equal(`User not found with id: ${id}`);
        }));
    });
});
