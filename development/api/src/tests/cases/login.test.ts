/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';
// import * as faker from 'faker';
// faker import doesn't work, used require(https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam)
const faker = require('faker');

const user = {
  email: 'koviid@mail.ee',
  password: 'Koviid',
};
const regularUser = {
  email: 'krispi@mail.ee',
  password: 'Krispi',
};
const fakeUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
const wrongUserPassword = {
  email: 'koviid@mail.ee',
  password: 'Koviid1',
};

// These variables aren't used
// const firstname: string = faker.name.firstName();
// const lastname: string = faker.name.lastName();
// const password: string = faker.internet.password();
// const email: string = faker.internet.email();
// const fakeToken: string = faker.internet.password();
// let userId: number;
// const id: number = 9999;

// eslint-disable-next-line no-unused-vars
let token: string;
// eslint-disable-next-line no-unused-vars
let userToken: string;

describe('Login controller', () => {
  describe('POST /login', () => {
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
    it('responds with code 401 and users information', async () => {
      const response = await request(app).post('/login').send(fakeUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Check credentials');
    });
    it('responds with code 401 and users information', async () => {
      const response = await request(app)
        .post('/login')
        .send(wrongUserPassword);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Check password');
    });
  });
});
