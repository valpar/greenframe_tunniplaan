import request from 'supertest';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import app from '../../app';
import jwtService from '../../components/general/services/jwtService';
import IUser from '../../components/users/interfaces';

let adminToken: string;
let homeworkId: number;

describe('Schedule Controller', () => {
  before(async () => {
    const mockAdminUser: IUser = {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'mockPassword',
      roles: ['admin'],
    };
    adminToken = await jwtService.sign(mockAdminUser);
  });
  describe('GET /homeworks', () => {
    it('should respond with code 200 and homework information', async () => {
      const response = await request(app)
        .get('/homeworks');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('homeworks');
      expect(response.body.homeworks).to.be.an('array');
      // console.log(response.body);
    });
  });
  describe('POST /homeworks', () => {
    it('should create a homework and respond with code 201', async () => {
      const newHomework = {
        description: 'Test Homework',
        dueDate: '2023-12-31',
        subjectsId: 1,
        extrasLink: 'http://example.com',
        subjectCode: 'CS101',
      };
      const response = await request(app)
        .post('/homeworks')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newHomework);
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('id');
      // console.log(response.body);
      homeworkId = response.body.id;
    });
  });
  describe('PATCH /homeworks/:id', () => {
    const currentTime = new Date().toISOString();
    it('should update a homework and respond with code 204', async () => {
      const updatedHomework = {
        description: 'Updated Homework',
        dueDate: currentTime,
        subjectsId: 1,
      };
      const response = await request(app)
        .patch(`/homeworks/${homeworkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedHomework);
      expect(response.statusCode).to.equal(204); // api tagastab 204, no content
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({});
      // console.log(response.body);
    });
  });
  describe('DELETE /homeworks/:id', () => {
    it('should delete a homework and respond with code 204', async () => {
      const response = await request(app)
        .delete(`/homeworks/${homeworkId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).to.equal(204); // api tagastab 204, no content real 159
      expect(response.body).to.be.a('object');
      expect(response.body).to.deep.equal({});
    });
  });
});
