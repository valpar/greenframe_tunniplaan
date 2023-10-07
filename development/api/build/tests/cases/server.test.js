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
const database_1 = __importDefault(require("../../database"));
const user = {
    email: 'koviid@mail.ee',
    password: 'Koviid',
};
let token;
const lecturerId = 1;
const id = 9999;
// SERVER ERRORS
// lecturers
(0, mocha_1.describe)('token', () => {
    (0, mocha_1.it)('responds with code 200 and token after login', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
        (0, chai_1.expect)(response.body).to.be.a('object');
        (0, chai_1.expect)(response.statusCode).to.equal(200);
        (0, chai_1.expect)(response.body).to.have.key('token');
        (0, chai_1.expect)(response.body.token).to.be.a('string');
        token = response.body.token;
    }));
});
(0, mocha_1.describe)('Server errors', () => {
    before(() => {
        database_1.default.end();
    });
    (0, mocha_1.describe)('GET /lecturers', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/lecturers')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('GET /lecturers/:id', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/lecturers/1')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /lecturers', () => {
        (0, mocha_1.it)('responds with code 500and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/lecturers')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'sde',
                lastName: 'sde',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /lecturers/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/lecturers/${lecturerId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    firstName: 'Muri',
                    lastName: 'Murimari',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('GET /lecturers/activeSubjects', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get('/lecturers/activeSubjects')
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
    (0, mocha_1.describe)('DELETE /lecturers/:id', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/lecturers/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
// Room
(0, mocha_1.describe)('Room controller server connections', () => {
    (0, mocha_1.describe)('GET /rooms', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/rooms')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /rooms', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/rooms')
                .set('Authorization', `Bearer ${token}`)
                .send({
                room: 'ruum',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /rooms/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/rooms/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    room: 'ruum 200',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('DELETE /rooms/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .delete(`/rooms/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
});
// Subjects
(0, mocha_1.describe)('Subjects server errors', () => {
    (0, mocha_1.describe)('GET /subjects', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/subjects')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /subjects', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/subjects')
                .set('Authorization', `Bearer ${token}`)
                .send({
                subject: 'Mate',
                scheduled: 'Reedel',
                lecturers_id: 3,
                courses_id: 2,
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /subjects/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/subjects/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    scheduled: 'Neljapäev',
                    courses_id: 1,
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('GET /subjects/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/subjects/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
    (0, mocha_1.describe)('DELETE /subjects/:id', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/subjects/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
// Subjects
(0, mocha_1.describe)('Subjects server errors', () => {
    (0, mocha_1.describe)('GET /subjects', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/subjects')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /subjects', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/subjects')
                .set('Authorization', `Bearer ${token}`)
                .send({
                subject: 'Mate',
                scheduled: 'Reedel',
                lecturers_id: 3,
                courses_id: 2,
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /subjects/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/subjects/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    scheduled: 'Neljapäev',
                    courses_id: 1,
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('GET /subjects/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/subjects/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
    (0, mocha_1.describe)('DELETE /subjects/:id', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/subjects/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
// Subjects
(0, mocha_1.describe)('Subjects server errors', () => {
    (0, mocha_1.describe)('GET /subjects', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/subjects')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /subjects', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/subjects')
                .set('Authorization', `Bearer ${token}`)
                .send({
                subject: 'Mate',
                scheduled: 'Reedel',
                lecturers_id: 3,
                courses_id: 2,
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /subjects/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/subjects/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    scheduled: 'Neljapäev',
                    courses_id: 1,
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('GET /subjects/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/subjects/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
    (0, mocha_1.describe)('DELETE /subjects/:id', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/subjects/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
// Courses
(0, mocha_1.describe)('Courses server errors', () => {
    (0, mocha_1.describe)('GET /courses', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/courses')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /courses', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/courses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                course: 'RIF 200',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /courses/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .patch(`/courses/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                    course: 'RIF 200',
                });
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('GET /courses/:id', () => {
            (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/courses/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
    (0, mocha_1.describe)('DELETE /courses/:id', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/courses/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
// User
(0, mocha_1.describe)('User controller', () => {
    (0, mocha_1.describe)('GET /users', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .get('/users')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
    (0, mocha_1.describe)('POST /users', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .post('/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                firstName: 'Karu',
                lastName: 'Kati',
                password: 'Karu',
                email: 'kiu@kiu.ee',
            });
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    }),
        (0, mocha_1.describe)('PATCH /users/:id', () => {
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
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        }),
        (0, mocha_1.describe)('GET /users/:id', () => {
            (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get(`/users/${id}`)
                    .set('Authorization', `Bearer ${token}`);
                (0, chai_1.expect)(response.body).to.be.a('object');
                (0, chai_1.expect)(response.statusCode).to.equal(500);
                (0, chai_1.expect)(response.body).to.have.key('error');
                (0, chai_1.expect)(response.body.error).to.equal('Server error');
            }));
        });
    (0, mocha_1.describe)('DELETE /users/:id', () => {
        (0, mocha_1.it)('responds with code 400 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default)
                .delete(`/users/${id}`)
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
// LOGIN
(0, mocha_1.describe)('User controller', () => {
    (0, mocha_1.describe)('POST /login', () => {
        (0, mocha_1.it)('responds with code 500 and error message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post('/login').send(user);
            (0, chai_1.expect)(response.body).to.be.a('object');
            (0, chai_1.expect)(response.statusCode).to.equal(500);
            (0, chai_1.expect)(response.body).to.have.key('error');
            (0, chai_1.expect)(response.body.error).to.equal('Server error');
        }));
    });
});
