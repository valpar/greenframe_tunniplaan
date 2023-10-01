/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';

const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
};
let token: string;
let subjectsId: number;
const id = 9999;

describe('Subjects controller', () => {
  describe('GET /subjects', () => {
    it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('responds with code 200 and subjects information', async () => {
      const response = await request(app)
        .get('/subjects')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('subjects');
      expect(response.body.subjects).to.be.a('array');
      expect(Object.keys(response.body.subjects).length).to.greaterThan(0);
    });
  });
  describe('POST /subjects', () => {
    it('responds with code 201 and sources id', async () => {
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
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      subjectsId = response.body.id;
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Reedel',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Subject is missing');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Mate',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Scheduled is missing');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Mate',
          scheduled: 'Reedel',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Course id is missing');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: 'Mate',
          scheduled: 'Reedel',
          courses_id: 3,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Lecturer id is missing');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          subject: '{]Mate',
          scheduled: '{[Reedel',
          courses_id: 3,
          lecturers_id: 2,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(
        'Insert only letters, numbers or -.,!',
      );
    });
  });
  describe('PATCH /subjects/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .patch(`/subjects/${subjectsId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Neljapäev',
          courses_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${subjectsId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Neljapäev',
          courses_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No subject found with id: ${id}`);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/subjects/0')
        .set('Authorization', `Bearer ${token}`)
        .send({
          scheduled: 'Neljapäev',
          courses_id: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
  });
  describe('GET /subjects/:id', () => {
    it('responds with code 200 and subject information', async () => {
      const response = await request(app)
        .get(`/subjects/${subjectsId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('subject');
      expect(response.body.subject).to.be.a('object');
      expect(Object.keys(response.body.subject).length).to.greaterThan(0);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get('/subjects/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No subject found with id: ${id}`);
    });
  });
  describe('DELETE /subjects/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/subjects/${subjectsId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/subjects/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/subjects/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(
        `Subject not found with id: ${id}`,
      );
    });
  });
});
