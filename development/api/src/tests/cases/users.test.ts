/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as faker from 'faker';
import app from '../../app';

const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
};
const regularUser = {
  email: 'krispi@mail.ee',
  password: 'Krispi',
};
const firstname: string = faker.name.firstName();
const lastname: string = faker.name.lastName();
const password: string = faker.internet.password();
const email: string = faker.internet.email();
let token: string;
let userToken: string;
let userId: number;
const id: number = 9999;

describe('User controller', () => {
  describe('GET /users', () => {
    it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('responds with code 200 and token after login', async () => {
      const response = await request(app).post('/login').send(regularUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      userToken = response.body.token;
    });
    it('responds with code 200 and users information', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('users');
      expect(response.body.users).to.be.a('array');
      expect(Object.keys(response.body.users).length).to.greaterThan(0);
    });
    it('responds with code 401 and users information', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(
        'You have to be admin for this operation',
      );
    });
  });
  describe('POST /users', () => {
    it('responds with code 201 and sources id', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: firstname,
          lastName: lastname,
          password,
          email,
        });
      console.log(firstname);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      userId = response.body.id;
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          lastName: 'Kati',
          password: 'Karu',
          email: 'karu@kati.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('First name is required');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Karu',
          password: 'Karu',
          email: 'karu@kati.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Last name is required');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Karu',
          lastName: 'Kati',
          email: 'karu@kati.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Password is required');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Karu',
          lastName: 'Kati',
          password: 'Karu',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Email is required');
    });
  }),
  describe('PATCH /users/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: firstname,
          lastName: lastname,
          password,
          email,
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/users/0')
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
        .patch(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Maru',
          lastName: 'Mati',
          password: 'Maru',
          email: 'maru@kati.ee',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No user found with id: ${id}`);
    });
  }),
  describe('GET /users/:id', () => {
    it('responds with code 200 and user information', async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('user');
      expect(response.body.user).to.be.a('object');
      expect(response.body.user).to.have.property('firstName', firstname);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get('/users/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No user found with id: ${id}`);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('You have no permission for this');
    });
  });
  describe('DELETE /users/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.empty;
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/users/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(`User not found with id: ${id}`);
    });
  });
});
