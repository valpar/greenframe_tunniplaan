import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../../app';
import jwtService from '../../components/general/services/jwtService';
import IUser from '../../components/users/interfaces';

let adminToken: string;
let subjectsId: number;
const id = 9999;
const date = new Date();

describe('Subjects controller', () => {
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
  describe('GET /subjects', () => {
    it('responds with code 200 and subjects information', async () => {
      const response = await request(app)
        .get('/subjects');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subject: 'Mate',
          subjectCode: `${date.getTime()}`,
          creditPoint: 3,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subjectCode: '1',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Subject, subject code, or credit point is missing');
    });
    // controllleris on koodis välja kommenteeritud
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subject: 'Mate',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Subject, subject code, or credit point is missing');
    });
  });
  describe('PATCH /subjects/:id', () => {
    it('responds with code 204 and empty object', async () => {
      // postitame uue subjecti, et saada id, mida patchida
      const createResponse = await request(app)
        .post('/subjects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subject: 'testSubject',
          subjectCode: `test id ${date.getTime()}`,
          creditPoint: 99,
        });
      subjectsId = createResponse.body.id;
      const response = await request(app)
        .patch(`/subjects/${subjectsId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subject: 'New Subject',
          subjectCode: `patch ${date.getTime()}`,
          creditPoint: 3,
        });
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({});
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${subjectsId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({});
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Nothing to update');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch(`/subjects/${id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subject: 'patch',
          subjectCode: `no idea ${date.getTime()}`,
          creditPoint: 3,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal(`No subject found with id: ${id}`);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .patch('/subjects/0')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          subject: 'patch',
          subjectCode: `not valid id ${date.getTime()}`,
          creditPoint: 3,
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
        .get(`/subjects/${subjectsId}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('subject');
      expect(response.body.subject).to.be.a('object');
      expect(Object.keys(response.body.subject).length).to.greaterThan(0);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get('/subjects/0');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id or subjectCode provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .get(`/subjects/${id}`);
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
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({});
      expect(response.statusCode).to.equal(204);
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete('/subjects/0')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No valid id provided');
    });
    it('responds with code 400 and error message', async () => {
      const response = await request(app)
        .delete(`/subjects/${id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal(
        `Subject not found with id: ${id}`,
      );
    });
  });
});
