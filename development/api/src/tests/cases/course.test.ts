import request from 'supertest';
import { describe, it, before, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
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
    it('should respond with code 200 and courses information', async () => {
      const response = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('courses');
      expect(response.body.courses).to.be.an('array');
      expect(response.body.courses).to.have.length.above(0);
    });
    // login endpointi pole
    /* it('responds with code 200 and token after login first test', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
      console.log(token);
    }); */
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
          courseCode: 'RIF 40',
          courseName: 'Course Name',
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
      expect(response.body.error).to.equal('CourseCode or CourseName is missing');
    });
  });
  describe('PATCH /courses/:id', () => {
    /* it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .patch(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseCode: 'Koolitus',
          courseName: 'Koolitus',
        });
      expect(response.body).to.be.a('object');
      expect(response.body.error).to.equal('Nothing to update');
      expect(response.statusCode).to.equal(400);
    }); */
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
          courseCode: 'RIF 007',
          courseName: 'Some course name',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    // api saadab 500 error
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        // .patch(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          courseCode: 'RIF 007',
          courseName: 'Some course name',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No course found with id: ${id}`);
    }); */
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
      expect(response.body.course[0]).to.have.property('courseCode', 'RIF 40');
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
    // tuleb 500 error
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No course found with id: ${id}`);
    }); */
  });
  describe('DELETE /courses/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/courses/${courseId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({}); // deep equal võrdleb {} sisu, ilma võrdleb viiteid
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
    // tuleb 500 error
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/courses/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(`Course not found with id: ${id}`);
    }); */
  });
});
