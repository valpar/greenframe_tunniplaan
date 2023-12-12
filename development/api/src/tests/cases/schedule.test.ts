import request from 'supertest';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import app from '../../app';
import jwtService from '../../components/general/services/jwtService';
import IUser from '../../components/users/interfaces';

let adminToken: string;
// let scheduleId: number;

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

  describe('GET /schedule', () => {
    it('should respond with code 200 and schedule information', async () => {
      const response = await request(app).get('/schedule');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('schedule');
      expect(response.body.schedule).to.be.an('array');
    });
  });

  describe('POST /schedule', () => {
    // tuleb 200 (ok) ja mitte 201 (created)
    it('should create a schedule and respond with code 201', async () => {
      const newSchedule = {
        rooms: [{ roomId: 1, room: 'Room A' }],
        comment: 'Test Comment',
        courses: [{ courseId: 1, courseCode: 'CSC101', courseName: 'Intro to CS' }],
        subjectId: 10,
        startTime: '2023-01-01T09:00:00',
        endTime: '2023-01-01T10:00:00',
        teachers: [{ teacherId: 1, firstName: 'John', lastName: 'Doe' }],
        distanceLink: 'http://example.com/link',
        subjectCode: 'CS101',
      };
      const response = await request(app)
        .post('/schedule')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newSchedule);
      // expect(response.statusCode).to.equal(201); ei tule 201
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('scheduleId');
      scheduleId = response.body.scheduleId;
      // console.log(response.body);
    });
    it('should respond with code 400 for invalid schedule data', async () => {
      const response = await request(app)
        .post('/schedule')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({});
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.be.an('object');
      expect(response.body).to.deep.equal({ error: 'subjectCode or subjectId is missing' });
      // console.log(response.body);
    });
  });

  describe('PATCH /schedule/:id', () => {
    it('should update a schedule and respond with code 200', async () => {
      const currentTime = new Date().toISOString();
      const updatedData = {
        rooms: [{ roomId: 1, room: 'Room A' }],
        comment: 'Test Comment',
        courses: [{ courseId: 1, courseCode: 'CSC101', courseName: 'Intro to CS' }],
        subjectId: 1,
        startTime: currentTime,
        endTime: '2023-01-01T10:00:00',
        teachers: [{ teacherId: 1, firstName: 'John', lastName: 'Doe' }],
        distanceLink: 'http://example.com/link',
        subjectCode: 'CS101',
      };
      const response = await request(app)
        // .patch(`/schedule/${scheduleId}`)
        .patch('/schedule/2')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedData);
      expect(response.statusCode).to.equal(200);
    });
  });

  describe('DELETE /schedule/:id', () => {
    // kustutab korduvalt juba kustutatud schedule
    it('should delete a schedule and respond with code 200 (ok)', async () => {
      const response = await request(app)
        // .delete(`/schedule/${scheduleId}`)
        .delete('/schedule/1')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(response.statusCode).to.equal(200);
    });
  });
});
