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
let courseId: number;
const id: number = 9999;

describe('Course controller', () => {
  describe('GET /courses', () => {
    it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('responds with code 200 and courses information', async () => {
      const response = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('courses');
      expect(response.body.courses).to.be.a('array');
      expect(Object.keys(response.body.courses).length).to.greaterThan(0);
    });
  });
  describe('POST /courses', () => {
    it('responds with code 201 and sources id', async () => {
      const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          course: 'RIF 40',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      courseId = response.body.id;
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Course is missing');
    });
  });
  describe('PATCH /courses/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .patch(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          course: 'RIF 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/courses/0')
        .set('Authorization', `Bearer ${token}`)
        .send({
          course: 'RIF 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          course: 'RIF 200',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No course found with id: ${id}`);
    });
  });
  describe('GET /courses/:id', () => {
    it('responds with code 200 and room information', async () => {
      const response = await request(app)
        .get(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('course');
      expect(response.body.course[0]).to.be.a('object');
      expect(response.body.course[0]).to.have.property('course', 'RIF 200');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get('/courses/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No course found with id: ${id}`);
    });
  });
  describe('DELETE /courses/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/courses/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(`Course not found with id: ${id}`);
    });
  });
});
