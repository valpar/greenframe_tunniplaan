/* eslint-disable no-unused-expressions */
import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';
import pool from '../../database';

const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
};
let token: string;
const lecturerId: number = 1;
const id: number = 9999;

// SERVER ERRORS
// lecturers
describe('token', () => {
  it('responds with code 200 and token after login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.body).to.be.a('object');
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.key('token');
    expect(response.body.token).to.be.a('string');
    token = response.body.token;
  });
});
describe('Server errors', () => {
  before(() => {
    pool.end();
  });
  describe('GET /lecturers', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/lecturers')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /lecturers/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/lecturers/1')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /lecturers', () => {
    it('responds with code 500and error message', async () => {
      const response = await request(app)
        .post('/lecturers')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'sde',
          lastName: 'sde',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /lecturers/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .patch(`/lecturers/${lecturerId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Muri',
          lastName: 'Murimari',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /lecturers/activeSubjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/lecturers/activeSubjects')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /lecturers/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .delete(`/lecturers/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});

// Room

describe('Room controller server connections', () => {
  describe('GET /rooms', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/rooms')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /rooms', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .post('/rooms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /rooms/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .patch(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          room: 'ruum 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /rooms/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .delete(`/rooms/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});

// Subjects

describe('Subjects server errors', () => {
  describe('GET /subjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/subjects')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /subjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Mate',
          scheduled: 'Reedel',
          lecturers_id: 3,
          courses_id: 2,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Neljapäev',
          courses_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .delete(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});
// Subjects

describe('Subjects server errors', () => {
  describe('GET /subjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/subjects')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /subjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Mate',
          scheduled: 'Reedel',
          lecturers_id: 3,
          courses_id: 2,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Neljapäev',
          courses_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .delete(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});

// Subjects

describe('Subjects server errors', () => {
  describe('GET /subjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/subjects')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /subjects', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Mate',
          scheduled: 'Reedel',
          lecturers_id: 3,
          courses_id: 2,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Neljapäev',
          courses_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /subjects/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .delete(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});

// Courses

describe('Courses server errors', () => {
  describe('GET /courses', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /courses', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          course: 'RIF 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /courses/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .patch(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          course: 'RIF 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /courses/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /courses/:id', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .delete(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});

// User

describe('User controller', () => {
  describe('GET /users', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('POST /users', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Karu',
          lastName: 'Kati',
          password: 'Karu',
          email: 'kiu@kiu.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('PATCH /users/:id', () => {
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Maru',
          lastName: 'Mati',
          password: 'Maru',
          email: 'maru@kati.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('GET /users/:id', () => {
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
  describe('DELETE /users/:id', () => {
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});

// LOGIN

describe('User controller', () => {
  describe('POST /login', () => {
    it('responds with code 500 and error message', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(500);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Server error');
    });
  });
});
