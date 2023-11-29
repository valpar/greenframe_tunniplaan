import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';

/* const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
}; */
// let token: string;
let lecturerId: number;
// const id = 9999;

describe('Lecturers controller', () => {
  describe('GET /lecturers', () => {
    /* it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('respondse with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/lecturers/1');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/lecturers/1')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    }); */
    it('responds with code 200 and lecturers information', async () => {
      const response = await request(app)
        .get('/lecturers');
        // .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('lecturers');
      expect(response.body.lecturers).to.be.a('array');
      expect(Object.keys(response.body.lecturers).length).to.greaterThan(0);
    });
  });
  describe('POST /lecturers', () => {
    it('responds with code 201 and sources id', async () => {
      // unikaalne email testimiseks
      const uniqueEmail = `marit+${Date.now()}@tlu.ee`;
      const response = await request(app)
        .post('/lecturers')
        // .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Mari',
          lastName: 'Murimari',
          email: uniqueEmail,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      lecturerId = response.body.id;
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/lecturers')
        // .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Mari',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Last name is required');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/lecturers')
        // .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 'Murimari',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('First name is required');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/lecturers')
        // .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: '123',
          lastName: '123',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Insert only letters, space or -');
    });
  });
  describe('DELETE /lecturers/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/lecturers/${lecturerId}`);
        // .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/lecturers/0');
        // .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/lecturers/${id}`);
        // .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(
        `Lecturer not found with id: ${id} or has active subjects`,
      );
    }); */
  });
});
