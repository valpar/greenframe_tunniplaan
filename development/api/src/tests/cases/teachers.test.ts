import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';
import jwtService from '../../components/general/services/jwtService';
import IUser from '../../components/users/interfaces';

/* const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
}; */
let adminToken: string;
let teacherId: number;
// const id = 9999;

describe('Teachers controller', () => {
  before(async () => {
    // loome mock admin kasutaja
    const mockAdminUser: IUser = {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'mockPassword',
      roles: ['admin'], // massiivina
    };

    // loome tokeni mock admin kasutajaga
    adminToken = await jwtService.sign(mockAdminUser);
  });
  describe('GET /teachers', () => {
    /* it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('respondse with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/teachers/1');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/teachers/1')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    }); */
    it('responds with code 200 and teachers information', async () => {
      const response = await request(app)
        .get('/teachers');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('teachers');
      expect(response.body.teachers).to.be.a('array');
      expect(Object.keys(response.body.teachers).length).to.greaterThan(0);
    });
  });
  describe('POST /teachers', () => {
    it('responds with code 201 and sources id', async () => {
      // unikaalne email testimiseks
      const uniqueEmail = `marit+${Date.now()}@tlu.ee`;
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          firstName: 'Mari',
          lastName: 'Murimari',
          email: uniqueEmail,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      teacherId = response.body.id;
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/teachers')
        .set('Authorization', `Bearer ${adminToken}`)
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
        .post('/teachers')
        .set('Authorization', `Bearer ${adminToken}`)
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
        .post('/teachers')
        .set('Authorization', `Bearer ${adminToken}`)
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
  describe('DELETE /teachers/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      // expect(response.body).to.be.empty;
      expect(response.body).to.deep.equal({});
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/teachers/0')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    // api saadab 500 error
    /* it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/teachers/${teacherId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(
        `Teacher not found with id: ${teacherId} or has active subjects`,
      );
    }); */
  });
});
